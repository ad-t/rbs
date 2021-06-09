/* eslint-disable @typescript-eslint/naming-convention */
import paypal from "@paypal/checkout-server-sdk";
import currency = require("currency.js");

// TODO rewrite this if we ever expand
const defaultTZ = "Australia/Sydney";

export function paypalClient(): any {
  // eslint-disable-next-line
  return new paypal.core.PayPalHttpClient(environment());
}

function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID || "PAYPAL-SANDBOX-CLIENT-ID";
  const clientSecret =
      process.env.PAYPAL_CLIENT_SECRET || "PAYPAL-SANDBOX-CLIENT-SECRET";

  if (process.env.NODE_ENV === "production") {
    // eslint-disable-next-line
    return new paypal.core.LiveEnvironment(clientId, clientSecret);
  }
  // eslint-disable-next-line
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

export function paypalFee(subtotal: currency): currency {
  // PayPal fees are rounded using arithmetic rounding (round half up).
  // 1 / 0.974 - 1 = 1.02669...
  //return subtotal.multiply(0.0266).add(0.30);
  return currency(2.19);
}

export interface IItemDetail {
  name: string;
  unitPrice: currency;
  quantity: number;
}

export function orderCreateRequestBody(
  orderID: string,
  title: string,
  year: string,
  subtitle: string,
  showTime: Date,
  subtotal: currency,
  itemDetails: Iterable<IItemDetail>
) {
  const fee: currency = paypalFee(subtotal);
  const totalPrice: currency = subtotal.add(fee);

  const items = [];
  for (const item of itemDetails) {
    items.push({
      name: `${title} ${year}: ${subtitle} - ${item.name}`,
      description: showTime.toLocaleDateString("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }),
      category: "DIGITAL_GOODS",
      quantity: item.quantity,
      unit_amount: moneyObj(item.unitPrice)
    });
  }

  // https://developer.paypal.com/docs/checkout/reference/server-integration/set-up-transaction/#on-the-server
  return {
    intent: "CAPTURE",
    application_context: {
      brand_name: "UNSW Med Revue",
      shipping_preferences: "NO_SHIPPING",
      user_action: "PAY_NOW"
    },
    purchase_units: [{
      invoice_id: orderID,
      description: `${title} ${year} Tickets`,
      soft_descriptor: "Tickets Revue", // credit card statement
      amount: {
        currency_code: "AUD",
        value: totalPrice.format(),
        breakdown: {
          item_total: moneyObj(subtotal),
          handling: moneyObj(fee)
        }
      },
      items
    }]
  };
}

function moneyObj(amount: currency) {
  return {currency_code: "AUD", value: amount.format()};
}
