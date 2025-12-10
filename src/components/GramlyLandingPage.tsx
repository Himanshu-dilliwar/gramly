'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';

// Dynamically import heavy sections (they'll hydrate only when needed)
const FeaturesSection = dynamic(() => import('@/components/FeaturesSection'), {
  ssr: false,
  loading: () => <SectionSkeleton title="Features" />,
});
const StepsSection = dynamic(() => import('@/components/StepSection'),{
  ssr: false,
  loading: () => <SectionSkeleton title="How it works" />,
});
const BenefitsSection = dynamic(() => import('@/components/BenfitsSection'), {
  ssr: false,
  loading: () => <SectionSkeleton title="Benefits" />,
});
const TestimonialsSection = dynamic(() => import('@/components/TestimonialSection'), {
  ssr: false,
  loading: () => <SectionSkeleton title="Testimonials" />,
});
const PricingSection = dynamic(() => import('@/components/PricingSection'), {
  ssr: false,
  loading: () => <SectionSkeleton title="Pricing" />,
});
const CTASection = dynamic(() => import('@/components/CTASection'), {
  ssr: false,
  loading: () => <SectionSkeleton title="Get started" />,
});
const NewsletterSection = dynamic(() => import('@/components/NewsletterSection'), {
  ssr: false,
  loading: () => <SectionSkeleton title="Newsletter" />,
});

/* Small skeleton used while dynamic sections load */
function SectionSkeleton({ title }: { title?: string }) {
  return (
    <section className="w-full max-w-6xl mx-auto p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded" />
      </div>
    </section>
  );
}

export default function GramlyLandingPage() {
  return (
    <div className="flex flex-col justify-start items-center w-full">
      <Header />

      <main
        role="main"
        aria-label="Gramly landing page main content"
        className="flex flex-col justify-start items-center w-full mt-2 md:mt-4"
      >
        {/* Hero is small/critical — load eagerly */}
        <HeroSection />

        {/* Lazy / non-critical sections */}
        <FeaturesSection />
        <StepsSection />
        <BenefitsSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}
