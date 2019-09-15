import { Request, Response } from "express";
import { Connection, getConnection, getRepository } from "typeorm";
import Logger from "../logging";

import { Seat } from "../entity/seat";

// list seats
export async function GetSeats(req: Request, res: Response) {
  try {
    const conn: Connection = await getConnection();
    // make sure the seat exists
    const seats = await conn.getRepository(Seat).find({
      show: { id: parseInt(req.params.id, 10) }
    });
    res.send(seats);
  } catch (error) {
    res.sendStatus(400);
  }
}

// purchase seats
export async function PurchaseSeats(req: Request, res: Response) {
  try {
    const conn: Connection = await getConnection();
    // extract seats from json message
    const seatIDs: any = JSON.parse(req.body).seats;
    // determine whether the seats exist and whether they are all available
    const seats = await conn.getRepository(Seat).findByIds(seatIDs);
    // verify that there is the same amount of seats and that they are all available
    if (seats.length !== seatIDs.length) {
      const errors = { error: "Invalid Seats" };
      throw new Error(JSON.stringify(errors));
    }
    // TODO: Implement the check for ensuring all seats are still available,
    // and then updating the records to "purchase" the seats
  } catch (error) {
    res.sendStatus(400);
  }
}
