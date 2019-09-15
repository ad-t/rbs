import dotenv from "dotenv";
import express from "express";

import "reflect-metadata";
import {
  ConnectionOptions,
  createConnection,
} from "typeorm";

import { Production } from "./entity/production";
import { Seat } from "./entity/seat";
import { Show } from "./entity/show";

import * as ProductionRoutes from "./routes/production";
import * as ShowRoutes from "./routes/show";

// libraries
import { seedDB } from "./dev";
import Logger from "./logging";

// initialise config
dotenv.config();

const app = express();
const API_PORT = process.env.SERVER_PORT;
const API_HOST = "http://localhost";

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
  Logger.Init();
  Logger.Info("Creating database connection...");
  await createConnection(options);
  if (false) {
    Logger.Info("Seeding database...");
    await seedDB();
  }
}

app.get("/productions/", ProductionRoutes.GetActive);
app.get("/productions/:id/shows", ProductionRoutes.GetShows);
app.get("/shows/:id/seats", ShowRoutes.GetSeats);
app.put("/shows/:id/seats", ShowRoutes.PurchaseSeats);

app.listen(API_PORT, async () => {
  await bootstrap();
  Logger.Info(`Server started at ${API_HOST}:${API_PORT}`);
});
