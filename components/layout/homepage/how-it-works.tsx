import SectionSubtitle from '@/components/SectionSubtitle';
import SectionTitle from '@/components/SectionTitle';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/constants';
import { Upload, Edit3, Settings, CheckCircle, LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: Upload,
      title: 'Upload Your Files',
      description:
        'Simply drag and drop your files into our secure platform. Support for many file types with instant preview capabilities.',
    },
    {
      number: '02',
      icon: Edit3,
      title: 'Edit & Configure',
      description:
        'Edit text-based files directly in our built-in editor or add new documents. Configure your vault with custom name, description, and visibility settings.',
    },
    {
      number: '03',
      icon: Settings,
      title: 'Secure Your Vault',
      description:
        'Set optional password protection and privacy controls. Choose between public, private, or password-protected access levels for maximum security.',
    },
    {
      number: '04',
      icon: CheckCircle,
      title: 'Share Instantly',
      description:
        "Click 'Create Vault' to initialize your secure vault collection. Copy the generated vault link and share it with your intended recipients.",
    },
  ];

  return (
    <section className='bg-gradient-to-b from-background to-muted/10 my-36'>
      <div className='mx-auto px-4 max-w-7xl container'>
        {/* Header */}
        <div className='mb-16 text-center'>
          <div className='inline-flex items-center gap-2 bg-primary/10 mb-6 px-4 py-2 rounded-full font-medium text-primary text-sm'>
            <CheckCircle className='w-4 h-4' />
            Simple Process
          </div>
          <SectionTitle>How It Works</SectionTitle>
          <SectionSubtitle>
            Create and share secure file vaults in four simple steps. No complex
            setup required.
          </SectionSubtitle>
        </div>

        {/* Steps Grid */}
        <div className='gap-8 grid md:grid-cols-2 lg:grid-cols-4'>
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className='group relative'>
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className='hidden lg:block top-16 left-full z-0 absolute bg-gradient-to-r from-primary/30 to-transparent w-full h-0.5' />
                )}

                {/* Step Card */}
                <div className='relative bg-card/50 group-hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5 backdrop-blur-sm p-8 border hover:border-primary/20 border-border/50 rounded-2xl h-full transition-all duration-300'>
                  {/* Step Number */}
                  <div className='inline-flex top-4 left-4 absolute justify-center items-center bg-gradient-to-br from-primary to-primary/80 shadow-lg mb-6 rounded-xl w-12 h-12 font-bold text-primary-foreground text-lg'>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className='flex justify-center items-center bg-primary/10 group-hover:bg-primary/15 mb-6 ml-auto rounded-2xl w-16 h-16 transition-colors'>
                    <IconComponent className='w-8 h-8 text-primary' />
                  </div>

                  {/* Content */}
                  <h3 className='mb-4 font-semibold text-foreground text-xl'>
                    {step.title}
                  </h3>
                  <p className='text-muted-foreground leading-relaxed'>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className='mt-16 text-center'>
          <div className='inline-flex items-center gap-2 text-muted-foreground'>
            <LinkIcon className='w-4 h-4' />
            Wanna see an elaborated demonstration? See{' '}
            <Button asChild>
              <Link href={routes.howTo}>How To</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
