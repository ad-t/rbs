import PDFDocument from "pdfkit";
import path from 'path';
import fs from 'fs';
import QRCode from 'qrcode';
import dayjs from 'dayjs';
import { Order } from "../entity/order";
import { Ticket } from "../entity/ticket";

const timezone = 'Australia/Sydney';

export default async function generatePdf(order: Order, ticket: Ticket): Promise<typeof PDFDocument> {
  const seat = ticket.seat.seatNum;
  const doc = new PDFDocument({ size: 'A6', margin: 20 });
  // TODO: doc.pipe(res);
  //doc.pipe(fs.createWriteStream(`${seat}.pdf`));

  doc.image(path.join(__dirname, 'logo-black.png'), 50, 20, {
    fit: [200, 125]
  }).moveDown(1);

  doc.font('Helvetica-Bold').text(`ENTRY PASS`, {
    align: 'center'
  }).moveDown(0.4);

  const date = dayjs(order.show.time).tz(timezone).format("ddd DD MMM YYYY h:mm A").toUpperCase();
  doc.font('Helvetica').text(date, {
    align: 'center'
  }).moveDown(1);

  doc.font('Helvetica').text(`${ticket.name}: ${ticket.ticketType.description}`, {
    align: 'center'
  }).moveDown(0.5);

  doc.font('Helvetica-Bold').text(`Seat: ${seat}`, {
    align: 'center'
  }).moveDown(1);

  doc.font('Helvetica').text(`Voucher code: N/A`, {
    align: 'center'
  }).moveDown(1);

  doc.image(await QRCode.toDataURL(ticket.id, {scale:18}), 90, 220, {
    fit: [200, 125]
  }).moveDown(6);

  doc.font('Helvetica').text(ticket.id.toUpperCase().slice(0, 8), {
    align: 'center'
  });

  // finalize the PDF and end the stream
  doc.end();
  return doc;
}
