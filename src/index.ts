import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import "reflect-metadata";
import {
  ConnectionOptions,
  createConnection,
  getConnection,
  getRepository,
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

const swaggerjsdocOptions: any = {
  apis: ["./dist/**/*.js"],
  swaggerDefinition: {
    info: {
      description: "API for the Revue Booking System site with autogenerated swagger docs",
      title: "Revue Booking System API",
      version: "1.0.0",
    },
  },
};

const specs = swaggerJsdoc(swaggerjsdocOptions);

const activeEntities = [
  Production,
  Show,
  Seat
];

const options: ConnectionOptions = {
  database: process.env.MYSQL_DATABASE,
  entities: activeEntities,
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
  if (process.env.NODE_ENV === "development") {
    app.use(cors());
    Logger.Info(`API documentation available at ${API_HOST}:${API_PORT}/docs`);
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
    Logger.Info("Since we're in the development environment, purge the database tables");
    getConnection().synchronize(true);
    Logger.Info("Seeding database...");
    await seedDB();
  }
}

/**
 * @swagger
 * definitions:
 *   Production:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       title:
 *         type: string
 *       subtitle:
 *         type: string
 *       year:
 *         type: string
 *       description:
 *         type: string
 *       shows:
 *         type: array
 *         $ref: "#/definitions/Show"
 *   Show:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       location:
 *         type: string
 *       time:
 *         type: string
 *       production:
 *         type: object
 *         $ref: "#/definitions/Production"
 *       seats:
 *         type: integer
 */

/**
 * @swagger
 * /productions:
 *   get:
 *     description: List all the active productions
 *     responses:
 *       200:
 *         description: Information about the production
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Production'
 *       400:
 *         description: Bad request
 */
app.get("/productions/", ProductionRoutes.GetActive);

/**
 * @swagger
 * /productions/{id}/shows:
 *   get:
 *     description: List all the shows for an active production
 *     responses:
 *       200:
 *         description: Information about the showings of a specific production
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/definitions/Show'
 *       400:
 *         description: Bad request
 */
app.get("/productions/:id/shows", ProductionRoutes.GetShows);

/**
 * @swagger
 * /shows/{id}/seats:
 *   get:
 *     description: Get the seat listings for a specific show
 *     responses:
 *       200:
 *         description: Information about the seats for a specific show
 *       400:
 *         description: Bad request
 */
app.get("/shows/:id/seats", ShowRoutes.GetSeats);

/**
 * @swagger
 * /shows/{id}/seats:
 *   put:
 *     description: Purchase seats for a specific show
 *     responses:
 *       200:
 *         description: Seats have been purchases successfully
 *       400:
 *         description: Bad request
 */
app.put("/shows/:id/seats", ShowRoutes.PurchaseSeats);

app.listen(API_PORT, async () => {
  await bootstrap();
  Logger.Info(`Server started at ${API_HOST}:${API_PORT}`);
});
