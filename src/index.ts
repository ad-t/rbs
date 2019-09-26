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

import { Order } from "./entity/order";
import { Production } from "./entity/production";
import { Show } from "./entity/show";

import * as OrderRoutes from "./routes/order";
import * as ProductionRoutes from "./routes/production";
import * as ShowRoutes from "./routes/show";

// libraries
import bodyParser = require("body-parser");
import { seedDB } from "./dev";
import { PaypalOrder } from "./entity/paypal_order";
import Logger from "./logging";

// initialise config
dotenv.config();

const app = express();
const API_PORT = process.env.SERVER_PORT;
const API_HOST = "http://localhost";
app.use(genericLoggingMiddleware);

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
  Order,
  PaypalOrder
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

function genericLoggingMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  next();
  Logger.Info(`${res.statusCode} - ${req.path}`);
}

// setup
async function bootstrap() {
  Logger.Info("Creating database connection...");
  await createConnection(options);
  if (process.env.NODE_ENV === "development") {
    Logger.Info("Since we're in the development environment, purge the database tables");
    activeEntities.forEach(async (entity) => await getConnection().getRepository(entity).delete({}));
    Logger.Info("Seeding database...");
    await seedDB();
  }
}

if (process.env.NODE_ENV === "development") {
  Logger.Init();
  app.use(cors());
  app.use(bodyParser.json());
  Logger.Info(`API documentation available at ${API_HOST}:${API_PORT}/docs`);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
}

app.listen(API_PORT, async () => {
  await bootstrap();
  Logger.Info(`Server started at ${API_HOST}:${API_PORT}`);
});

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
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: show id
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
 *   post:
 *     summary: Reserve seats for a specific show
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: show id
 *       - in: body
 *         name: reservation
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - email
 *             - phone
 *             - numSeats
 *           properties:
 *             name:
 *               type: string
 *               example: John Smith
 *             email:
 *               type: string
 *               example: john@example.com
 *             phone:
 *               type: string
 *               example: 0412345678
 *             numSeats:
 *               type: integer
 *               example: 1
 *     responses:
 *       201:
 *         description: Seats have been reserved successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: No show with given ID
 *       409:
 *         description: Not enough available seats to fufil request
 */
app.post("/shows/:id/seats", ShowRoutes.ReserveSeats);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get summary of a reserved order.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: order uuid
 *     responses:
 *       200:
 *         description: Retrieved order
 *       404:
 *         description: Order with ID not found
 */
app.get("/orders/:id", OrderRoutes.GetOrder);

/**
 * @swagger
 * /orders/{id}/paypal-setup:
 *   post:
 *     summary: Setup order with paypal
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: order uuid
 *     responses:
 *       200:
 *         description: Order has been setup
 *       404:
 *         description: Order with ID not found
 */
app.post("/orders/:id/paypal-setup", OrderRoutes.SetupPaypal);

/**
 * @swagger
 * /orders/{id}/paypal-capture:
 *   post:
 *     summary: Capture a paypal order after user has approved
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: order uuid (not paypal order id)
 *     responses:
 *       200:
 *         description: order has been captured
 *       404:
 *         description: Order with ID not found
 */
app.post("/orders/:id/paypal-capture", OrderRoutes.PaypalCaptureOrder);
