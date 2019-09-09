import dotenv from "dotenv";
import express from "express";

import "reflect-metadata";
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnection,
  getRepository
} from "typeorm";
import {Production} from "./entity/production";
import {Seat} from "./entity/seat";
import {Show} from "./entity/show";

// initialise config
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

const options: ConnectionOptions = {
  database: process.env.MYSQL_DATABASE,
  entities: [
    Production,
    Show,
    Seat
  ],
  host: "localhost",
  logging: false,
  migrations: [
    // "src/migration/**/*.ts"
  ],
  password: process.env.MYSQL_PASSWD,
  port: 3306,
  subscribers: [
    // "src/subscriber/**/*.ts"
  ],
  synchronize: true,
  type: "mysql",
  username: process.env.MYSQL_USER,
};

// setup
async function bootstrap() {
  await createConnection(options);
  // await seedDB();
}

// Seed database
async function seedDB() {
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

app.get("/productions", async (req, res) => {
  try {
    const conn: Connection = await getConnection();
    const prods = await getRepository(Production).find();
    res.send(prods);
  } catch (error) {
    res.send(error);
  }
});

app.get("/productions/:productionID/shows", async (req, res) => {
  try {
    const conn: Connection = await getConnection();
    const result = await conn.getRepository(Show).find({
        production: {id: parseInt(req.params.productionID, 10)}
      });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// purchase seats
app.get("/productions/:productionID/shows/:showID/seats", async (req, res) => {
  try {
    const conn: Connection = await getConnection();
    // make sure the seat exists
    const seats = await conn.getRepository(Seat).find({
      show: { id: parseInt(req.params.showID, 10) }
    });
    res.send(seats);
  } catch (error) {
    res.send(error);
  }
});

app.listen( port, async () => {
  await bootstrap();
  // tslint:disable-next-line:no-console
  console.log("Seeding database...");
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${ port }` );
});
