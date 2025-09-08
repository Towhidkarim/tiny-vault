'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import tempImage from '@/public/assets/images/private_files.svg';

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 200);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActive(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length
      );
      setIsTransitioning(false);
    }, 200);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 4000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const getRandomRotation = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div
      className={cn(
        'mx-auto px-4 md:px-8 lg:px-12 py-20 max-w-sm md:max-w-4xl',
        className
      )}
    >
      <div className='relative gap-20 grid grid-cols-1 md:grid-cols-2'>
        <div>
          <div className='relative w-full h-80'>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={cn(
                  'absolute inset-0 origin-bottom transition-all duration-500 ease-in-out',
                  isActive(index)
                    ? 'opacity-100 scale-100 z-50 rotate-0'
                    : 'opacity-70 scale-95 z-10',
                  !isActive(index) && index < active && '-rotate-2',
                  !isActive(index) && index > active && 'rotate-2'
                )}
                style={{
                  transform: isActive(index)
                    ? 'translateY(0) scale(1) rotateY(0deg)'
                    : `translateY(20px) scale(0.95) rotateY(${getRandomRotation()}deg)`,
                  zIndex: isActive(index)
                    ? 999
                    : testimonials.length + 2 - index,
                }}
              >
                <Image
                  src={testimonial.src}
                  alt={testimonial.name}
                  width={500}
                  height={500}
                  draggable={false}
                  className='bg-background shadow-2xl rounded-3xl w-full h-full object-center object-cover'
                />
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col justify-between py-4'>
          <div
            key={active}
            className={cn(
              'transition-all duration-300 ease-in-out',
              isTransitioning
                ? 'opacity-0 translate-y-5'
                : 'opacity-100 translate-y-0'
            )}
          >
            <h3 className='font-bold text-foreground text-2xl'>
              {testimonials[active].name}
            </h3>
            <p className='text-muted-foreground text-sm'>
              {testimonials[active].designation}
            </p>
            <div className='mt-8 text-muted-foreground text-lg'>
              {testimonials[active].quote.split(' ').map((word, index) => (
                <span
                  key={`${active}-${index}`}
                  className='inline-block animate-fade-in-word'
                  style={{
                    animationDelay: `${index * 0.02}s`,
                    animationFillMode: 'both',
                  }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </div>
          </div>

          <div className='flex gap-4 pt-12 md:pt-0'>
            <button
              onClick={handlePrev}
              disabled={isTransitioning}
              className='group/button flex justify-center items-center bg-secondary hover:bg-secondary/80 disabled:opacity-50 rounded-full w-7 h-7 transition-all duration-300'
            >
              <ArrowLeft className='w-5 h-5 text-foreground group-hover/button:rotate-12 transition-transform duration-300' />
            </button>
            <button
              onClick={handleNext}
              disabled={isTransitioning}
              className='group/button flex justify-center items-center bg-secondary hover:bg-secondary/80 disabled:opacity-50 rounded-full w-7 h-7 transition-all duration-300'
            >
              <ArrowRight className='w-5 h-5 text-foreground group-hover/button:-rotate-12 transition-transform duration-300' />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-word {
          from {
            opacity: 0;
            filter: blur(10px);
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0);
          }
        }

        .animate-fade-in-word {
          animation: fade-in-word 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};
