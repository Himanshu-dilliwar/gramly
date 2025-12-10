'use client';

import * as React from 'react';
import { UserPlus, Clock, Handshake } from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      id: 1,
      Icon: UserPlus,
      title: 'More leads daily',
      description:
        'Capture qualified prospects from every Instagram conversation automatically',
      linkText: 'Explore',
    },
    {
      id: 2,
      Icon: Clock,
      title: 'Time back',
      description: 'Stop managing messages manually and reclaim hours each week',
      linkText: 'Explore',
    },
    {
      id: 3,
      Icon: Handshake,
      title: 'Real relationships',
      description: 'Engage authentically at scale without sounding like a robot',
      linkText: 'Explore',
    },
  ];

  return (
    <section className="w-full bg-white py-14 md:py-28">
      <div className="w-full max-w-[1440px] mx-auto px-10 md:px-20">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 lg:gap-0">
          {/* Left: Large illustration area (replaced with a large icon) */}
          <div className="w-full lg:w-[46%] flex items-center justify-center">
            <div className="rounded-lg w-full max-w-lg flex items-center justify-center p-8 bg-gradient-to-tr from-slate-50 to-white">
              {/* large decorative icon (aria-hidden) */}
              <UserPlus size={160} strokeWidth={1.5} className="text-black/80" aria-hidden />
            </div>
          </div>

          {/* Right: Benefit list */}
          <div className="w-full lg:w-[46%] flex justify-center items-start">
            <div className="w-full max-w-[600px] py-1 md:py-2">
              <div className="flex flex-col gap-8 md:gap-10 w-full">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.Icon;
                  return (
                    <div
                      key={benefit.id}
                      className="flex flex-col gap-6 md:gap-10 justify-start items-stretch w-full"
                    >
                      <div className="flex items-start gap-4 md:gap-6 w-full">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                          <Icon size={40} strokeWidth={1.5} className="text-black" />
                        </div>

                        {/* Title */}
                        <h3 className="text-[20px] md:text-[24px] font-roboto font-bold leading-[24px] md:leading-[29px] text-left text-black">
                          {benefit.title}
                        </h3>
                      </div>

                      {/* Description + link */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 w-full">
                        <p className="text-[14px] md:text-[16px] font-roboto font-normal leading-[18px] md:leading-[24px] text-left text-black w-full">
                          {benefit.description}
                        </p>

                        {/* Show link for items except the first one like original layout */}
                        <div className={`mt-2 md:mt-0 ${index === 0 ? 'hidden md:block' : ''}`}>
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 text-sm md:text-base text-black hover:text-gray-600 transition-colors"
                          >
                            <span>{benefit.linkText}</span>
                            <span className="text-lg">→</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
