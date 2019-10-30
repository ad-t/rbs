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
  if (!/^\d+$/.test(req.params.id)) {
    res.sendStatus(400);
    return;
  }

  const id = parseInt(req.params.id, 10);

  try {
    const conn: Connection = await getConnection();
    const prods = await conn.getRepository(Production).findOne({ id });
    if (!prods) {
      res.sendStatus(404);
      return;
    }

    const result = await conn.getRepository(Show).find({
      production: { id }
    });
    res.send(result);
  } catch (error) {
    res.sendStatus(400);
  }
}
