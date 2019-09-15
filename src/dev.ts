import { getConnection, Connection } from "typeorm";
import { Production } from "./entity/production";
import { Show } from "./entity/show";
import { Seat } from "./entity/seat";

// Seed database
export async function seedDB() {
    try {
      const conn: Connection = await getConnection();
      const prod = new Production();
      prod.title = "test";
      prod.subtitle = "test sub";
      prod.year = "2019";
      prod.description = "lol";
      const s1 = new Show();
      s1.location = "Science Theatre";
      s1.time = new Date();
  
      const se1 = new Seat();
      se1.show = s1;
      se1.row = "A";
      se1.seatNumber = 1;
  
      const se2 = new Seat();
      se2.show = s1;
      se2.row = "A";
      se2.seatNumber = 2;
  
      s1.seats = [
        se1,
        se2
      ];
      await conn.manager.save(s1);
      await conn.manager.save(se1);
      await conn.manager.save(se2);
      const s2 = new Show();
      s2.location = "Science Theatre";
      s2.time = new Date();
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