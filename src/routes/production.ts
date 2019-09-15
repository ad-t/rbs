import { Request, Response } from "express";
import { Connection, getConnection, getRepository } from "typeorm";
import Logger from "../logging";

import { Production } from "../entity/production";
import { Show } from "../entity/show";

// get active productions
export async function GetActive(req: Request, res: Response): Promise<void> {
  // TODO: the active productions part
  try {
    const conn: Connection = await getConnection();
    const prods = await conn.getRepository(Production).find();
    res.send(prods);
  } catch (error) {
    res.sendStatus(400);
  }
}

// get all shows corresponding to a production
export async function GetShows(req: Request, res: Response): Promise<void> {
  try {
    const conn: Connection = await getConnection();
    const result = await conn.getRepository(Show).find({
      production: { id: parseInt(req.params.id, 10) }
    });
    res.send(result);
  } catch (error) {
    res.sendStatus(400);
  }
}
