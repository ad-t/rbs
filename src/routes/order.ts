import {Request, Response} from "express";
import { getConnection } from "typeorm";
import { Order } from "../entity/order";

export async function GetOrder(req: Request, res: Response): Promise<void> {
  const conn = getConnection();
  const order: Order = await conn.getRepository(Order).findOne({id: req.params.id}, {relations: ["show"]});
  if (!order) {
    res.status(404).json({error: `No order found with id ${req.params.id}`});
    return;
  }
  res.json(order);
}
