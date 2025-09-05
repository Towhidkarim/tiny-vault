import SectionSubtitle from '@/components/SectionSubtitle';
import SectionTitle from '@/components/SectionTitle';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/constants';
import { Check } from 'lucide-react';
import Link from 'next/link';

export const PricingSection = () => {
  const plans = [
    {
      name: 'Anonymous',
      price: '$Free',
      description: 'For random use',
      features: [
        'Free public vault creation',
        'Standard Security',
        'May reach creation limit',
        'No customer/recovery support',
        'No dashboard for tracking',
      ],
      cta: 'Create Vautls',
      href: routes.create,
      highlighted: false,
    },
    {
      name: 'Signed Up',
      price: '$Free',
      description: 'For regular usage',
      features: [
        'Advanced Security',
        'Unlimited vault creation',
        'Priority customer/recovery support',
        'Enhanced user dashboard',
        'Manage your created vaults',
        'And much more',
      ],
      href: routes.signUp,
      cta: 'Get Started Now!',
      highlighted: true,
    },
  ];

  return (
    <div className='bg-white dark:bg-black mt-14'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl'>
        <div className='mx-auto mb-12 max-w-3xl text-center'>
          <SectionTitle>Pricing? Absolutely Free!</SectionTitle>
          <SectionSubtitle>
            You get full acess to all our features for free
          </SectionSubtitle>
        </div>

        <div className='gap-10 grid grid-cols-1 md:grid-cols-2 mx-auto max-w-5xl'>
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border flex flex-col ${
                plan.highlighted
                  ? 'border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] scale-[1.02] shadow-xl'
                  : 'border-black/[0.08] dark:border-white/[0.08] hover:border-black/10 dark:hover:border-white/10'
              } p-6 transition-all duration-300`}
            >
              {plan.highlighted && (
                <>
                  <div className='-top-4 left-1/2 absolute -translate-x-1/2'>
                    <div className='relative'>
                      <div className='absolute inset-0 bg-primary/10 blur-[2px] rounded-full' />

                      <div className='relative dark:bg-white/[0.03] backdrop-blur-sm px-4 py-1.5 border border-primary/10 rounded-full'>
                        <div className='flex items-center gap-1.5'>
                          <span className='inline-block bg-primary/60 dark:bg-white/60 rounded-full w-1 h-1 animate-pulse' />
                          <span className='font-medium text-primary text-xs'>
                            Most Popular
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className='mb-6'>
                <h3 className='mb-2 font-medium text-black dark:text-white text-xl'>
                  {plan.name}
                </h3>
                <div className='flex items-baseline gap-2'>
                  <span className='font-bold text-black dark:text-white text-4xl'>
                    {plan.price}
                  </span>
                </div>
                <p className='mt-4 text-zinc-600 dark:text-zinc-400 text-sm'>
                  {plan.description}
                </p>
              </div>

              <div className='space-y-3 mb-6'>
                {plan.features.map((feature, i) => (
                  <div key={i} className='flex items-center gap-2.5'>
                    <Check className='w-4 h-4 text-black/30 dark:text-white/30' />
                    <span className='text-zinc-700 dark:text-zinc-300 text-sm'>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button className='block mt-auto w-full' asChild>
                <Link href={plan.href} className='w-full text-center'>
                  {plan.cta}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
