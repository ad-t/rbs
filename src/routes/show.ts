import { Request, Response } from "express";
import { Connection, getConnection, getRepository } from "typeorm";
import Logger from "../logging";

// purchase seats
export async function PurchaseSeats(req: Request, res: Response) {
  try {
    const conn: Connection = await getConnection();
    // extract seats from json message
    const seatIDs: any = JSON.parse(req.body).seats;
    // determine whether the seats exist and whether they are all available
    // TODO: Implement the check for ensuring all seats are still available,
    // and then updating the records to "purchase" the seats
  } catch (error) {
    res.sendStatus(400);
  }
}
