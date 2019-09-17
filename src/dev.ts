import { Connection, getConnection } from "typeorm";
import { Production } from "./entity/production";
import { Show } from "./entity/show";

// Seed database
export async function seedDB() {
  try {
    const conn: Connection = await getConnection();
    const prod = new Production();
    prod.id = 1;
    prod.title = "test";
    prod.subtitle = "test sub";
    prod.year = "2019";
    prod.description = "lol";
    const s1 = new Show();
    s1.id = 1;
    s1.location = "Science Theatre";
    s1.time = new Date();
    s1.totalSeats = 150;
    s1.seatPrice = 12.00;
    await conn.manager.save(s1);
    const s2 = new Show();
    s2.id = 2;
    s2.location = "Science Theatre";
    s2.time = new Date();
    s2.totalSeats = 150;
    s2.seatPrice = 15.00;
    await conn.manager.save(s2);
    prod.shows = [
      s1,
      s2
    ];
    await conn.manager.save(prod);
  } catch (error) {
    throw Error(`ERROR: Failed to seed database.\n${error}`);
  }
}
