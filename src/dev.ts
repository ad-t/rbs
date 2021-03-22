import { Connection, getConnection } from "typeorm";
import { Production } from "./entity/production";
import { Show } from "./entity/show";
import { TicketType } from "./entity/ticket_type";

// Seed database
export async function seedDB(): Promise<void> {
  try {
    const conn: Connection = getConnection();
    const prod = new Production();
    prod.id = 1;
    prod.title = "CSE Revue";
    prod.subtitle = "The Bee Movie";
    prod.year = 2021;
    prod.description = "lol";
    prod.location = "Science Theatre";
    prod.showImage = "";
    const s1 = new Show();
    s1.id = 1;
    s1.time = new Date("July 20, 2021 19:30:00");
    s1.totalSeats = 150;
    await conn.manager.save(s1);
    const s2 = new Show();
    s2.id = 2;
    s2.time = new Date("July 21, 2021 19:30:00");
    s2.totalSeats = 150;
    await conn.manager.save(s2);
    prod.shows = [
      s1,
      s2
    ];
    await conn.manager.save(prod);

    [s1, s2].forEach((show, i) => {
      const tt1 = new TicketType();
      tt1.id = i * 2 + 1;
      tt1.description = "Single";
      tt1.price = 1500;
      tt1.minPurchaseAmount = 1;
      tt1.show = show;

      const tt2 = new TicketType();
      tt2.id = i * 2 + 2;
      tt2.description = "Group";
      tt2.price = 1200;
      tt2.minPurchaseAmount = 5;
      tt2.show = show;

      conn.manager.save(tt1);
      conn.manager.save(tt2);
    });

  } catch (error) {
    throw new Error(`ERROR: Failed to seed database.\n${String(error)}`);
  }
}
