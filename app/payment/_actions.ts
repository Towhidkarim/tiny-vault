'use server';

import { db } from '@/db';
import { paymentTable } from '@/db/schema';
import { auth } from '@/lib/auth';
import { PREMIUM_PRICE } from '@/lib/constants';
import { headers } from 'next/headers';
import { Stripe } from 'stripe';

export default async function CreateStripePaymentIntentAction({
  amount,
  currency,
}: {
  amount: number;
  currency: 'usd';
}) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    console.log(process.env.STRIPE_SECRET_KEY);

    const intent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });
    return { success: true, clientSecret: intent.client_secret };
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Internal Server Error!' };
  }
}

export async function PremiumPurchaseAction() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return { success: false, message: 'User not logged in' };

  try {
    await db.insert(paymentTable).values({
      amount: PREMIUM_PRICE,
      userId: session.user.id,
      paymentType: 'premium',
    });
    return { success: true, message: 'Payment Successful' };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'An Internal server error occured' };
  }
}
