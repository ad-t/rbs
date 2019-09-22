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
      {join: {
        alias: "order",
        innerJoinAndSelect: {
          show: "order.show",
          production: "show.production"
        }
      }}
    );
    if (!order) {
      res.status(404).json({error: `No order found with id ${req.params.id}`});
      return;
    }
    if (order.paid === true) {
      res.status(409).json({error: "Order is already paid"});
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
    // paypalOrder.order = order;
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
    throw new Error("test");
  } catch (err) {
    Logger.Error(err.stack);
    res.status(500).json({error: "Internal server error"});
  }
}

function AUD(amount: any): currency {
  return currency(amount, {separator: "", formatWithSymbol: false});
}
