import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Upload,
  Edit3,
  Settings,
  Share2,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import Image from 'next/image';
import FooterSection from '@/components/layout/homepage/footer';
import Link from 'next/link';
import { routes } from '@/lib/constants';
import stepOne from '@/public/assets/images/step_one.jpeg';
import stepTwo from '@/public/assets/images/step_two.jpeg';
import stepThree from '@/public/assets/images/step_three.jpeg';
import stepFour from '@/public/assets/images/step_four.jpeg';

export default function HowToPage() {
  const steps = [
    {
      number: '01',
      title: 'Upload Your Files',
      description:
        'Start by dragging and dropping your files into our secure platform. We support various file types including documents, images, videos, and more.',
      icon: Upload,
      screenshot: stepOne,
      details: [
        'Drag files directly from your computer',
        'Support for 50+ file types',
        'Files are encrypted during upload',
        'Real-time upload progress tracking',
      ],
    },
    {
      number: '02',
      title: 'Edit & Configure',
      description:
        'Use our built-in editor to modify text-based files or add new documents. Configure your vault settings including name, description, and visibility options.',
      icon: Edit3,
      screenshot: stepTwo,
      details: [
        'Built-in text editor with syntax highlighting',
        'Add new files directly in the browser',
        'Set custom vault name and description',
        'Choose visibility settings (public/private)',
      ],
    },
    {
      number: '03',
      title: 'Secure Your Vault',
      description:
        'Set optional password protection and privacy controls. Choose between public, private, or password-protected access levels for maximum security.',
      icon: Settings,
      //   screenshot: '/placeholder.svg?height=400&width=600',
      screenshot: stepThree,
      details: [
        'Optional password protection',
        'Three access levels: public, private, protected',
        'Advanced privacy controls',
        'Encryption for sensitive data',
      ],
    },
    {
      number: '04',
      title: 'Share Instantly',
      description:
        "Click 'Create Vault' to initialize your secure collection. Copy the generated vault link from the popup and share it with your intended recipients.",
      icon: Share2,
      screenshot: stepFour,
      details: [
        'One-click vault creation',
        'Instant shareable link generation',
        'Copy link directly to clipboard',
        'Track vault access and downloads',
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main className='bg-white min-h-screen'>
        <section className='px-4 pt-24 pb-16'>
          <div className='mx-auto max-w-4xl text-center'>
            <Badge
              variant='secondary'
              className='bg-blue-50 mb-6 border-blue-200 text-blue-600'
            >
              <CheckCircle className='mr-2 w-4 h-4' />
              Complete Tutorial
            </Badge>
            <h1 className='mb-6 font-bold text-gray-900 text-4xl md:text-5xl text-balance'>
              How to Create & Share Secure Vaults
            </h1>
            <p className='mx-auto mb-8 max-w-2xl text-gray-600 text-xl text-pretty'>
              Follow this comprehensive guide to create, configure, and share
              your secure file vaults in just four simple steps.
            </p>
            <Button
              size='lg'
              className='bg-gradient-to-r from-primary to-purple-600 hover:to-purple-700 transition'
              asChild
            >
              <Link href={routes.create}>
                Start Creating Now
                <ArrowRight className='ml-2 w-5 h-5' />
              </Link>
            </Button>
          </div>
        </section>

        {/* Steps */}
        <section className='px-4 pb-20'>
          <div className='mx-auto max-w-6xl'>
            {steps.map((step, index) => (
              <div key={step.number} className='mb-20 last:mb-0'>
                <Card className='shadow-lg border-0 overflow-hidden'>
                  <CardContent className='p-0'>
                    <div
                      className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                    >
                      {/* Content Side */}
                      <div
                        className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                      >
                        <div className='flex items-center gap-4 mb-6'>
                          <div className='flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg rounded-xl w-12 h-12 font-bold text-white text-lg'>
                            {step.number}
                          </div>
                          <step.icon className='w-8 h-8 text-blue-600' />
                        </div>

                        <h2 className='mb-4 font-bold text-gray-900 text-3xl'>
                          {step.title}
                        </h2>

                        <p className='mb-6 text-gray-600 text-lg leading-relaxed'>
                          {step.description}
                        </p>

                        <div className='space-y-3'>
                          {step.details.map((detail, idx) => (
                            <div key={idx} className='flex items-center gap-3'>
                              <CheckCircle className='flex-shrink-0 w-5 h-5 text-green-500' />
                              <span className='text-gray-700'>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Screenshot Side */}
                      <div
                        className={`bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12 flex items-center justify-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
                      >
                        <div className='relative w-full max-w-lg'>
                          <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl rotate-3 transform'></div>
                          <div className='relative bg-white shadow-2xl border rounded-2xl overflow-hidden'>
                            <div className='flex items-center gap-2 bg-gray-100 px-4 h-8'>
                              <div className='bg-red-400 rounded-full w-3 h-3'></div>
                              <div className='bg-yellow-400 rounded-full w-3 h-3'></div>
                              <div className='bg-green-400 rounded-full w-3 h-3'></div>
                            </div>
                            <Image
                              src={step.screenshot}
                              alt={`Step ${step.number}: ${step.title}`}
                              width={600}
                              height={400}
                              className='w-full h-auto object-cover'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className='bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-20'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='mb-6 font-bold text-gray-900 text-3xl md:text-4xl'>
              Ready to Create Your First Vault?
            </h2>
            <p className='mx-auto mb-8 max-w-2xl text-gray-600 text-xl'>
              Start sharing files securely in minutes. No complex setup
              required.
            </p>
            <div className='flex sm:flex-row flex-col justify-center gap-4'>
              <Button
                size='lg'
                className='bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700'
                asChild
              >
                <Link href={routes.create}>
                  Create Vault Now
                  <ArrowRight className='ml-2 w-5 h-5' />
                </Link>
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='bg-transparent hover:bg-gray-50 border-gray-300'
                asChild
              >
                <Link href={'/search?query=test'}>View Examples</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
