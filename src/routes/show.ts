import {Request, Response} from "express";
import {Connection, getConnection} from "typeorm";
import isEmail from "validator/lib/isEmail";
import { Order } from "../entity/order";
import { Show } from "../entity/show";
import { Ticket } from "../entity/ticket";
import Logger from "../logging";
import { sendEmail } from "../services/email";

export async function GetShow(req: Request, res: Response) {
  if (!/^\d+$/.test(req.params.id)) {
    res.sendStatus(400);
    return;
  }

  try {
    const conn = getConnection();
    const show: Show = await conn.getRepository(Show).findOne(
      req.params.id, {relations: ["production", "ticketTypes"]});
    if (!show) {
      res.status(404).json({error: `no show found with id ${req.params.id}`});
    }
    res.json(show);
  } catch (err) {
    Logger.Error(err.stack);
    res.status(500).json({error: "Internal server error"});
  }
}

export async function ReserveSeats(req: Request, res: Response): Promise<void> {
  try {
    let name: string;
    let phone: string;
    let email: string;
    let seats: any[];
    let totalSeats = 0;
    try {
      ({name, phone, email, seats} = req.body);
      if (typeof name !== "string" || name.length === 0) {
        throw new Error("invalid name");
      }
      if (typeof phone !== "string" || phone.length < 10) {
        throw new Error("invalid phone");
      }
      if (typeof email !== "string" || !isEmail(email)) {
        throw new Error("invalid email");
      }
      for (const seatsReq of seats) {
        if (typeof seatsReq.numSeats !== "number"
            || (!Number.isInteger(seatsReq.numSeats))
            || seatsReq.numSeats <= 0) {
          throw new Error("invalid numSeats");
        }
        if (typeof seatsReq.ticketType !== "number"
            || (!Number.isInteger(seatsReq.ticketType))
            || seatsReq.ticketType <= 0) {
          throw new Error("invalid ticketType");
        }
        totalSeats += seatsReq.numSeats;
      }
    } catch (err) {
      res.status(400).json({error: err.toString()});
      return;
    }

    const conn: Connection = await getConnection();
    await conn.transaction("READ COMMITTED", async (txEntityManager) => {
      const show = await txEntityManager.getRepository(Show).findOne(
        req.params.id, {relations: ["ticketTypes", "production"]}
      );

      if (!show) {
        res.status(404).json({error: `show not found: ${req.params.id}`});
        return;
      }

      if (totalSeats + show.reservedSeats > show.totalSeats) {
        res.status(409).json({error: "Not enough available seats"});
        return;
      }

      let subtotal = 0;
      for (const seatReq of seats) {
        const ticketType = show.ticketTypes.find((tt) => tt.id === seatReq.ticketType);
        if (!ticketType) {
          res.status(404).json({error: `show ${req.params.id} has no ticket type ${seatReq.ticketType}`});
          return;
        }
        if (seatReq.numSeats < ticketType.minPurchaseAmount) {
          res.status(400).json({
            error: `minimum ${ticketType.minPurchaseAmount} seats for ticket type ${ticketType.id}`
          });
          return;
        }
        seatReq.ticketTypeObj = ticketType;
        subtotal += seatReq.numSeats * ticketType.price;
      }

      const order: Order = new Order();
      order.name = name;
      order.email = email;
      order.phone = phone;
      order.show = show;
      order.numSeats = totalSeats;
      order.subtotalPrice = subtotal;
      order.tickets = [];

      show.reservedSeats += totalSeats;

      await txEntityManager.save(show);
      await txEntityManager.save(order);

      for (const seatsReq of seats) {
        for (let i = 0; i < seatsReq.numSeats; i++) {
          const ticket = new Ticket();
          ticket.ticketType = seatsReq.ticketTypeObj;
          ticket.order = order;
          await txEntityManager.save(ticket);
        }
      }

      res.status(201).json(order);

      const production = show.production;
      const expires = new Date(order.createdAt);
      expires.setDate(order.createdAt.getDate() + 2);

      /*
      sendEmail("order_reserved", {
        to: order.email,
        subject: `${production.title} ${production.year} - Seat Reservation`
      }, {
        order,
        show,
        production,
        expires
      });
      */
    });
  } catch (error) {
    Logger.Error(error.toString());
    Logger.Error(error.stack);
    res.status(500).json({error: error.toString()});
  }
}
