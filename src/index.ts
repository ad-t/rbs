import dotenv from "dotenv";
import express from "express";

import "reflect-metadata";
import {Connection, ConnectionOptions, createConnection} from "typeorm";
import {Production} from "./entity/production";
import {Show} from "./entity/show";

// initialise config
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

const options: ConnectionOptions = {
  database: "rbs-development",
  entities: [
    Production,
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

// Seed database
async function seedDB() {
  try {
    const conn: Connection = await createConnection(options);
    const prod = new Production();
    prod.title = "test";
    prod.subtitle = "test sub";
    prod.year = "2019";
    const s1 = new Show();
    s1.location = "Science Theatre";
    s1.time = new Date();
    await conn.manager.save(s1);
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

app.get("/", async (req, res) => {
  try {
    const conn: Connection = await createConnection(options);
    res.send("yeet");
  } catch (error) {
    res.send("failed");
  }
});

app.listen( port, () => {
  seedDB();
  // tslint:disable-next-line:no-console
  console.log("Seeding database...");
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${ port }` );
});
