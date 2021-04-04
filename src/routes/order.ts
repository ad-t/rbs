import paypal from "@paypal/checkout-server-sdk";
import currency = require("currency.js");
import {Request, Response} from "express";
import { ApiError, CreateCheckoutRequest, CreateOrderRequest } from "square";
import { getConnection } from "typeorm";
import { sendEmail } from "../services/email";
import { Order } from "../entity/order";
import { Ticket } from "../entity/ticket";
import { VenueSeat } from "../entity/venue_seat";
import { PaymentMethod } from "../entity/payment";
import { Payment } from "../entity/payment";
import Logger from "../logging";
import { IItemDetail, orderCreateRequestBody, paypalClient, paypalFee } from "../services/paypal";
import { orderCreateRequestBody as squareOrderCreateRequestBody, squareClient, squareFee } from "../services/square";

interface ITicketDetails {
  id: string;
  name: string;
  postcode: string;
  seatNum: string;
}

export async function CompleteDetails(req: Request, res: Response) {
  // TODO: create type for this
  // FIXME: does this need to be wrapped in a transaction?
  let tickets: ITicketDetails[];
  try {
    const conn = getConnection();
    const orderRepo = conn.getRepository(Order);
    const order: Order = await orderRepo.findOne(req.params.id);
    if (!order) {
      res.status(404).json({error: `No order found with id ${req.params.id}`});
      return;
    }
    // TODO: check all details are filled
    ({tickets} = req.body);
    for (let t of tickets) {
      const ticketRepo = conn.getRepository(Ticket);
      const ticket: Ticket = await ticketRepo.findOne(t.id);
      // TODO: do we need to validate that this ticket belongs to the order?
      if (!ticket) {
        res.status(400).json({error: `No ticket found with ID ${t.id}`});
        return;
      }

      if (!t.name || !t.postcode) {
        res.status(400).json({error: "Ticket missing details"});
        return;
      }

      // Check this seat exists
      const seatRepo = conn.getRepository(VenueSeat);
      const seat: VenueSeat = await seatRepo.findOne(t.seatNum);

      if (!seat) {
        res.status(400).json({error: `Invalid seat number`});
        return;
      }

      // Check this seat hasn't been booked by someone else
      const ticketAlreadyBooked: Ticket = await ticketRepo.findOne({
        where: {
          seat: {
            seatNum: t.seatNum
          }
        },
        relations: ["seat"]
      });

      console.log(`\nTicket: `, ticketAlreadyBooked, "\n");

      if (ticketAlreadyBooked) {
        res.status(409).json({error: `Seat ${t.seatNum} already booked`});
        return;
      }

      ticket.name = t.name;
      ticket.postcode = t.postcode;
      ticket.seat = seat;
      await ticketRepo.save(ticket);
    }

    order.detailsCompleted = true;
    await orderRepo.save(order);
    // TODO: what to send?
    res.json({success: true});
  } catch (err) {
    Logger.Error(err.stack);
    res.status(500).json({error: "Internal server error"});
  }
}

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
    if (!order.detailsCompleted) {
      res.status(409).json({error: "Customer details have not been completed yet"});
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
    console.log(subtotal, fee, totalPrice);

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
    // TODO: change this to variable
    body.merchantSupportEmail = "ticketing@medrevue.org";
    // Don't use example@example.com - otherwise the payment won't go through.
    body.prePopulateBuyerEmail = order.email;
    // body.prePopulateShippingAddress = ...;
    // So-called transactionId is actually the orderId in the Square Payment API.
    // Square Order ID is available from the response to createCheckout.
    // Checkout ID isn't really used anywhere except checkout LMAO -- no way
    // of verifying using the checkout ID itself.
    // Gives three things as query string params:
    // checkoutId: self-explanatory
    // referenceId: our own order ID
    // transactionId: Square's order ID
    body.redirectUrl = `${process.env.FRONTEND_URL}/square-checkout-callback.html`;

    // Send request to Square API
    Logger.Info(JSON.stringify(body));
    const { result, ...others } = await squareClient().checkoutApi.createCheckout(
      process.env.SQUARE_LOC_ID,
      body // , { abortSignal }
    );

    Logger.Info(JSON.stringify(others));

    // Save paypal details
    // TODO: check whether we want to reuse existing payment object
    const payment = order.payment || new Payment();
    payment.order = order;
    payment.method = PaymentMethod.SQUARE;
    payment.totalPrice = totalPrice.intValue;
    // We want to store the Square Order ID instead of the Checkout ID, as this
    // is the only thing that can actually verify payment using the API.
    payment.transactionID = result.checkout.order.id;
    await conn.getRepository(Payment).save(payment);

    res.json({paypalOrderID: payment.transactionID, url: result.checkout.checkoutPageUrl});
  } catch (err) {
    if (err instanceof ApiError) {
      // If unsuccessful we will display the list of errors
      // eslint-disable-next-line no-console
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
    if (!order.detailsCompleted) {
      res.status(409).json({error: "Customer details have not been completed yet"});
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
    payment.totalPrice = totalPrice.intValue;
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
    // TODO: Use current date or date as specified in Square API?
    order.paidAt = new Date();
    await repo.save(order);

    const show = order.show;
    const production = show.production;

    sendEmail("order_complete", {
      from: {
        name: production.title,
        address: production.email,
      },
      to: {
        name: order.name,
        address: order.email
      },
      bcc: production.email,
      subject: `${production.title} ${production.year} - Payment Confirmation`
    }, {
      order,
      show,
      production,
      misc: {
        shortId: order.id.slice(0, 6).toUpperCase(),
        price: `$${(order.payment.totalPrice / 100).toFixed(2)}`,
        time: show.time.toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })
      }
    });

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
      req.params.id, {relations: ["payment", "show", "show.production"]}
    );
    if (!order) {
      res.status(404).json({error: "order not found"});
      return;
    }
    if (order.paid) {
      // This hopefully makes this idempotent so that we don't face issues with
      // repeat calls.
      res.json({success: true});
      // res.status(409).json({error: "order has already been paid"});
      return;
    }
    if (!order.payment || order.payment.method !== PaymentMethod.SQUARE) {
      res.status(409).json({error: "order has not been set up for Square"});
      return;
    }

    // Call Square API to verify payment has been made
    const { result, ...httpResponse } = await squareClient().ordersApi.retrieveOrder(order.payment.transactionID);
    console.log(JSON.stringify(result));

    // Verify that the order has been fully paid (COMPLETED) and the Square
    // order is for the same amount that we expect.
    if (!result.order) {
      res.status(409).json({error: "order has not been paid yet"});
      return;
    }

    if (result.order.state !== "COMPLETED" || result.order.totalMoney.amount < order.payment.totalPrice) {
      console.log(order.payment);

      if (0 < result.order.totalMoney.amount && result.order.totalMoney.amount < order.payment.totalPrice) {
        res.status(409).json({error: "Actual payment amount less than order amount."});
      } else {
        res.status(409).json({error: "order has not been paid yet"});
      }
      return;
    }

    // TODO: find/make an assertion library that performs 'hard' asserts in dev
    // but performs 'soft' asserts (e.g. console.assert) in production
    try {
      console.assert(
        order.payment.totalPrice === result.order.totalMoney.amount,
        "incorrect payment amount: expected %d, actual %d",
        order.payment.totalPrice, result.order.totalMoney.amount
      );
    } catch (e) {
      if (e && e.stack) {
        Logger.Error(e);
      }
    }

    // FIXME: what capture ID should we put here?
    order.payment.captureID = null;
    order.paid = true;
    order.paidAt = new Date();
    await repo.save(order);

    // Send email
    const show = order.show;
    const production = show.production;

    sendEmail("order_complete", {
      from: {
        name: production.title,
        address: production.email,
      },
      to: {
        name: order.name,
        address: order.email
      },
      bcc: production.email,
      subject: `${production.title} ${production.year} - Payment Confirmation`
    }, {
      order,
      show,
      production,
      misc: {
        shortId: order.id.slice(0, 6).toUpperCase(),
        price: `$${(order.payment.totalPrice / 100).toFixed(2)}`,
        time: show.time.toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })
      }
    });

    res.json({success: true});

  } catch (err) {
    if (err instanceof ApiError) {
      const errors = err.result;
      console.error(errors);
      // const { statusCode, headers } = err;
    }

    Logger.Error(err.stack);
    res.status(500).json({error: "Internal server error"});
  }
}

function AUD(amount: any): currency {
  return currency(amount, {separator: "", symbol: "", fromCents: true});
}
