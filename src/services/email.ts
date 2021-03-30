import * as fs from "fs";
import * as Handlebars from "handlebars";
import * as nodemailer from "nodemailer";

interface IStore {
   [key: string]: any;
}

interface IAddress {
  name: string;
  address: string;
}

const templateCache: IStore = {};

interface IDetails {
  from?: string | IAddress;
  to: string | IAddress;
  bcc?: string | IAddress;
  subject: string;
}

async function getTemplate(name: string) {
  if (!templateCache[name]) {
    const file = await fs.promises.readFile(`src/email_templates/${name}.hbs`, "utf-8");
    templateCache[name] = Handlebars.compile(file);
  }

  return templateCache[name];
}

export async function sendEmail(templateName: string, details: IDetails, data: object) {
  // Don't attempt to send email if not configured.
  if (!process.env.MAIL_HOST) {
    return;
  }

  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: +process.env.MAIL_PORT || 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWD
    }
  });

  const template = await getTemplate(templateName);
  console.log(data);
  const message = {
    from: details.from || process.env.MAIL_USER,
    to: details.to,
    bcc: details.bcc || undefined,
    subject: details.subject,
    html: template(data)
  };

  transport.sendMail(message);
}
