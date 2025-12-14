'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 1,
      name: 'Starter plan',
      description: 'Perfect for testing',
      monthly: '₹799',
       yearly: "₹7,999",
      features: [
        'Keyword triggered responses',
        'Basic AI message generation',
        'Up to fifty keywords',
      ],
    },
    {
      id: 2,
      name: 'Growth plan',
      description: 'For serious engagement',
      monthly: '₹1,999',
      yearly: "₹19,999",
      features: [
        'Everything in Starter',
        'Advanced AI personalization',
        'Comment automation included',
        'Up to two hundred keywords',
      ],
    },
    {
      id: 3,
      name: 'Pro plan',
      description: 'For high volume accounts',
      monthly: '₹3,999',
      yearly: "₹39,999",
      features: [
        'Everything in Growth',
        'Lead qualification automation',
        'Priority support access',
        'Unlimited keywords',
        'Custom integrations available',
      ],
    },
  ];

  return (
    <section className="w-full bg-white py-14 md:py-28">
      <div className="w-full max-w-[1440px] mx-auto px-10 md:px-20">
        <div className="flex flex-col gap-10 md:gap-20 items-center w-full max-w-[1280px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col gap-2 md:gap-4 items-center w-full px-7 md:px-14 max-w-[640px] mx-auto">
            <span className="text-base font-roboto font-semibold text-center text-black">Plans</span>

            <div className="text-center">
              <h2 className="text-2xl md:text-4xl font-roboto font-bold text-center text-black">
                Simple pricing
              </h2>
              <p className="text-base md:text-lg font-roboto text-center text-black">
                Pick the plan that fits your needs and scale as you grow
              </p>
            </div>
          </div>

          {/* Pricing Content */}
          <div className="flex flex-col gap-6 md:gap-12 items-center w-full">
            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-3 bg-white border border-black rounded-full p-1">
              <Button
                variant={billingPeriod === 'monthly' ? 'default' : 'ghost'}
                size="sm"
                className={`rounded-full px-6 py-2 ${billingPeriod === 'monthly' ? 'bg-white text-black' : 'bg-transparent text-black'}`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Monthly
              </Button>

              <Button
                variant={billingPeriod === 'yearly' ? 'default' : 'ghost'}
                size="sm"
                className={`rounded-full px-6 py-2 ${billingPeriod === 'yearly' ? 'bg-white text-black' : 'bg-transparent text-black'}`}
                onClick={() => setBillingPeriod('yearly')}
              >
                Yearly
              </Button>
            </div>

            {/* Pricing Cards */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full justify-center">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="flex flex-col gap-4 md:gap-8 w-full md:w-[404px] bg-white border border-black p-4 md:p-8 rounded-md"
                >
                  <div className="flex flex-col gap-3">
                    <div>
                      <h3 className="text-lg md:text-xl font-roboto font-bold text-black">{plan.name}</h3>
                      <p className="text-sm md:text-base text-black">{plan.description}</p>
                    </div>

                    <div className="w-full h-[1px] bg-black my-2" />

                    <div className="flex flex-col gap-3">
                        <h4 className="text-[28px] md:text-[56px] font-bold">
  {billingPeriod === "monthly" ? plan.monthly : plan.yearly}
</h4>

                    
                      <Button
                        variant="default"
                        className="w-full bg-black text-white px-6 py-3"
                        onClick={() => {
                          // wire this to your checkout flow
                          console.log(`Start checkout for plan ${plan.name} (${billingPeriod})`);
                        }}
                      >
                        Get started
                      </Button>
                    </div>
                  </div>

                  <div className="w-full h-[1px] bg-black my-2" />

                  <div className="flex flex-col gap-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Check/>
                        <span className="text-sm md:text-base text-black">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
