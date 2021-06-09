import cors from "cors";
import express from "express";
import basicAuth from "express-basic-auth";
import * as OrderRoutes from "./routes/order";
import * as AdminRoutes from "./routes/admin";

export default function () {
  const router = express.Router();

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

  router.use(adminCors);
  router.use(adminLogin);

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
  router.get("/shows/:id/tickets", AdminRoutes.getShowOrders);
  router.get("/tickets/:id", AdminRoutes.getTicket);
  router.get("/order/:id", AdminRoutes.getOrder);
  router.post("/order/:id/override-payment", AdminRoutes.overridePayment);
  // FIXME: inconsistent use of paths
  router.post("/order/:id/send-payment-confirmation", OrderRoutes.sendPaymentConfirmation);
  router.post("/order/:id/send-entry-passes", AdminRoutes.emailEntryPasses);
  router.post("/tickets/:id/check-in", AdminRoutes.checkInTicket);
  router.post("/tickets/:id/check-in-reverse", AdminRoutes.reverseCheckInTicket);
  return router;
};
