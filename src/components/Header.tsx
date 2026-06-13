'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import Logo from './logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleMenu = () => setIsMenuOpen((s) => !s);
  const toggleSubmenu = (submenu: string) =>
    setActiveSubmenu((s) => (s === submenu ? null : submenu));

  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mt-2 md:mt-4 mr-8 md:mr-16 ml-8 md:ml-16">
          {/* Logo */}
          <Logo size={36} className="text-black" />


          {/* Mobile Hamburger */}
          <button
            className="block lg:hidden p-2"
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
              <span
                className={`block w-5 h-0.5 bg-black transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
              />
              <span
                className={`block w-5 h-0.5 bg-black transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block w-5 h-0.5 bg-black transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
              />
            </div>
          </button>

          {/* Navigation */}
          <nav
            className={`${isMenuOpen ? 'block' : 'hidden'} lg:block absolute lg:relative top-full lg:top-auto left-0 lg:left-auto w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none z-50 lg:z-auto`}
            aria-label="Main navigation"
          >
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 justify-center items-start lg:items-center p-4 lg:p-0">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-center w-full lg:w-auto">
                <button
                  role="menuitem"
                  
                  className="text-base font-roboto font-normal text-black hover:text-gray-600 transition-colors py-2 lg:py-0"
                >
                  Features
                </button>

                <button
                  role="menuitem"
                  className="text-base font-roboto font-normal text-black hover:text-gray-600 transition-colors py-2 lg:py-0"
                >
                  Pricing
                </button>

                <button
                  role="menuitem"
                  className="text-base font-roboto font-normal text-black hover:text-gray-600 transition-colors py-2 lg:py-0"
                >
                  Blog
                </button>

                {/* Resources Submenu */}
                <div className="relative">
                  <button
                    role="menuitem"
                    aria-haspopup="true"
                    aria-expanded={activeSubmenu === 'resources'}
                    className="flex items-center gap-2 text-base font-roboto font-normal text-black hover:text-gray-600 transition-colors py-2 lg:py-0"
                    onClick={() => toggleSubmenu('resources')}
                  >
                    Resources
                    <ChevronDown/>
                  </button>

                  {activeSubmenu === 'resources' && (
                    <ul
                      role="menu"
                      className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50"
                    >
                      <li role="menuitem">
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Documentation
                        </button>
                      </li>
                      <li role="menuitem">
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          API Reference
                        </button>
                      </li>
                      <li role="menuitem">
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Support Center
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center w-full lg:w-auto mt-4 lg:mt-0">
                <SignedOut>
                  <Link href="/sign-in" passHref className="w-full lg:w-auto">
                    <Button variant="ghost" className="w-full lg:w-auto text-black hover:bg-gray-50">
                      Login
                    </Button>
                  </Link>

                  <Link href="/sign-up" passHref className="w-full lg:w-auto">
                    <Button variant="default" className="w-full lg:w-auto bg-black text-white">
                      Start
                    </Button>
                  </Link>
                </SignedOut>

                <SignedIn>
                  <Link href="/dashboard" passHref className="w-full lg:w-auto">
                    <Button variant="ghost" className="w-full lg:w-auto text-black hover:bg-gray-50">
                      Dashboard
                    </Button>
                  </Link>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: 'w-9 h-9',
                      },
                    }}
                  />
                </SignedIn>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
