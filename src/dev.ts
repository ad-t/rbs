import { Connection, getConnection } from "typeorm";
import { Production } from "./entity/production";
import { Show } from "./entity/show";
import { TicketType } from "./entity/ticket_type";

// Seed database
export async function seedDB() {
  try {
    const conn: Connection = await getConnection();
    const prod = new Production();
    prod.id = 1;
    prod.title = "CSE Revue";
    prod.subtitle = "Arraybian bytes";
    prod.year = 2019;
    prod.description = "lol";
    prod.location = "Science Theatre";
    prod.showImage = "";
    prod.email = "ticketing@cserevue.org.au";

    const s1 = new Show();
    s1.id = 1;
    s1.time = new Date();
    s1.totalSeats = 150;
    await conn.manager.save(s1);

    const s2 = new Show();
    s2.id = 2;
    s2.time = new Date();
    s2.totalSeats = 150;
    await conn.manager.save(s2);

    prod.shows = [
      s1,
      s2
    ];
    await conn.manager.save(prod);

    [s1, s2].forEach(async (show, i) => {
      const tt1 = new TicketType();
      tt1.id = i * 2 + 1;
      tt1.description = "Single";
      tt1.price = 15.00;
      tt1.minPurchaseAmount = 1;
      tt1.show = show;
      await conn.manager.save(tt1);

      const tt2 = new TicketType();
      tt2.id = i * 2 + 2;
      tt2.description = "Group";
      tt2.price = 12.00;
      tt2.minPurchaseAmount = 5;
      tt2.show = show;
      await conn.manager.save(tt2);
    });

  } catch (error) {
    throw Error(`ERROR: Failed to seed database.\n${error}`);
  }
}
