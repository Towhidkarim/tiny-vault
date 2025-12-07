import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import CheckoutPage from './CheckoutPage';
import { PREMIUM_PRICE, routes } from '@/lib/constants';
import { auth } from '@/lib/auth';
import Navbar from '@/components/navbar';

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const paymentType = Array.isArray(params.paymentType)
    ? params.paymentType[0]
    : params.paymentType;

  if (!paymentType) redirect('/');

  const authResponse = await auth.api.getSession({ headers: await headers() });
  if (!authResponse?.user) redirect(routes.signIn);

  return (
    <main className='bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen'>
      <Navbar />
      <div className='mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl'>
        <div className='mb-8'>
          <h1 className='font-bold text-gray-900 text-3xl'>
            Complete Your Purchase
          </h1>
          <p className='mt-2 text-gray-600'>
            Secure payment processing by Stripe
          </p>
        </div>

        <div className='gap-8 grid lg:grid-cols-3'>
          {/* Course Summary Card */}
          <div className='lg:col-span-2'>
            <CheckoutPage amountUSD={PREMIUM_PRICE} />
          </div>

          {/* Order Summary Sidebar */}
          <div className='space-y-6'>
            <div className='top-20 sticky space-y-6 bg-white shadow-sm p-6 border border-gray-200 rounded-xl'>
              <div>
                <h3 className='font-semibold text-gray-900 text-lg'>
                  Order Summary
                </h3>
              </div>

              <h4 className='font-semibold text-gray-900'>
                Premium Support Pack
              </h4>

              <p className='mt-1 text-gray-600 text-sm'>
                Thank you for showing your support
              </p>
            </div>

            <div className='space-y-2 pt-4 border-gray-200 border-t text-sm'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Premium Price</span>
                <span className='font-medium text-gray-900'>
                  ${PREMIUM_PRICE.toFixed(2)}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Duration</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Level</span>
              </div>
            </div>

            <div className='space-y-2 pt-4 border-gray-200 border-t'>
              <div className='flex justify-between'>
                <span className='font-semibold text-gray-900'>
                  Total Amount
                </span>
                <span className='font-bold text-blue-600 text-2xl'>
                  ${PREMIUM_PRICE.toFixed(2)}
                </span>
              </div>
            </div>

            <div className='bg-blue-50 p-3 rounded-lg text-blue-800 text-xs'>
              ✓ After successful payment, you`ll have instant access to our
              supporter badge
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
