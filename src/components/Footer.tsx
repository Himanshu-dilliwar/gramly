'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import { EditText } from "@/components/ui/edit-text";
import SocialMedia from './SocialMedia';
import Logo from './logo';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      // Replace with your API endpoint (e.g. /api/newsletter or your provider)
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Subscription failed');
      setMessage('Thanks — check your inbox to confirm!');
      setEmail('');
    } catch (err) {
      setMessage('Something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer className="w-full mt-10 md:mt-20 bg-transparent" role="contentinfo">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 justify-between items-start">
          {/* Logo & Brand */}
          <Logo/>

          {/* Links */}
          <nav aria-label="Footer navigation" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full lg:w-2/3">
            <div>
              <h3 className="text-base font-semibold mb-3">Product</h3>
              <ul className="flex flex-col gap-2 text-sm">
                <li><a className="hover:text-gray-600 transition-colors" href="#features">Features</a></li>
                <li><a className="hover:text-gray-600 transition-colors" href="#pricing">Pricing</a></li>
                <li><a className="hover:text-gray-600 transition-colors" href="#blog">Blog</a></li>
                <li><a className="hover:text-gray-600 transition-colors" href="#changelog">Changelog</a></li>
                <li><a className="hover:text-gray-600 transition-colors" href="#company">Company</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-3">About</h3>
              <ul className="flex flex-col gap-2 text-sm">
                <li><a className="hover:text-gray-600 transition-colors" href="#contact">Contact</a></li>
                <li><a className="hover:text-gray-600 transition-colors" href="#careers">Careers</a></li>
                <li><a className="hover:text-gray-600 transition-colors" href="#press">Press</a></li>
                <li><a className="hover:text-gray-600 transition-colors" href="#support">Support</a></li>
                <li><a className="hover:text-gray-600 transition-colors" href="#help">Help center</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-3">Status</h3>
              <ul className="flex flex-col gap-2 text-sm">
                <li><a className="hover:text-gray-600 transition-colors" href="#documentation">Documentation</a></li>
                <li><a className="hover:text-gray-600 transition-colors" href="#api-docs">API docs</a></li>
                <li><a className="hover:text-gray-600 transition-colors" href="#community">Community</a></li>
                <li><a className="hover:text-gray-600 transition-colors" href="#slack">Slack</a></li>
                <li><a className="hover:text-gray-600 transition-colors" href="#updates">Updates</a></li>
              </ul>
            </div>
          </nav>

          {/* Newsletter */}
          <div className="w-full lg:w-[28%]">
            <h3 className="text-base font-semibold mb-2">News</h3>
            <p className="text-sm mb-4">
              Get the latest updates on new features, improvements, and product releases delivered straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <div className="flex gap-3">
                {/* Keep your EditText component if it handles styling/validation. Fallback to native input if needed */}
                <EditText
                  placeholder="your@email.com"
                  className="flex-1"
                  value={email}
                  // If EditText doesn't accept controlled value props, replace with an <input /> element
                  // ensure EditText forwards onChange to handle setEmail
                  onChange={(e: any) => setEmail(e.target?.value ?? '')}
                />

                <Button
                  type="submit"
                  disabled={submitting}
                  className="px-6"
                  text={submitting ? 'Subscribing...' : 'Subscribe'}
                />
              </div>

              <p className="text-xs text-gray-500">
                By subscribing, you agree to our <Link href="#privacy" className="underline">Privacy Policy</Link> and consent to receive communications.
              </p>

              {message && <div role="status" className="text-sm text-gray-700">{message}</div>}
            </form>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-black/10 mt-12 md:mt-20" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 mt-6 md:mt-8">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <span>© {new Date().getFullYear()} Gramly. All rights reserved.</span>
            <Link href="#privacy" className="underline">Privacy Policy</Link>
            <Link href="#terms" className="underline">Terms of Service</Link>
            <Link href="#cookies" className="underline">Cookie Settings</Link>
          </div>

          {/* Social icons */}
          <SocialMedia/>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
