import paypal from "@paypal/checkout-server-sdk";
import currency = require("currency.js");

export function paypalClient() {
  return new paypal.core.PayPalHttpClient(environment());
}

function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID || "PAYPAL-SANDBOX-CLIENT-ID";
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "PAYPAL-SANDBOX-CLIENT-SECRET";

  if (process.env.PAYPAL_ENV === "live") {
    return new paypal.core.LiveEnvironment(
      clientId, clientSecret
    );
  }
  return new paypal.core.SandboxEnvironment(
    clientId, clientSecret
  );
}

export function paypalFee(subtotal: currency): currency {
  // TODO update with actual transaction fee
  return subtotal.multiply(0.1);
}
