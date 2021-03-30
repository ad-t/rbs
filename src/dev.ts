import { Connection, getConnection } from "typeorm";
import { Production } from "./entity/production";
import { Show } from "./entity/show";
import { TicketType } from "./entity/ticket_type";
import test from "./seat-init";

// Seed database
export async function seedDB(): Promise<void> {
  try {
    const conn: Connection = getConnection();
    const prod = new Production();
    prod.id = 1;
    prod.title = "Med Revue";
    prod.subtitle = "Breaking Bones";
    prod.year = 2021;
    prod.description = "Hello";
    prod.location = "Science Theatre";
    prod.showImage = "";
    const s1 = new Show();
    s1.id = 1;
    s1.time = new Date("2021-04-13T19:00:00+10:00");
    s1.totalSeats = 100;
    await conn.manager.save(s1);
    const s2 = new Show();
    s2.id = 2;
    s2.time = new Date("2021-04-14T19:00:00+10:00");
    s2.totalSeats = 100;
    await conn.manager.save(s2);
    const s3 = new Show();
    s3.id = 3;
    s3.time = new Date("2021-04-15T19:00:00+10:00");
    s3.totalSeats = 100;
    await conn.manager.save(s3);
    const s4 = new Show();
    s4.id = 4;
    s4.time = new Date("2021-04-16T19:00:00+10:00");
    s4.totalSeats = 100;
    await conn.manager.save(s4);
    prod.shows = [
      s1,
      s2,
      s3,
      s4
    ];
    await conn.manager.save(prod);

    for (const [s, i] of [s1, s2, s3, s4].entries()) {
      const tt1 = new TicketType();
      tt1.description = "General";
      tt1.price = 2100;
      tt1.minPurchaseAmount = 1;
      tt1.show = show;

      const tt2 = new TicketType();
      tt2.description = "General (Group 4+)";
      tt2.price = 1890;
      tt2.minPurchaseAmount = 1;
      tt2.show = show;

      const tt3 = new TicketType();
      tt3.description = "Arc";
      tt3.price = 1650;
      tt3.minPurchaseAmount = 1;
      tt3.show = show;

      const tt4 = new TicketType();
      tt4.description = "Arc (Group 4+)";
      tt4.price = 1500;
      // TODO: implement Arc + General checks on the backend
      tt4.minPurchaseAmount = 1;
      tt4.show = show;

      await conn.manager.save(tt3);
      await conn.manager.save(tt4);
      await conn.manager.save(tt1);
      await conn.manager.save(tt2);
    }

    test();

  } catch (error) {
    throw new Error(`ERROR: Failed to seed database.\n${String(error)}`);
  }
}
