import {Request, Response} from "express";
import {Connection, getConnection} from "typeorm";
import isEmail from "validator/lib/isEmail";
import { Order } from "../entity/order";
import { Show } from "../entity/show";
import Logger from "../logging";

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
    let numSeats: number;
    let ticketTypeID: number;
    try {
      ({name, phone, email, numSeats, ticketType: ticketTypeID} = req.body);
      if (typeof name !== "string" || name.length === 0) {
        throw new Error("invalid name");
      }
      if (typeof phone !== "string" || phone.length < 10) {
        throw new Error("invalid phone");
      }
      if (typeof email !== "string" || !isEmail(email)) {
        throw new Error("invalid email");
      }
      if (typeof numSeats !== "number" || (!Number.isInteger(numSeats)) ||
          numSeats <= 0) {
        throw new Error("invalid numSeats");
      }
      if (typeof ticketTypeID !== "number" || (!Number.isInteger(numSeats)) || numSeats <= 0) {
        throw new Error("invalid ticketType");
      }
    } catch (err) {
      res.status(400).json({error: err.toString()});
      return;
    }

    const conn: Connection = await getConnection();
    await conn.transaction("READ COMMITTED", async (txEntityManager) => {
      const show = await txEntityManager.getRepository(Show).findOne(
        req.params.id, {relations: ["ticketTypes"]});
      if (!show) {
        res.status(404).json({error: `show not found: ${req.params.id}`});
        return;
      }

      if (numSeats + show.reservedSeats > show.totalSeats) {
        res.status(409).json({error: "Not enough available seats"});
        return;
      }

      // Find ticket type for show
      const filteredTicketType = show.ticketTypes.filter((tt) => tt.id === ticketTypeID);
      if (filteredTicketType.length < 1) {
        res.status(404).json({error: `show ${req.params.id} has no ticket type ${ticketTypeID}`});
        return;
      }
      const ticketType = filteredTicketType[0];

      if (numSeats < ticketType.minPurchaseAmount) {
        res.status(400).json({
          error: `minimum ${ticketType.minPurchaseAmount} seats for ticket type ${ticketTypeID}`
        });
        return;
      }

      let order: Order = new Order();
      order.name = name;
      order.email = email;
      order.phone = phone;
      order.show = show;
      order.numSeats = numSeats;
      order.ticketType = ticketType;
      order.subtotalPrice = ticketType.price * numSeats;

      show.reservedSeats += numSeats;
      await txEntityManager.save(show);
      order = await txEntityManager.save(order);
      res.status(201).json(order);
    });
  } catch (error) {
    res.status(500).json({error: error.toString()});
  }
}
