import {Request, Response} from "express";
import {Connection, getConnection} from "typeorm";
import isEmail from "validator/lib/isEmail";
import { Order } from "../entity/order";
import { Show } from "../entity/show";
import { Ticket } from "../entity/ticket";
import Logger from "../logging";

export async function GetShowOrders(req: Request, res: Response) {
  if (!/^\d+$/.test(req.params.id)) {
    res.sendStatus(400);
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
      relations: ["tickets"]
    });
    if (!orders) {
      res.status(404).json({error: `no show found with id ${req.params.id}`});
    }

    res.json(orders);
  } catch (err) {
    Logger.Error(err.stack);
    res.status(500).json({error: "Internal server error"});
  }
}
