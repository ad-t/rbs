import currency = require("currency.js");
import { Client, CreateOrderRequest, Environment } from "square";

// TODO rewrite this if we ever expand
const defaultTZ = "Australia/Sydney";

export function squareClient(): Client {
  return new Client(environment());
}

function environment() {
  const paymentEnv = process.env.NODE_ENV === "production" ?
    Environment.Production : Environment.Sandbox;

  const settings = {
    environment: paymentEnv,
    accessToken: process.env.SQUARE_ACCESS_TOKEN || "SQUARE-ACCESS-TOKEN",
  };

  return settings;
}

export function squareFee(subtotal: currency): currency {
  // Common mistake when adding a surcharge is to multiply the *subtotal* by the
  // percent. You're actually supposed to multiply the *total* by the rate, but
  // since we don't have the total we need to work backwards.
  // 1 / 0.978 - 1 = 1.02249...
  //return subtotal.multiply(0.0224);
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
  itemDetails: Iterable<IItemDetail>,
  waiveSurcharge: boolean
): CreateOrderRequest {
  const fee: currency = squareFee(subtotal);

  const surcharge = {
    // name: "Square payment surcharge",
    // percentage: "2.24", // 1 / 0.978 rounded down to nearest 0.01%
    name: "Handling fee",
    amountMoney: {
      currency: "AUD",
      amount: 219
    },
    // NOTE: Docs say not required but API fails if not given
    calculationPhase: "SUBTOTAL_PHASE",
  };

  const items = [];
  for (const item of itemDetails) {
    items.push({
      name: `${title} ${year}: ${subtitle} - ${item.name}`,
      variationName: showTime.toLocaleDateString("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }),
      quantity: item.quantity.toString(),
      basePriceMoney: moneyObj(item.unitPrice)
    });
  }

  // https://developer.paypal.com/docs/checkout/reference/server-integration/set-up-transaction/#on-the-server
  const order = {
    locationId: process.env.SQUARE_LOC_ID,
    referenceId: orderID,
    lineItems: items,
    serviceCharges: waiveSurcharge ? undefined : [ surcharge ],
  };

  return { order };
}

function moneyObj(amount: currency): object {
  return { currency: "AUD", amount: amount.intValue };
}
