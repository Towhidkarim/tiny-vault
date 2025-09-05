import UploadDefault from '@/components/features/uploads/upload-ui';
import UploadDefaultForm from '@/components/features/uploads/upload-default';
import UploadSection from '@/components/features/uploads/upload-area';
import DividerWithText from '@/components/ui/divider-with-text';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { Search, User } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/layout/homepage/hero';
import RecentSection from '@/components/layout/homepage/recents';
import { SearchBar } from '@/components/SearchBar';
import { FeatureSection } from '@/components/layout/homepage/features';
import HowItWorks from '@/components/layout/homepage/how-it-works';
import HowItWorksSection from '@/components/layout/homepage/how-it-works';
import { PricingSection } from '@/components/layout/homepage/pricing';
import SubHeroSection from '@/components/layout/homepage/sub-hero';
import TestimonialsSection from '@/components/layout/homepage/testimonials';
import FAQSection from '@/components/layout/homepage/faq';
import FooterSection from '@/components/layout/homepage/footer';

export default function Home() {
  return (
    <main className='border-none outline-none'>
      <Navbar />
      <div className='relative mx-auto mt-3 w-full max-w-lg'>
        <SearchBar />
      </div>
      <HeroSection />
      <SubHeroSection />
      <RecentSection />
      <FeatureSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <br />
      <FooterSection />
      {/* <section className='mx-auto px-4 w-full max-w-7xl'>
        <h2 className='font-semibold text-2xl capitalize text-accent-foreground'>
          Create new valult
        </h2>
        <br />
        <div>
          <UploadDefaultForm />
        </div>
      </section> */}
    </main>
  );
}
