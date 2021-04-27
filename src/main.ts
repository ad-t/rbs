import cors from "cors";
import express, {Request, Response} from "express";

import {
  getRepository
} from "typeorm";

import Logger from "./logging";

import * as OrderRoutes from "./routes/order";
import * as ProductionRoutes from "./routes/production";
import * as ShowRoutes from "./routes/show";

import { Discount } from "./entity/discount";

export default function () {
  const router = express.Router();

  router.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL]
  }));


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
  router.get("/productions/", ProductionRoutes.GetActive);

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
  router.get("/productions/:id/shows", ProductionRoutes.GetShows);

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
  router.get("/shows/:id", ShowRoutes.GetShow);

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
  router.get("/shows/:id/seats", ShowRoutes.getSeats);

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
  router.post("/shows/:id/seats", ShowRoutes.ReserveSeats);

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
  router.get("/orders/:id", OrderRoutes.GetOrder);

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
  router.post("/orders/:id/details", OrderRoutes.CompleteDetails);

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
  router.post("/orders/:id/square-setup", OrderRoutes.SetupSquare);

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
  router.post("/orders/:id/paypal-setup", OrderRoutes.SetupPaypal);

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
  router.post("/orders/:id/paypal-capture", OrderRoutes.PaypalCaptureOrder);

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
  router.post("/orders/:id/square-verify-payment", OrderRoutes.SquareVerifyPayment);

  router.get("/validate-discount", async function (req: Request, res: Response) {
    const code = String(req.query.code).toUpperCase();
    const showId = +req.query.showId;

    if (!Number.isInteger(showId)) {
      Logger.Info(`Invalid show id: ${showId}`);
      res.json({ discount: null });
      return;
    }

    const repo = getRepository(Discount);
    /*
    insert into `discount` (name, code, message, minGroupSize, waiveHandlingFee, showId, partOfGroup) values ("K-Pop Soc", "CUTEBIAS2021","Wednesday night - handling fee waived! Membership to be checked on entry", 4, TRUE, 2, TRUE);
    insert into `discount` (name, code, message, minGroupSize, waiveHandlingFee, showId, partOfGroup) values ("Med Revue", "GOLDENREVUE","Wednesday night - handling fee waived, group ticket prices available for any booking size! Membership to be checked on entry", 1, TRUE, 2, TRUE);
    insert into `discount` (name, code, message, minGroupSize, waiveHandlingFee, showId, partOfGroup) values ("CSE Revue", "MAGICLAMPREVUE","Wednesday night - handling fee waived! Membership to be checked on entry", 4, TRUE, 2, TRUE);
    insert into `discount` (name, code, message, minGroupSize, waiveHandlingFee, showId, partOfGroup) values ("Law Revue", "VERYBADREVUE","Thursday night - handling fee waived! Membership to be checked on entry", 4, TRUE, 3, TRUE);
    */

    const discount = await repo.findOne({
      where: {
        code,
        showId
      }
    }) || null;
    res.json({ discount });
  });

  return router;
};
