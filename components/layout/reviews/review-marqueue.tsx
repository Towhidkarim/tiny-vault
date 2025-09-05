'use client';
import { Card, CardContent } from '@/components/ui/card';
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from '@/components/ui/shadcn-io/marquee';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Alice Johnson',
    rating: 5,
    review:
      'Tiny Vault is a lifesaver! I shared my project files in seconds without signing up. Super clean and easy.',
  },
  {
    name: 'Ravi Kumar',
    rating: 4,
    review:
      'So handy to share code quickly. Love the private vault feature. Only would be better if file size limits were bigger.',
  },
  {
    name: 'Sophia Martinez',
    rating: 5,
    review:
      'Love the password protection. It makes me feel safe and the UI is so easy to use!',
  },
  {
    name: 'David Lee',
    rating: 3,
    review:
      'Good tool in general, but I had some glitches with big uploads. Still, the sharable link feature is amazing.',
  },
  {
    name: 'Hiroshi Tanaka',
    rating: 5,
    review:
      'Easy to use, quick, and efficient. Downloading all as a ZIP is amazingly convenient. Strongly recommend.',
  },
  {
    name: 'Emily Carter',
    rating: 4,
    review:
      'Love the simplicity of design. Perfect for rapid team collaboration. Would love dark mode in the future.',
  },
];

export const ReviewMarquee = () => (
  <div className='flex justify-center items-center mx-auto my-5 max-w-7xl size-full'>
    <Marquee>
      <MarqueeFade side='left' />
      <MarqueeFade side='right' />
      <MarqueeContent className='flex flex-row gap-5'>
        {reviews.map((item, index) => (
          <MarqueeItem
            className='flex flex-row justify-center items-center w-[300px] min-h-[250px]'
            key={index}
          >
            <Card
              key={index}
              className='shadow-md hover:shadow-lg rounded-2xl w-[280px] transition'
            >
              <CardContent className='flex flex-col gap-2 p-4'>
                <div className='flex justify-between items-center'>
                  <h3 className='font-semibold text-lg'>{item.name}</h3>
                  <div className='flex'>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < item.rating
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className='text-gray-600 text-sm'>{item.review}</p>
              </CardContent>
            </Card>
          </MarqueeItem>
        ))}
      </MarqueeContent>
    </Marquee>
  </div>
);
