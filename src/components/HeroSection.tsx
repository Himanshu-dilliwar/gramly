'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="w-full bg-white">
      <div className="w-full flex justify-start items-center">
        <div className="w-full max-w-[1440px] mx-auto px-10 md:px-20 py-10 md:py-20">
          <div className="w-full max-w-[1280px] mx-auto">
            <div
              className="relative w-full bg-cover bg-center bg-no-repeat rounded-lg px-8 md:px-16 py-12 md:py-24 overflow-hidden"
              style={{ backgroundImage: "url('/images/img_.png')" }}
            >
              {/* Background overlay for better text readability */}
              <div className="absolute inset-0 bg-black/30 rounded-lg" />

              <div className="relative flex flex-col gap-4 md:gap-8 justify-center items-start w-full">
                <div className="flex flex-col gap-3 md:gap-6 justify-start w-full md:w-1/2">
                  <h1 className="text-2xl md:text-5xl font-roboto font-bold leading-snug md:leading-tight text-left text-white">
                    Automate your Instagram conversations instantly
                  </h1>
                  <p className="text-base md:text-lg font-roboto font-normal leading-relaxed text-left text-white">
                    Turn direct messages into leads without lifting a finger. Gramly responds to keywords, engages with comments, and builds relationships while you focus on what matters.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-3 md:mt-6">
                  <Button
                    variant="default"
                    className="w-full md:w-auto bg-white text-black px-6 py-3"
                  >
                    Start
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full md:w-auto text-white border border-white/30 px-4 py-3"
                  >
                    Learn
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
