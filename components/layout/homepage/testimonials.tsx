'use cleint';
import DefaultWrapper from '@/components/default-wrapper';
import SectionSubtitle from '@/components/SectionSubtitle';
import SectionTitle from '@/components/SectionTitle';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import testimonyOne from '@/public/assets/images/testimony_one.jpg';
import testimonyTwo from '@/public/assets/images/testimony_two.jpeg';
import defaultAvatarFemale from '@/public/assets/images/avatar_female.svg';
import React from 'react';

const testimonials = [
  {
    quote:
      'Very useful for sharing important files, texts, and more. I find myself using this website quite a lot and have yet to face any problems or bugs. With the link-sharing feature, I can easily share my notes with other people if needed. It has a very simple yet aesthetic and user friendly design. Tiny Vault has become my go to tool for file sharing',
    name: 'Raian Bin Kousar',
    designation: 'Student at VU',
    src: testimonyOne,
  },
  {
    quote:
      'I love how clean and simple the design is, it just works fine without any hassle.',
    name: 'Aisha Rahman',
    designation: 'Student at NYU',
    src: defaultAvatarFemale,
  },
  {
    quote:
      "Very useful when I want to take my codes from labs to elsewhere. Because of TinyVault, I don't need to carry around a pendrive all the time during class or lab times. The anonymous aspect makes it even better, zero signup, zero hassle",
    name: 'Sadab Kibria',
    designation: 'Student at RUET',
    src: testimonyTwo,
  },
];

export default function TestimonialsSection() {
  return (
    <DefaultWrapper className='my-20'>
      <SectionTitle>Testimonials</SectionTitle>
      <SectionSubtitle>Testimonies from our regular users</SectionSubtitle>
      <AnimatedTestimonials testimonials={testimonials} autoplay />
    </DefaultWrapper>
  );
}
