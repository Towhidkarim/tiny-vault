'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FooterSection from '../homepage/footer';
import { useSession } from '@/lib/auth-client';
import { useMutation } from '@tanstack/react-query';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import SectionTitle from '@/components/SectionTitle';
import CreateFeedbackAction from '@/lib/actions/CreateFeedbackAction';

export default function ContactForm() {
  const session = useSession();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setName(session.data?.user.name ?? '');
    setEmail(session.data?.user.email ?? '');
  }, [session.data]);

  const { mutate: submitFeedback, isPending } = useMutation({
    mutationFn: CreateFeedbackAction,
    onSuccess: ({ success }) => {
      setEmail(session.data?.user.email ?? '');
      setMessage('');
      if (success) setIsSubmitted(true);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message || !name) return;
    submitFeedback({ email, name, message });
  };

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='mx-auto px-4 py-16 container'>
        <br />
        <div className='mx-auto max-w-2xl'>
          {/* Header */}
          <div className='mb-12 text-center'>
            <Badge
              variant='secondary'
              className='bg-blue-50 mb-4 border-blue-200 text-blue-700'
            >
              Contact Us
            </Badge>
            <h1 className='mb-4 font-bold text-gray-900 text-4xl'>
              Leave us your feedback
            </h1>
            <p className='text-gray-600 text-lg'>
              Help us improve Tiny Vault by sharing your experience and through
              your feedbacks.
            </p>
          </div>
          <AlertDialog onOpenChange={setIsSubmitted} open={isSubmitted}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-center'>
                  Feedback Submitted Successfully!
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Your message has been sent succesfully! You will be contacted
                  soon if necessary
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction className='block w-full'>
                  Done
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {/* Review Form */}
          <Card className='shadow-sm border-gray-200'>
            <CardHeader>
              <CardTitle className='text-gray-900 text-xl'>
                Contact Form
              </CardTitle>
              <CardDescription>
                Fill in your contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Email Field */}
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 font-medium text-gray-700 text-sm'
                  >
                    Email Address
                  </label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='your.email@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='w-full'
                  />
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 font-medium text-gray-700 text-sm'
                  >
                    Your Name
                  </label>
                  <Input
                    id='name'
                    type='text'
                    placeholder='John Doe'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className='w-full'
                  />
                </div>

                {/* Review Message */}
                <div>
                  <label
                    htmlFor='message'
                    className='block mb-2 font-medium text-gray-700 text-sm'
                  >
                    Your Message
                  </label>
                  <Textarea
                    id='message'
                    placeholder='Your feedback here'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className='w-full h-32 resize-none'
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type='submit'
                  disabled={!email || !message || !name || isPending}
                  className='bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 disabled:opacity-50 px-6 py-3 rounded-lg w-full font-medium text-white transition-all duration-200 disabled:cursor-not-allowed'
                >
                  {isPending ? (
                    <div className='flex justify-center items-center gap-2'>
                      <div className='border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin'></div>
                      Submitting Review...
                    </div>
                  ) : (
                    'Submit Review'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className='mt-8 text-center'>
            <p className='text-gray-500 text-sm'>
              Your review will be moderated before being published. We respect
              your privacy and will only use your email for verification
              purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
