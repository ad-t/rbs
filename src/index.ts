import dotenv from "dotenv";
import express from "express";

import "reflect-metadata";
import {
  ConnectionOptions,
  createConnection,
} from "typeorm";

import { Seat } from "./entity/seat";
import { Show } from "./entity/show";
import { Production } from "./entity/production";

import * as ProductionRoutes from "./routes/production";
import * as ShowRoutes from "./routes/show";


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

app.get("/productions/", ProductionRoutes.GetActive);
app.get("/productions/:id/shows", ProductionRoutes.GetShows);
app.get("/shows/:id/seats", ShowRoutes.GetSeats);
app.put("/shows/:id/seats", ShowRoutes.PurchaseSeats);

app.listen( port, async () => {
  await bootstrap();
  // tslint:disable-next-line:no-console
  console.log("Seeding database...");
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${ port }` );
});
