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
import {Show} from "./entity/show";

// initialise config
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

const options: ConnectionOptions = {
  database: process.env.MYSQL_DATABASE,
  entities: [
    Production,
    Show
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
  await seedDB();
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
    const result  = await conn.getRepository(Production).find({
      relations: ["shows"],
      where: {id: parseInt(req.params.productionID, 10)},
    });
    res.send(result[0].shows);
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
