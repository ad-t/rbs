import paypal from "@paypal/checkout-server-sdk";
import currency = require("currency.js");
import {Request, Response} from "express";
import { getConnection } from "typeorm";
import { Order } from "../entity/order";
import Logger from "../logging";
import { paypalClient, paypalFee } from "../services/paypal";

// TODO rewrite this if we ever expand
const defaultTZ = "Australia/Sydney";

export async function GetOrder(req: Request, res: Response): Promise<void> {
  const conn = getConnection();
  const order: Order = await conn.getRepository(Order).findOne({id: req.params.id}, {relations: ["show"]});
  if (!order) {
    res.status(404).json({error: `No order found with id ${req.params.id}`});
    return;
  }
  res.json(order);
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
    const show = order.show;
    const prod = show.production;

    const subtotal = AUD(order.subtotalPrice);
    const unitPrice = AUD(show.seatPrice);
    const fee = paypalFee(subtotal);
    const totalPrice = subtotal.add(fee);
    Logger.Info(`sub=${subtotal}, fee=${fee}, total=${totalPrice}`);

    // https://developer.paypal.com/docs/checkout/reference/server-integration/set-up-transaction/#on-the-server
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    const details = {
      intent: "CAPTURE",
      application_context: {
        brand_name: "Revue Booking System",
        shipping_preferences: "NO_SHIPPING",
        user_action: "PAY_NOW"
      },
      purchase_units: [{
        custom_id: order.id,
        description: "Revue Tickets",
        soft_descriptor: "RBS Revue Tickets", // credit card statement
        amount: {
          currency_code: "AUD",
          value: totalPrice.format(),
          breakdown: {
            item_total: moneyObj(subtotal),
            handling: moneyObj(fee)
          }
        },
        items: [{
          name: `${prod.title} ${prod.year}: ${prod.subtitle}`,
          description: show.time.toLocaleString("en-AU", {timeZone: defaultTZ}),
          category: "DIGITAL_GOODS",
          quantity: order.numSeats,
          unit_amount: moneyObj(unitPrice)
        }]
      }]
    };

    request.requestBody(details);
    Logger.Info(JSON.stringify(details));

    // Send request to paypal api
    const paypalOrder = await paypalClient().execute(request);
    Logger.Info(JSON.stringify(paypalOrder));
    res.json(paypalOrder);
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

function moneyObj(amount: currency): object {
  return {currency_code: "AUD", value: amount.format()};
}

function AUD(amount: any): currency {
  return currency(amount, {separator: "", formatWithSymbol: false});
}
