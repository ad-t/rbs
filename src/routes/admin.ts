import {Request, Response} from "express";
import {Connection, getConnection, getRepository, Like} from "typeorm";
import isEmail from "validator/lib/isEmail";
import { Order } from "../entity/order";
import { Show } from "../entity/show";
import { Ticket } from "../entity/ticket";
import { Payment, PaymentMethod } from "../entity/payment";
import Logger from "../logging";
import { StartsWith, Contains } from "../util/sql";
import { sendEmail } from "../services/email";
import generatePdf from "../services/ticket-pdf";

export async function getShowOrders(req: Request, res: Response) {
  if (!/^\d+$/.test(req.params.id)) {
    res.status(400).json({error: "invalid show ID"});
    return;
  }

  try {
    const conn = getConnection();
    const orders: Order[] = await conn.getRepository(Order).find({
      where: {
        show: {
          id: req.params.id
        }
      },
      relations: ["tickets", "tickets.ticketType"]
    });
    if (!orders) {
      res.status(404).json({error: `no show found with id ${req.params.id}`});
      return;
    }

    res.json(orders);
  } catch (err) {
    if (err.stack) {
      Logger.Error(err.stack);
    }
    res.status(500).json({error: "Internal server error"});
  }
}

export async function getOrder(req: Request, res: Response) {
  // Ensure at least 6 characters long.
  const orderId = String(req.params.id).trim();
  if (!/^[a-zA-Z0-9-]{6,}$/.test(orderId)) {
    res.status(400).json({error: "invalid order ID"});
    return;
  }

  try {
    const conn = getConnection();
    const orders: Order = await conn.getRepository(Order).findOne({
      where: {
        id: StartsWith(orderId)
      },
      relations: ["tickets", "tickets.ticketType", "tickets.seat", "show"]
    });
    if (!orders) {
      res.status(404).json({error: `no order found with id ${orderId}`});
      return;
    }

    res.json(orders);
  } catch (err) {
    if (err.stack) {
      Logger.Error(err.stack);
    }
    res.status(500).json({error: "Internal server error"});
  }
}

export async function getTicket(req: Request, res: Response) {
  // Ensure at least 6 characters long.
  if (!/^[a-zA-Z0-9-]{6,}$/.test(req.params.id)) {
    res.status(400).json({error: "invalid ticket ID"});
    return;
  }

  // IDs are in lower case format.
  const id = req.params.id.toLowerCase();

  try {
    const repo = getRepository(Ticket);
    const ticket: Ticket[] = await repo.find({
      where: {
        id: StartsWith(id)
      },
      relations: ["order", "order.show", "ticketType", "seat"]
    });
    if (!ticket) {
      res.status(404).json({error: `no ticket found with id ${req.params.id}`});
      return;
    }

    res.json(ticket);
  } catch (err) {
    if (err.stack) {
      Logger.Error(err.stack);
    }
    res.status(500).json({error: "Internal server error"});
  }
}

export async function checkInTicket(req: Request, res: Response) {
  // Ensure at least 6 characters long.
  if (!/^[a-zA-Z0-9-]{6,}$/.test(req.params.id)) {
    res.status(400).json({error: "invalid ticket ID"});
    return;
  }

  // IDs are in lower case format.
  const id = req.params.id.toLowerCase();

  try {
    const repo = getRepository(Ticket);
    const ticket: Ticket = await repo.findOne({
      where: {
        id: StartsWith(id)
      }
    });
    if (!ticket) {
      res.status(404).json({error: `no ticket found with id ${req.params.id}`});
      return;
    }

    if (ticket.checkInTime) {
      res.status(409).json({error: `ticket has already been checked in`});
      return;
    }

    ticket.checkInTime = new Date();
    await repo.save(ticket);

    res.json({success: true});
  } catch (err) {
    if (err.stack) {
      Logger.Error(err.stack);
    }
    res.status(500).json({error: "Internal server error"});
  }
}

export async function reverseCheckInTicket(req: Request, res: Response) {
  // Ensure at least 6 characters long.
  if (!/^[a-zA-Z0-9-]{6,}$/.test(req.params.id)) {
    res.status(400).json({error: "invalid ticket ID"});
    return;
  }

  // IDs are in lower case format.
  const id = req.params.id.toLowerCase();

  try {
    const repo = getRepository(Ticket);
    const ticket: Ticket = await repo.findOne({
      where: {
        id: StartsWith(id)
      }
    });
    if (!ticket) {
      res.status(404).json({error: `no ticket found with id ${req.params.id}`});
      return;
    }

    if (!ticket.checkInTime) {
      res.status(409).json({error: `ticket has not been checked in (or check in has been reversed)`});
      return;
    }

    ticket.checkInTime = null;
    await repo.save(ticket);

    res.json({success: true});
  } catch (err) {
    if (err.stack) {
      Logger.Error(err.stack);
    }
    res.status(500).json({error: "Internal server error"});
  }
}

export async function overridePayment(req: Request, res: Response) {
  // Ensure at least 6 characters long.
  if (!/^[a-zA-Z0-9-]{6,}$/.test(req.params.id)) {
    res.status(400).json({error: "invalid order ID"});
    return;
  }

  let amount: number;
  let name: String;
  let note: String;
  ({ amount, name, note } = req.body);

  if (typeof name !== "string" || name.length < 1 || typeof note !== "string" || note.length < 1) {
    res.status(400).json({error: "payment override needs name and reason"});
    return;
  }

  if (!Number.isInteger(amount) || amount < 0) {
    res.status(400).json({error: "payment amount must be an integer"});
    return;
  }

  // IDs are in lower case format.
  const id = req.params.id.toLowerCase();

  try {
    const repo = getRepository(Order);
    const order: Order = await repo.findOne({
      where: {
        id: StartsWith(id)
      },
      relations: ["payment"]
    });
    if (!order) {
      res.status(404).json({error: `no order found with id ${req.params.id}`});
      return;
    }

    if (order.paid) {
      res.status(409).json({error: `order has already been paid`});
      return;
    }

    if (order.payment) {
      await getRepository(Payment).remove(order.payment);
    }

    const payment = new Payment();
    payment.method = PaymentMethod.MANUAL_OVERRIDE;
    payment.totalPrice = amount;
    payment.notes = `${name}: ${note}`;
    payment.transactionID = "override";

    order.paid = true;
    order.payment = payment;
    await repo.save(order);

    res.json({success: true});
  } catch (err) {
    if (err.stack) {
      Logger.Error(err.stack);
    }
    res.status(500).json({error: "Internal server error"});
  }
}


export async function emailEntryPasses(req: Request, res: Response) {
  // Ensure at least 6 characters long.
  if (!/^[a-zA-Z0-9-]{6,}$/.test(req.params.id)) {
    res.status(400).json({error: "invalid order ID"});
    return;
  }

  // IDs are in lower case format.
  const id = req.params.id.toLowerCase();

  try {
    const repo = getRepository(Order);
    const order: Order = await repo.findOne({
      where: {
        id: StartsWith(id)
      },
      relations: ["tickets", "tickets.ticketType", "tickets.seat", "show", "show.production"]
    });
    if (!order) {
      res.status(404).json({error: `no order found with id ${req.params.id}`});
      return;
    }

    if (!order.paid) {
      res.status(409).json({error: `order has not been paid`});
      return;
    }

    const attachments = [];

    for (const ticket of order.tickets) {
      attachments.push({
        filename: `${ticket.id.slice(0, 8).toUpperCase()}-${ticket.seat.seatNum}.pdf`,
        content: await generatePdf(order, ticket)
      });
    }

    const production = order.show.production;

    sendEmail("entry_passes", {
      from: {
        name: production.title,
        address: production.email,
      },
      to: {
        name: order.name,
        address: order.email
      },
      bcc: production.email,
      subject: `${production.title} ${production.year} - Entry Passes`
    }, {
      order
    }, attachments);

    res.json({success: true});
  } catch (err) {
    if (err.stack) {
      Logger.Error(err.stack);
    }
    res.status(500).json({error: "Internal server error"});
  }
}

