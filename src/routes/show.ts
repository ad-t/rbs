import {Request, Response} from "express";
import {Connection, getConnection, getRepository} from "typeorm";
import isEmail from "validator/lib/isEmail";
import { Order } from "../entity/order";
import { Show } from "../entity/show";
import { Ticket } from "../entity/ticket";
import Logger from "../logging";
import { VenueSeat } from "../entity/venue_seat";

export async function GetShow(req: Request, res: Response): Promise<void> {
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

function validateName(name: string) {
  if (typeof name !== "string" || name.length < 1) {
    throw new Error("invalid name");
  }
}

function validatePhone(phone: string) {
  if (typeof phone !== "string" || phone.length < 10) {
    throw new Error("invalid phone");
  }
}

function validateEmail(email: string) {
  if (typeof email !== "string" || !isEmail(email)) {
    throw new Error("invalid email");
  }
}

export async function getSeats(req: Request, res: Response): Promise<void> {
  try {
    // We have to use 'raw' as that appears to be the only way to get the
    // "booked" field to show.
    let results = await getRepository(VenueSeat)
      .createQueryBuilder("seat")
      .addSelect("IF(order.show IS NULL, FALSE, TRUE)", "booked")
      .leftJoin("seat.tickets", "ticket")
      .leftJoin("ticket.order", "order", "order.show = :id", { id: req.params.id })
      .getRawMany();

    results = results.map(a => ({
      seatNum: a.seat_seatNum,
      wheelchair: a.seat_wheelchair,
      type: a.seat_type,
      posX: +a.seat_posX,
      posY: +a.seat_posY,
      booked: a.booked
    }));
    res.json(results);
  } catch (error) {
    Logger.Error(error.toString());
    if (error.stack) {
      Logger.Error(error.stack);
    }
    res.status(500).json({error: error.toString()});
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
      validateName(name);
      validatePhone(phone);
      validateEmail(email);

      for (const seatsReq of seats) {
        if (!Array.isArray(seatsReq.details)) {
          throw new Error("invalid seats details");
        }
        if (seatsReq.details.length <= 0) {
          throw new Error("invalid num of seats");
        }
        // FIXME: actually validate against ticket type IDs
        if (!Number.isInteger(seatsReq.ticketType) || seatsReq.ticketType <= 0) {
          throw new Error("invalid ticketType");
        }
        totalSeats += seatsReq.details.length;
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
        if (seatReq.details.length < ticketType.minPurchaseAmount) {
          res.status(400).json({
            error: `minimum ${ticketType.minPurchaseAmount} seats for ticket type ${ticketType.id}`
          });
          return;
        }
        seatReq.ticketTypeObj = ticketType;
        subtotal += seatReq.details.length * ticketType.price;
      }

      console.log(subtotal);
      let order: Order = new Order();
      order.name = name;
      order.email = email;
      order.phone = phone;
      order.show = show;
      order.numSeats = totalSeats;
      order.subtotalPrice = subtotal;
      order.tickets = [];
      // NOTE: if we ever split up seat reserving and detail collection,
      // make sure to change this to false.
      order.detailsCompleted = true;
      show.reservedSeats += totalSeats;

      await txEntityManager.save(show);
      order = await txEntityManager.save(order);

      for (const seatsReq of seats) {
        for (const seatDetail of seatsReq.details) {// Check this seat exists
          const seatRepo = txEntityManager.getRepository(VenueSeat);
          const seat: VenueSeat = await seatRepo.findOne(seatDetail.seatNum);

          if (!seat) {
            res.status(400).json({error: `Invalid seat number`});
            return;
          }

          // Check this seat hasn't been booked by someone else
          const ticketRepo = txEntityManager.getRepository(Ticket);
          const ticketAlreadyBooked: Ticket = await ticketRepo.findOne({
            where: {
              seat: {
                seatNum: seatDetail.seatNum
              }
            },
            relations: ["seat"]
          });

          if (ticketAlreadyBooked) {
            res.status(409).json({error: `Seat {seatDetail.seatNum} already booked. Please go back to Seat Selection and pick another seat.`});
            return;
          }

          const ticket = new Ticket();
          ticket.ticketType = seatsReq.ticketTypeObj;
          ticket.order = order;
          ticket.name = seatDetail.name;
          ticket.phone = seatDetail.phone || '';
          ticket.postcode = seatDetail.postcode;
          ticket.seat = seat;
          await txEntityManager.save(ticket);
        }
      }

      res.status(201).json(order);
    });
  } catch (error) {
    Logger.Error(error.toString());
    Logger.Error(error.stack);
    res.status(500).json({error: error.toString()});
  }
}
