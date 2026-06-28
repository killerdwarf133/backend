import type { ListingDocument } from "../models/Listing.js";
import type { OrderDocument } from "../models/Order.js";
import type { PaymentMethodDocument } from "../models/PaymentMethod.js";

export type ContactChannel = "whatsapp" | "telegram" | "facebook";

function money(value: number) {
  return value > 0 ? `$${value.toLocaleString("en-US")} USD` : "call-for-rates";
}

function describeOrder(order: OrderDocument) {
  if (order.orderType === "ticket" || order.orderType === "resale") {
    const kind = order.orderType === "resale" ? "Resale ticket" : "Ticket";
    const seats = order.seatInfo ? ` (${order.seatInfo})` : "";
    return `${kind} x${order.quantity} — ${order.matchLabel || `Match ${order.matchNumber}`}${seats}`;
  }
  return [order.packageTitle, order.variantTitle].filter(Boolean).join(" — ");
}

export function buildPaymentMessage(order: OrderDocument, methodName: string) {
  const heading =
    order.orderType === "package"
      ? "Hello, I want to complete a 2026 World Cup travel package reservation."
      : "Hello, I want to complete a 2026 World Cup ticket purchase.";
  return [
    heading,
    `Order: ${order._id.toString()}`,
    describeOrder(order),
    `Amount: ${money(order.totalAmountUsd)}`,
    `Payment method: ${methodName}`,
    "Please confirm the next payment step."
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildListingFeeMessage(listing: ListingDocument, methodName: string) {
  return [
    "Hello, I want to pay the listing fee to publish a resale ticket.",
    `Listing: ${listing._id.toString()}`,
    `Match: ${listing.matchLabel || `Match ${listing.matchNumber}`}`,
    `Seat: Sec ${listing.section}${listing.row ? ` · Row ${listing.row}` : ""}`,
    `Listing fee: ${money(listing.listingFeeUsd)}`,
    `Payment method: ${methodName}`,
    "Please confirm receipt so my listing can be reviewed."
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildContactRedirect(channel: string, target: string, message: string) {
  const encoded = encodeURIComponent(message);
  const handle = (target || "").replace(/^@/, "").trim();
  if (channel === "whatsapp") {
    return `https://wa.me/${handle.replace(/[^0-9]/g, "")}?text=${encoded}`;
  }
  if (channel === "telegram") {
    return handle ? `https://t.me/${handle}` : "";
  }
  if (channel === "facebook") {
    return handle ? `https://m.me/${handle}` : "";
  }
  return "";
}

export type PaymentInstruction = {
  method: string;
  methodName: string;
  network: string;
  address: string;
  details: { label: string; value: string }[];
  instructions: string;
  contactChannel: string;
  redirectUrl: string;
  message: string;
};

/**
 * Resolves a configured payment method (+ optional selected crypto network) and a
 * pre-built buyer message into the concrete payment fields stored on an order/listing.
 * Returns null if a crypto network was required but not found.
 */
export function resolvePayment(
  method: PaymentMethodDocument,
  networkLabel: string | undefined,
  message: string
): PaymentInstruction | null {
  const base: PaymentInstruction = {
    method: method.key,
    methodName: method.name,
    network: "",
    address: "",
    details: [],
    instructions: method.instructions ?? "",
    contactChannel: "",
    redirectUrl: "",
    message
  };

  if (method.fulfillment === "contact") {
    return {
      ...base,
      contactChannel: method.contactChannel ?? "",
      redirectUrl: buildContactRedirect(method.contactChannel ?? "", method.contactTarget ?? "", message)
    };
  }

  // details mode
  if (method.kind === "crypto" || (method.networks && method.networks.length > 0)) {
    const networks = method.networks ?? [];
    const network = networks.find((item) => item.label === networkLabel) ?? networks[0];
    if (!network) return null;
    return {
      ...base,
      network: [network.label, network.asset].filter(Boolean).join(" · "),
      address: network.address ?? ""
    };
  }

  return {
    ...base,
    details: (method.fields ?? []).map((field) => ({ label: field.label ?? "", value: field.value ?? "" }))
  };
}
