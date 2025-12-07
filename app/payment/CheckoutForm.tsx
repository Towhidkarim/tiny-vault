'use client';
import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import CreateStripePaymentIntentAction, {
  PremiumPurchaseAction,
} from './_actions';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, Info, Loader2 } from 'lucide-react';

export default function CheckoutForm({
  amountUSD,
  currency = 'usd',

  onPaymentSuccess,
}: {
  amountUSD: number;
  currency: 'usd';
  onPaymentSuccess?: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [enrollmentProcessing, setEnrollmentProcessing] = useState(false);

  const { data: intentResponse, isPending: intentPending } = useQuery({
    queryFn: () =>
      CreateStripePaymentIntentAction({
        amount: Math.round(amountUSD * 100),
        currency,
      }),
    queryKey: ['payment-intent'],
    staleTime: Infinity,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!elements || !stripe || !intentResponse?.clientSecret) {
      toast.error('Payment setup incomplete', {
        description: 'Please try again',
      });
      return;
    }

    setPaymentProcessing(true);

    try {
      const { error: submitError } = await elements.submit();

      if (submitError) {
        toast.error('Form Error', {
          description: submitError.message || 'Please check your information',
        });
        setPaymentProcessing(false);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret: intentResponse.clientSecret,
        redirect: 'if_required',
        confirmParams: {
          return_url: `${window.location.href}`,
        },
      });

      if (error) {
        toast.error('Payment Failed', {
          description: error.message || 'An error occurred during payment',
        });
        setPaymentProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        setPaymentSuccess(true);
        setEnrollmentProcessing(true);

        // after payment success
        const purchasePremium = await PremiumPurchaseAction();

        if (purchasePremium.success) {
          toast.success('Payment Successful!', {
            description: 'You have been enrolled in the course',
          });
          setTimeout(() => {
            onPaymentSuccess?.();
          }, 2000);
        } else {
          toast.warning('Payment received, almost done...', {
            description: purchasePremium.message,
          });
          onPaymentSuccess?.();
        }

        setEnrollmentProcessing(false);
      }
    } catch (error) {
      toast.error('An error occurred', {
        description: 'Please try again or contact support',
      });
      console.error('Payment error:', error);
    } finally {
      setPaymentProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className='space-y-4 w-full'>
        <Alert className='bg-green-50 border-green-200'>
          <CheckCircle2 className='w-4 h-4 text-green-600' />
          <AlertTitle className='text-green-800'>
            Payment Successful!
          </AlertTitle>
          <AlertDescription className='text-green-700'>
            {enrollmentProcessing ? (
              <div className='flex items-center gap-2'>
                <Loader2 className='w-4 h-4 animate-spin' />
                Premium purchase Successful!...
              </div>
            ) : (
              'Your payment have been successfully. Redirecting...'
            )}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6 w-full'>
      <Alert className='bg-blue-50 border-blue-200'>
        <AlertTitle className='text-blue-800'>Note!</AlertTitle>
        <AlertDescription className='text-blue-700'>
          <div className='flex items-center gap-2'>
            <Info className='w-4' />
            <p>
              This is for demonstration only, with stripe.You may test card
              number: <span className='font-semibold'>4242 4242 4242 4242</span>
            </p>
          </div>
        </AlertDescription>
      </Alert>
      <div className='bg-white shadow-sm hover:shadow-md p-6 border border-gray-200 rounded-lg transition-all'>
        {intentResponse?.clientSecret ? (
          <PaymentElement />
        ) : (
          <div className='flex justify-center items-center gap-2 py-8 text-gray-500'>
            <Loader2 className='w-4 h-4 animate-spin' />
            <span>Loading payment form...</span>
          </div>
        )}
      </div>

      <div className='space-y-2'>
        <div className='flex justify-between items-center bg-gray-50 p-4 rounded-lg'>
          <span className='font-medium text-gray-700'>Total Amount</span>
          <span className='font-bold text-gray-900 text-2xl'>
            ${amountUSD.toFixed(2)}
          </span>
        </div>
      </div>

      <Button
        type='submit'
        disabled={
          !stripe ||
          intentPending ||
          paymentProcessing ||
          !intentResponse?.clientSecret
        }
        className='bg-gradient-to-r from-blue-600 to-blue-700 disabled:opacity-60 shadow-md hover:shadow-lg rounded-lg w-full h-12 font-semibold text-white text-base transition-all disabled:cursor-not-allowed'
      >
        {intentPending ? (
          <>
            <Loader2 className='mr-2 w-4 h-4 animate-spin' />
            Preparing...
          </>
        ) : paymentProcessing ? (
          <>
            <Loader2 className='mr-2 w-4 h-4 animate-spin' />
            Processing Payment...
          </>
        ) : (
          `Pay $${amountUSD.toFixed(2)}`
        )}
      </Button>

      <p className='text-gray-500 text-xs text-center'>
        Your payment is secure and processed by Stripe. We never store your card
        details.
      </p>
    </form>
  );
}
