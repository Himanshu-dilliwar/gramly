'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { EditText } from '@/components/ui/edit-text';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      return;
    }

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Subscription failed');

      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <section className="w-full bg-white py-14 md:py-28">
      <div className="w-full max-w-[1440px] mx-auto px-10 md:px-20">
        <div className="flex justify-center items-center w-full max-w-[1280px] mx-auto">
          <div
            className="relative flex justify-center items-center w-full bg-cover bg-center bg-no-repeat rounded-lg px-7 md:px-14 py-8 md:py-14"
            style={{ backgroundImage: "url('/images/img_.png')" }}
          >
            {/* overlay */}
            <div className="absolute inset-0 bg-black/30 rounded-lg" />

            <div className="relative flex flex-col gap-4 md:gap-8 justify-start items-center w-full max-w-2xl text-center">
              <div className="px-6 md:px-12">
                <h2 className="text-2xl md:text-4xl font-roboto font-bold leading-tight text-white">
                  Stay in the loop
                </h2>
                <p className="mt-2 text-base md:text-lg font-roboto text-white/90">
                  Get tips, product updates, and automation strategies delivered to your inbox
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="w-full px-6 md:px-12">
                <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center">
                  <EditText
                    placeholder="Your email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="w-full md:flex-1 bg-transparent border border-white/40 placeholder-white/70 text-white px-4 py-3"
                    aria-label="Email address"
                  />

                  <Button
                    type="submit"
                    variant="default"
                    className="w-full md:w-auto bg-white text-black px-6 py-3"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>

                <p className="mt-3 text-xs text-white/80">
                  By subscribing you agree to our <a href="#terms" className="underline">Terms</a> and <a href="#privacy" className="underline">Privacy Policy</a>.
                </p>

                {status === 'success' && (
                  <div role="status" className="mt-3 text-sm text-green-300">
                    Thanks — check your inbox to confirm!
                  </div>
                )}
                {status === 'error' && (
                  <div role="alert" className="mt-3 text-sm text-rose-300">
                    Something went wrong — please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
