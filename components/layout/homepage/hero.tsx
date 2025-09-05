import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import heroImage from '@/public/assets/images/t_hero.svg';
import MainLogo from '@/components/main-logo';
import Link from 'next/link';
import { routes } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section className='flex items-center bg-gradient-to-br from-background to-muted/20 mx-auto py-5 max-w-7xl h-auto lg:h-[75vh] overflow-hidden'>
      <div className='mx-auto px-4 py-16 lg:py-24 container'>
        <div className='items-center gap-12 lg:gap-16 grid lg:grid-cols-2'>
          {/* Content Side */}
          <div className='flex flex-col space-y-8 lg:text-left text-center'>
            <div className='space-y-4'>
              <div className='inline-flex items-center bg-muted/50 px-3 py-1 border rounded-full font-medium text-muted-foreground text-sm'>
                <h1 className='font-extrabold text-primary'>
                  Tiny <span className='text-accent-foreground'>Vault</span>
                </h1>
              </div>
              <h1 className='font-bold text-4xl md:text-5xl lg:text-6xl text-balance tracking-tight'>
                Easy File and{' '}
                <span className='bg-clip-text bg-gradient-to-r from-primary to-chart-3 text-transparent'>
                  Snippet Sharing
                </span>
              </h1>
              <p className='max-w-2xl text-muted-foreground text-lg md:text-xl text-pretty'>
                Share files and code snippets instantly without compromising
                security. No registration required, end-to-end encrypted, no
                expiration.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className='flex sm:flex-row flex-col justify-center lg:justify-start gap-4'>
              <Button
                size='lg'
                className='group relative bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl px-8 py-6 overflow-hidden font-semibold text-primary-foreground text-lg transition-all duration-300'
                asChild
              >
                <Link href={routes.create} prefetch>
                  <span className='z-10 relative flex items-center gap-2'>
                    Start Sharing Now
                    <ArrowRight className='w-5 h-5 transition-transform group-hover:translate-x-1' />
                  </span>
                  <div className='absolute inset-0 bg-gradient-to-r from-chart-3 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                </Link>
              </Button>

              <Button
                variant='outline'
                size='lg'
                className='group bg-transparent hover:bg-muted/50 px-8 py-6 border-2 font-medium text-lg transition-all duration-300'
                asChild
              >
                <Link href={routes.howTo}>
                  <Play className='mr-2 w-5 h-5 group-hover:scale-110 transition-transform' />
                  Watch Demo
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className='flex sm:flex-row flex-col justify-center lg:justify-start items-center gap-6 text-muted-foreground text-sm'>
              <div className='flex items-center gap-2'>
                <div className='bg-green-500 rounded-full w-2 h-2 animate-pulse' />
                <span>End-to-end encrypted</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='bg-blue-500 rounded-full w-2 h-2 animate-pulse' />
                <span>No Expiration</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='bg-purple-500 rounded-full w-2 h-2 animate-pulse' />
                <span>No registration required</span>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className='relative'>
            <div className='relative w-full h-[350px] lg:h-[450px]'>
              {/* Background decoration */}
              <div className='absolute inset-0 bg-gradient-to-tr from-chart-1/10 to-primary/10 rounded-3xl rotate-3 transform' />
              <div className='absolute inset-0 bg-gradient-to-bl from-chart-2/10 to-chart-3/10 rounded-3xl -rotate-3 transform' />

              {/* Main image container */}
              <div className='relative bg-card shadow-2xl border rounded-2xl h-full overflow-hidden'>
                <Image
                  src={heroImage}
                  fill
                  className='p-8 object-contain'
                  alt='Zero file sharing illustration showing secure, fast file transfer'
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
