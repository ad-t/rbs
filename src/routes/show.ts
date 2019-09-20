import {Request, Response} from "express";
import {Connection, getConnection, getRepository} from "typeorm";
import isEmail from "validator/lib/isEmail";
import { Order } from "../entity/order";
import { Show } from "../entity/show";
import Logger from "../logging";

export async function ReserveSeats(req: Request, res: Response): Promise<void> {
  try {
    let name: string;
    let phone: string;
    let email: string;
    let numSeats: number;
    try {
      ({name, phone, email, numSeats} = req.body);
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
    } catch (err) {
      res.status(400).json({error: err.toString()});
      return;
    }

    const conn: Connection = await getConnection();
    await conn.transaction("READ COMMITTED", async (txEntityManager) => {
      const show = await txEntityManager.getRepository(Show).findOne(req.params.id);
      if (!show) {
        res.status(404).json({error: `show not found: ${req.params.id}`});
        return;
      }

      if (numSeats + show.reservedSeats > show.totalSeats) {
        res.status(409).json({error: "Not enough available seats"});
        return;
      }

      let order: Order = new Order();
      order.name = name;
      order.email = email;
      order.phone = phone;
      order.show = show;
      order.numSeats = numSeats;
      order.subtotalPrice = show.seatPrice * numSeats;

      show.reservedSeats += numSeats;
      await txEntityManager.save(show);
      order = await txEntityManager.save(order);
      res.status(201).json(order);
    });
  } catch (error) {
    res.status(500).json({error: error.toString()});
  }
}
