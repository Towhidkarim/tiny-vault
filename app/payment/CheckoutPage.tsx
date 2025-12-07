'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { routes } from '@/lib/constants';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
export default function CheckoutPage({ amountUSD }: { amountUSD: number }) {
  const router = useRouter();

  const handlePaymentSuccess = () => {
    // Redirect to dashboard or courses page after successful payment
    router.push(routes.dashboard);
  };

  return (
    <div className='space-y-4'>
      <Elements
        stripe={stripePromise}
        options={{
          amount: Math.round(amountUSD * 100),
          currency: 'usd',
          mode: 'payment',
        }}
      >
        <CheckoutForm
          amountUSD={amountUSD}
          currency='usd'
          onPaymentSuccess={handlePaymentSuccess}
        />
      </Elements>
    </div>
  );
}
