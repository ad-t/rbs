import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import basicAuth from "express-basic-auth";
import bodyParser = require("body-parser");
import cron = require("node-cron");

import "reflect-metadata";
import {
  ConnectionOptions,
  createConnection,
  getConnection,
  getRepository,
  LessThan
} from "typeorm";

import { Order } from "./entity/order";
import { Production } from "./entity/production";
import { Show } from "./entity/show";

import * as OrderRoutes from "./routes/order";
import * as ProductionRoutes from "./routes/production";
import * as ShowRoutes from "./routes/show";
import * as AdminRoutes from "./routes/admin";

// libraries
import { seedDB } from "./dev";
import { Payment } from "./entity/payment";
import { Ticket } from "./entity/ticket";
import { TicketType } from "./entity/ticket_type";
import { VenueSeat } from "./entity/venue_seat";
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
  Payment,
  TicketType,
  Ticket,
  VenueSeat
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
  function afterResponse() {
    res.removeListener("finish", afterResponse);
    res.removeListener("close", afterResponse);
    Logger.Info(`${res.statusCode} - ${req.path}`);
  }

  res.on("finish", afterResponse);
  res.on("close", afterResponse);
  next();
}

// setup
async function bootstrap() {
  Logger.Info("Creating database connection...");
  await createConnection(options);
  if (process.env.NODE_ENV === "development") {
    Logger.Info("Development environment: to clear the tables, go to /reset");
  }
}

async function resetDB() {
  Logger.Info("Purging the database tables...");
  // Can't use .clear() as TRUNCATE doesn't work with foreign key constraints.
  /*await Promise.all(
    activeEntities.map(async (entity) => await getRepository(entity).delete({}))
  );*/
  for (const entity of activeEntities) {
    await getRepository(entity).delete({});
  }
  Logger.Info("Seeding database...");
  await seedDB();
}

Logger.Init();
app.use(bodyParser.json());
app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
  credentials: true
}));

if (process.env.NODE_ENV === "development") {
  Logger.Info(`API documentation available at ${API_HOST}:${API_PORT}/docs`);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

  app.get("/reset", async function (_, res) {
    try {
      await resetDB();
      res.json({success: true});
    } catch (err) {
      Logger.Error(err.stack);
      res.status(500).json({error: "Internal server error"});
    }
  });
}

app.listen(API_PORT, async () => {
  await bootstrap();
  Logger.Info(`Server started at ${API_HOST}:${API_PORT}`);
});

console.log(process.env.ADMIN_URL);
const adminCors = cors({
  origin: process.env.ADMIN_URL,
  credentials: true
});

const adminLogin = basicAuth({
    users: { [process.env.FOH_ADMIN_USERNAME]: process.env.FOH_ADMIN_PWD },
    challenge: true,
    realm: 'MRTS Admin 2021'
});

const adminPage = [adminCors, adminLogin];

/*
cron.schedule('* * * * *', () => {
  const repo = getRepository(Order);
  repo.delete({
    // TODO: apparently this doesn't work on sqlite but does on MySQL???
    updatedAt: LessThan(new Date(Date.now() - 20 * 60 * 1000)),
    paid: false
  });
});
*/

/**
 * @swagger
 * /admin/shows/{id}/tickets:
 *   get:
 *     summary: Get show info and ticket types
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: show id
 *     responses:
 *       200:
 *         description: Information about the show and ticket types
 *       404:
 *         description: Show not found
 */
app.get("/admin/shows/:id/tickets", adminPage, AdminRoutes.getShowOrders);

app.post("/admin/tickets/:id/check-in", adminPage, AdminRoutes.checkInTicket);

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
 * /shows/{id}:
 *   get:
 *     summary: Get show info and ticket types
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: show id
 *     responses:
 *       200:
 *         description: Information about the show and ticket types
 *       404:
 *         description: Show not found
 */
app.get("/shows/:id", ShowRoutes.GetShow);

/**
 * @swagger
 * /shows/{id}/seats:
 *   post:
 *     summary: Get seat map for a specific show
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: show id
 *     responses:
 *       200:
 *         description: Seats have been reserved successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: No show with given ID
 */
app.get("/shows/:id/seats", ShowRoutes.getSeats);

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
 *         example: 1
 *       - in: body
 *         name: reservation
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - email
 *             - phone
 *             - seats
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
 *             seats:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   numSeats:
 *                     type: integer
 *                     example: 1
 *                   ticketType:
 *                     type: integer
 *                     example: 1
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
 * /orders/{id}:
 *   get:
 *     summary: Set customer details (name/etc). Required before setting up payment.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: order uuid
 *       - in: body
 *         name: customerdeets
 *     responses:
 *       200:
 *         description: Retrieved order
 *       404:
 *         description: Order with ID not found
 */
app.post("/orders/:id/details", OrderRoutes.CompleteDetails);

/**
 * @swagger
 * /orders/{id}/square-setup:
 *   post:
 *     summary: Setup order with Square
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
app.post("/orders/:id/square-setup", OrderRoutes.SetupSquare);

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

/**
 * @swagger
 * /orders/{id}/square-verify-payment:
 *   post:
 *     summary: Verify that a user has made a payment to Square
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
app.post("/orders/:id/square-verify-payment", OrderRoutes.SquareVerifyPayment);
