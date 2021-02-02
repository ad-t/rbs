import paypal from "@paypal/checkout-server-sdk";
import currency = require("currency.js");
import {Request, Response} from "express";
import { ApiError, CreateCheckoutRequest, CreateOrderRequest } from "square";
import { getConnection } from "typeorm";
import { Order } from "../entity/order";
import { PaymentMethod } from "../entity/payment";
import { Payment } from "../entity/payment";
import Logger from "../logging";
import { IItemDetail, orderCreateRequestBody, paypalClient, paypalFee } from "../services/paypal";
import { orderCreateRequestBody as squareOrderCreateRequestBody, squareClient, squareFee } from "../services/square";

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

// Unlike PayPal, the Square Checkout API performs setup/capture at the same time.
export async function SetupSquare(req: Request, res: Response) {
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
    if (order.payment && order.payment.method === PaymentMethod.SQUARE) {
      res.json({paypalOrderID: order.payment.transactionID});
      return;
    }
    const show = order.show;
    const prod = show.production;

    const subtotal = AUD(order.subtotalPrice);
    const fee = squareFee(subtotal);
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

    // https://github.com/square/square-nodejs-sdk/blob/master/doc/api/checkout.md
    const details: CreateOrderRequest = squareOrderCreateRequestBody(
      order.id, prod.title, prod.year.toString(), prod.subtitle, show.time, subtotal,
      itemDetails.values());
    Logger.Info(JSON.stringify(details));

    // TODO: review what would be the best idempotency key
    const body: CreateCheckoutRequest = {
      idempotencyKey: order.id,
      order: details
    };
    body.askForShippingAddress = false;
    body.merchantSupportEmail = "ticketing@medrevue.org";
    // Don't use example@example.com - otherwise the payment won't go through.
    body.prePopulateBuyerEmail = "karl@medrevue.org";
    // body.prePopulateShippingAddress = ...;
    // So-called transactionId is actually the orderId in the Square Payment API.
    // Square Order ID is available from the response to createCheckout.
    // Checkout ID isn't really used anywhere except checkout LMAO -- no way
    // of verifying using the checkout ID itself.
    // Gives three things as query string params:
    // checkoutId: self-explanatory
    // referenceId: our own order ID
    // transactionId: Square's order ID
    // body.redirectUrl = "http://localhost:3000/order-confirm";

    // Send request to Square API
    Logger.Info(JSON.stringify(body));
    const { result, ...others } = await squareClient().checkoutApi.createCheckout(
      process.env.SQUARE_LOC_ID,
      body // , { abortSignal }
    );

    Logger.Info(JSON.stringify(others));

    // Save paypal details
    const payment = order.payment || new Payment();
    payment.order = order;
    payment.method = PaymentMethod.SQUARE;
    payment.totalPrice = (totalPrice.format() as any);
    // We want to store the Square Order ID instead of the Checkout ID, as this
    // is the only thing that can actually verify payment using the API.
    payment.transactionID = result.checkout.order.id;
    await conn.getRepository(Payment).save(payment);

    res.json({paypalOrderID: payment.transactionID, url: result.checkout.checkoutPageUrl});
  } catch (err) {
    if (err instanceof ApiError) {
      // If unsuccessful we will display the list of errors
      // tslint:disable-next-line:no-console
      console.error("Errors: ", err.errors);
    } else {
      Logger.Error(err.stack);
    }
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
    const payment = order.payment || new Payment();
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
      req.params.id, {relations: ["payment"]}
    );
    repo.findOne();
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

    // TODO send email
    res.json({success: true});

  } catch (err) {
    Logger.Error(err.stack);
    res.status(500).json({error: "Internal server error"});
  }
}

export async function SquareVerifyPayment(req: Request, res: Response) {
  try {
    const conn = getConnection();
    const repo = conn.getRepository(Order);
    // get order and paypalorder
    const order: Order = await repo.findOne(
      req.params.id, {relations: ["payment"]}
    );
    repo.findOne();
    if (!order) {
      res.status(404).json({error: "order not found (or Square ID has not yet been set up)"});
      return;
    }
    if (order.paid) {
      res.status(422).json({error: "order has already been paid"});
      return;
    }
    if ((!order.payment) || order.payment.method !== PaymentMethod.SQUARE) {
      res.status(422).json({error: "order has not been set up for Square"});
      return;
    }

    // Call Square API to verify payment has been made
    const { result, ...httpResponse } = await squareClient().ordersApi.retrieveOrder(order.payment.transactionID);
    Logger.Info(JSON.stringify(result));

    // Verify that the order has been fully paid (COMPLETED) and the Square order
    // is for the same amount that we expect.
    if (!result.order || result.order.state !== "COMPLETED" ||
        result.order.totalMoney.amount !== Math.round(order.payment.totalPrice * 100)) {
      res.status(422).json({error: "order has not been (fully) paid yet"});
      return;
    }

    // FIXME: what capture ID should we put here?
    order.payment.captureID = null;
    order.paid = true;
    order.paidAt = new Date();
    await repo.save(order);

    // TODO send email
    res.json({success: true});

  } catch (err) {
    if (err instanceof ApiError) {
      const errors = err.result;
      // const { statusCode, headers } = err;
    }

    Logger.Error(err.stack);
    res.status(500).json({error: "Internal server error"});
  }
}

function AUD(amount: any): currency {
  return currency(amount, {separator: "", formatWithSymbol: false});
}
