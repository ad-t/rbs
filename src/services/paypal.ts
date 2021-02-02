import paypal from "@paypal/checkout-server-sdk";
import currency = require("currency.js");

// TODO rewrite this if we ever expand
const defaultTZ = "Australia/Sydney";

export function paypalClient() {
  return new paypal.core.PayPalHttpClient(environment());
}

function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID || "PAYPAL-SANDBOX-CLIENT-ID";
  const clientSecret =
      process.env.PAYPAL_CLIENT_SECRET || "PAYPAL-SANDBOX-CLIENT-SECRET";

  if (process.env.NODE_ENV === "production") {
    return new paypal.core.LiveEnvironment(clientId, clientSecret);
  }
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

export function paypalFee(subtotal: currency): currency {
  // PayPal fees are rounded using arithmetic rounding (round half up).
  // 1 / 0.974 - 1 = 1.02669...
  return subtotal.multiply(0.0266).add(0.30);
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
): object {
  const fee: currency = paypalFee(subtotal);
  const totalPrice: currency = subtotal.add(fee);

  const items: object[] = [];
  for (const item of itemDetails) {
    items.push({
      name: `${title} ${year}: ${subtitle} - ${item.name}`,
      description: showTime.toLocaleDateString("en-AU",
      {
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
      brand_name: "Revue Booking System",
      shipping_preferences: "NO_SHIPPING",
      user_action: "PAY_NOW"
    },
    purchase_units: [{
      invoice_id: orderID,
      description: `Tickets for ${title} ${year}`,
      soft_descriptor: "RBS Revue Tickets", // credit card statement
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

function moneyObj(amount: currency): object {
  return {currency_code: "AUD", value: amount.format()};
}
