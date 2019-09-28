import paypal from "@paypal/checkout-server-sdk";
import currency = require("currency.js");
import {Request, Response} from "express";
import { getConnection } from "typeorm";
import { Order } from "../entity/order";
import { PaypalOrder } from "../entity/paypal_order";
import Logger from "../logging";
import { orderCreateRequestBody, paypalClient, paypalFee } from "../services/paypal";

export async function GetOrder(req: Request, res: Response): Promise<void> {
  try {
    const conn = getConnection();
    const order: Order = await conn.getRepository(Order).findOne({id: req.params.id}, {relations: ["show"]});
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
      {relations: ["show", "show.production", "paypal"]}
    );
    if (!order) {
      res.status(404).json({error: `No order found with id ${req.params.id}`});
      return;
    }
    if (order.paid) {
      res.status(409).json({error: "Order has already been paid"});
      return;
    }
    // If paypal has already been set up for this order
    if (order.paypal) {
      res.json({paypalOrderID: order.paypal.id});
      return;
    }
    const show = order.show;
    const prod = show.production;

    const subtotal = AUD(order.subtotalPrice);
    const unitPrice = AUD(show.seatPrice);
    const fee = paypalFee(subtotal);
    const totalPrice = subtotal.add(fee);

    // https://developer.paypal.com/docs/checkout/reference/server-integration/set-up-transaction/#on-the-server
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    const details = orderCreateRequestBody(
      order.id, prod.title, prod.year, prod.subtitle, show.time, subtotal,
      unitPrice, order.numSeats);
    request.requestBody(details);
    Logger.Info(JSON.stringify(details));

    // Send request to paypal api
    const paypalResponse = await paypalClient().execute(request);
    Logger.Info(JSON.stringify(paypalResponse));

    // Save paypal details
    const paypalOrder = new PaypalOrder();
    paypalOrder.totalPrice = (totalPrice.format() as any);
    paypalOrder.id = paypalResponse.result.id;
    paypalOrder.captureID = null;
    paypalOrder.order = order;
    await conn.getRepository(PaypalOrder).save(paypalOrder);

    res.json({paypalOrderID: paypalOrder.id});
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
      req.params.id,
      {
        join: {alias: "order", innerJoinAndSelect: {paypal: "order.paypal"}}
      }
    );
    if (!order) {
      res.status(404).json({error: "order not found (or paypal ID has not yet been set up)"});
    }
    if (order.paid) {
      res.status(409).json({error: "order has already been paid"});
    }

    // Call paypal API to capture order
    // https://developer.paypal.com/docs/checkout/reference/server-integration/capture-transaction/#on-the-server
    const request = new paypal.orders.OrdersCaptureRequest(order.paypal.id);
    request.requestBody({});
    const capture = await paypalClient().execute(request);
    Logger.Info(JSON.stringify(capture));
    const captureID = capture.result.purchase_units[0].payments.captures[0].id;

    order.paypal.captureID = captureID;
    order.paid = true;
    order.paidAt = new Date();
    await repo.save(order);

    // TODO send email
    res.json({success: true});

  } catch (err) {
    Logger.Error(err.stack);
    res.status(500).json({error: "Internal server error"});
  }
}

function AUD(amount: any): currency {
  return currency(amount, {separator: "", formatWithSymbol: false});
}
