import FooterSection from '@/components/layout/homepage/footer';
import ReviewsPage from '@/components/layout/reviews/review-page';
import Navbar from '@/components/navbar';
import React from 'react';

export default function page() {
  return (
    <main>
      <Navbar />
      <ReviewsPage />
      <FooterSection />
    </main>
  );
}
