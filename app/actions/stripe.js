"use server";

import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

const CURRENCY = "USD";

export async function createCheckoutSession(data) {
  const ui_mode = "hosted";
  const origin = headers().get("origin");

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "auto",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: "How To be happy",
          },
          unit_amount: 2000,
        },
      },
    ],

    ...(ui_mode === "hosted" && {
      success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=123456`,
      cancel_url: `${origin}/courses`,
    }),
    ui_mode,
  });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(data) {
  const paymentIntent = await stripe.paymentIntent.create({
    amount: 2000,
    automatic_payment_methods: { enabled: true },
    currency: CURRENCY,
  });
  return { client_secret: paymentIntent.client_secret };
}
