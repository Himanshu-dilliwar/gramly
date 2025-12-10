// src/components/TestimonialsSection.tsx
'use client';

import React from 'react';
import TestimonialCard from './TestimonialCard';

const testimonials = [
  { id: '1', name: 'Anita Kumar', role: 'Creator', text: "Gramly saved me hours each week.", rating: 5 },
  { id: '2', name: 'Rahul Verma', role: 'Agency', text: "Amazing automation and good support.", rating: 4.5 },
  { id: '3', name: 'Maya Singh', role: 'Marketer', text: "Solid for lead generation.", rating: 4 },
];

export default function TestimonialsSection() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">What customers say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => <TestimonialCard key={t.id} t={t} />)}
        </div>
      </div>
    </section>
  );
}
