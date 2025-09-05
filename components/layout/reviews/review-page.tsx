'use client';

import type React from 'react';

import { useState } from 'react';
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

export default function ReviewsPage() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message || rating === 0) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setEmail('');
      setMessage('');
      setRating(0);
    }, 3000);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return (
        <button
          key={index}
          type='button'
          className={`text-2xl transition-colors duration-200 ${
            starValue <= (hoveredRating || rating)
              ? 'text-yellow-400'
              : 'text-gray-300'
          } hover:text-yellow-400`}
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
        >
          <Star className='fill-current w-8 h-8' />
        </button>
      );
    });
  };

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='mx-auto px-4 py-16 container'>
        <div className='mx-auto max-w-2xl'>
          {/* Header */}
          <div className='mb-12 text-center'>
            <Badge
              variant='secondary'
              className='bg-blue-50 mb-4 border-blue-200 text-blue-700'
            >
              Share Your Experience
            </Badge>
            <h1 className='mb-4 font-bold text-gray-900 text-4xl'>
              Submit a Review
            </h1>
            <p className='text-gray-600 text-lg'>
              Help others discover Tiny Vault by sharing your experience with
              our secure file sharing platform.
            </p>
          </div>

          {/* Review Form */}
          <Card className='shadow-sm border-gray-200'>
            <CardHeader>
              <CardTitle className='text-gray-900 text-xl'>
                Your Review
              </CardTitle>
              <CardDescription>
                Tell us about your experience using Zero Share for file sharing
                and collaboration.
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

                {/* Star Rating */}
                <div>
                  <label className='block mb-3 font-medium text-gray-700 text-sm'>
                    Rating
                  </label>
                  <div className='flex items-center gap-1 mb-2'>
                    {renderStars()}
                  </div>
                  <p className='text-gray-500 text-sm'>
                    {rating === 0 && 'Please select a rating'}
                    {rating === 1 && 'Poor - Needs significant improvement'}
                    {rating === 2 && 'Fair - Below expectations'}
                    {rating === 3 && 'Good - Meets expectations'}
                    {rating === 4 && 'Very Good - Exceeds expectations'}
                    {rating === 5 && 'Excellent - Outstanding experience'}
                  </p>
                </div>

                {/* Review Message */}
                <div>
                  <label
                    htmlFor='message'
                    className='block mb-2 font-medium text-gray-700 text-sm'
                  >
                    Your Review
                  </label>
                  <Textarea
                    id='message'
                    placeholder="Share your thoughts about Zero Share's features, ease of use, security, or any other aspects of your experience..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className='w-full resize-none'
                  />
                  <p className='mt-1 text-gray-500 text-sm'>
                    {message.length}/500 characters
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type='submit'
                  disabled={!email || !message || rating === 0 || isSubmitting}
                  className='bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 disabled:opacity-50 px-6 py-3 rounded-lg w-full font-medium text-white transition-all duration-200 disabled:cursor-not-allowed'
                >
                  {isSubmitting ? (
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
