import paypal from "@paypal/checkout-server-sdk";
import currency = require("currency.js");
import {Request, Response} from "express";
import { getConnection } from "typeorm";
import { Order } from "../entity/order";
import { PaymentMethod } from "../entity/payment";
import { Payment } from "../entity/payment";
import Logger from "../logging";
import { sendEmail } from "../services/email";
import { IItemDetail, orderCreateRequestBody, paypalClient, paypalFee } from "../services/paypal";

export async function GetOrder(req: Request, res: Response): Promise<void> {
  try {
    const conn = getConnection();
    const order: Order = await conn.getRepository(Order).findOne(
      req.params.id, {relations: ["show", "tickets", "tickets.ticketType"]});
    if (!order) {
      res.status(404).json({error: `No order found with id ${req.params.id}`});
      return;
    }
    res.json(order);
  } catch (err) {
    Logger.Error(err.stack);
    res.status(500).json({error: "Internal server error"});
  }
}

export async function SetupPaypal(req: Request, res: Response) {
  try {
    const conn = getConnection();
    const order: Order = await conn.getRepository(Order).findOne(
      {id: req.params.id},
      {relations: ["show", "show.production", "payment", "tickets", "tickets.ticketType"]}
    );
    if (!order) {
      res.status(404).json({error: `No order found with id ${req.params.id}`});
      return;
    }
    if (order.paid) {
      res.status(409).json({error: "Order has already been paid"});
      return;
    }

    // If paypal has already been set up for this order,
    // return existing paypal id
    if (order.payment && order.payment.method === PaymentMethod.PAYPAL) {
      res.json({paypalOrderID: order.payment.transactionID});
      return;
    }
    const show = order.show;
    const prod = show.production;

    const subtotal = AUD(order.subtotalPrice);
    const fee = paypalFee(subtotal);
    const totalPrice = subtotal.add(fee);

    const itemDetails = new Map<number, IItemDetail>();
    for (const ticket of order.tickets) {
      if (itemDetails.has(ticket.ticketType.id)) {
        itemDetails.get(ticket.ticketType.id).quantity++;
      } else {
        itemDetails.set(ticket.ticketType.id, {
          name: ticket.ticketType.description,
          unitPrice: AUD(ticket.ticketType.price),
          quantity: 1
        });
      }
    }

    // https://developer.paypal.com/docs/checkout/reference/server-integration/set-up-transaction/#on-the-server
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    const details = orderCreateRequestBody(
      order.id, prod.title, prod.year.toString(), prod.subtitle, show.time, subtotal,
      itemDetails.values());
    request.requestBody(details);
    Logger.Info(JSON.stringify(details));

    // Send request to paypal api
    const paypalResponse = await paypalClient().execute(request);
    Logger.Info(JSON.stringify(paypalResponse));

    // Save paypal details
    const payment = (order.payment) ? order.payment : new Payment();
    payment.order = order;
    payment.method = PaymentMethod.PAYPAL;
    payment.totalPrice = (totalPrice.format() as any);
    payment.transactionID = paypalResponse.result.id;
    await conn.getRepository(Payment).save(payment);

    res.json({paypalOrderID: payment.transactionID});
  } catch (err) {
    Logger.Error(err.stack);
    res.status(500).json({error: "Internal server error"});
  }
}

export async function PaypalCaptureOrder(req: Request, res: Response) {
  try {
    const conn = getConnection();
    const repo = conn.getRepository(Order);
    // get order and paypalorder
    const order: Order = await repo.findOne(
      req.params.id, {relations: ["payment", "ticketType", "show", "show.production"]}
    );

    if (!order) {
      res.status(404).json({error: "order not found (or paypal ID has not yet been set up)"});
      return;
    }
    if (order.paid) {
      res.status(422).json({error: "order has already been paid"});
      return;
    }
    if ((!order.payment) || order.payment.method !== PaymentMethod.PAYPAL) {
      res.status(422).json({error: "order has not been set up for paypal"});
      return;
    }

    // Call paypal API to capture order
    // https://developer.paypal.com/docs/checkout/reference/server-integration/capture-transaction/#on-the-server
    const request = new paypal.orders.OrdersCaptureRequest(order.payment.transactionID);
    request.requestBody({});
    const capture = await paypalClient().execute(request);
    Logger.Info(JSON.stringify(capture));
    const captureID = capture.result.purchase_units[0].payments.captures[0].id;

    order.payment.captureID = captureID;
    order.paid = true;
    order.paidAt = new Date();
    await repo.save(order);

    res.json({success: true});

    const show = order.show;
    const production = show.production;

    sendEmail("order_complete", {
      to: order.email,
      subject: `${production.title} ${production.year} - Payment Confirmation`
    }, {
      order,
      show,
      production
    });

  } catch (err) {
    Logger.Error(err.stack);
    res.status(500).json({error: "Internal server error"});
  }
}

function AUD(amount: any): currency {
  return currency(amount, {separator: "", formatWithSymbol: false});
}
