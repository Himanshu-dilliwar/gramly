// src/components/TestimonialCard.tsx
'use client';

import React from 'react';
import { StarRating } from './ui/StarRating';

type Testimonial = {
  id: string;
  name: string;
  role?: string;
  text: string;
  rating: number; // 0..5, can be fractional
};

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
      <div className="flex items-start gap-4">
        {/* You said no image — using initials avatar placeholder */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-800 font-semibold">
          {t.name.split(' ').map(s => s[0]).slice(0,2).join('')}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{t.name}</h3>
              {t.role && <p className="text-xs text-gray-500">{t.role}</p>}
            </div>

            <div>
              <StarRating rating={t.rating} />
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-700">{t.text}</p>
        </div>
      </div>
    </article>
  );
}
