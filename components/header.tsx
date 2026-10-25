'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Outfit } from 'next/font/google';
import { Menu, X, ChevronDown } from 'lucide-react';

const outfit = Outfit({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileRegOpen, setMobileRegOpen] = useState(false);
  const [mobileBrochuresOpen, setMobileBrochuresOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md shadow-md border-b border-zinc-200/60'
          : 'bg-white border-b border-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Side: ASI Logo & Header Menu */}
          <div className="flex items-center gap-6 lg:gap-8">
            {/* Mobile Hamburger Button (3 lines) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-zinc-900" />
              ) : (
                <Menu className="w-6 h-6 text-zinc-900" />
              )}
            </button>

            {/* ASI Logo */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <Image
                src="/asi_logo.png"
                alt="ASI Logo"
                width={192}
                height={172}
                priority
                referrerPolicy="no-referrer"
                className="h-14 sm:h-14 w-auto object-contain"
              />
              <span
                className={`${outfit.className} text-sm sm:text-base lg:text-lg tracking-tight text-[#111111] whitespace-nowrap`}
              >
                ASI | APASICON 2027
              </span>
            </Link>

            {/* Desktop Navigation Menu (Positioned on the Left with ASI Logo) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] xl:text-sm font-semibold tracking-wide text-zinc-800">
              {/* A. HOME */}
              <Link
                href="#home"
                className="px-3 py-2 rounded-md hover:text-amber-600 hover:bg-zinc-50 transition-colors uppercase"
              >
                HOME
              </Link>

              {/* B. COMMITTEE */}
              <Link
                href="#committee"
                className="px-3 py-2 rounded-md hover:text-amber-600 hover:bg-zinc-50 transition-colors uppercase"
              >
                COMMITTEE
              </Link>

              {/* C. REGISTRATION (Open on hover) */}
              <div className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-2 rounded-md hover:text-amber-600 hover:bg-zinc-50 transition-colors uppercase focus:outline-none"
                >
                  <span>REGISTRATION</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-zinc-500 group-hover:text-amber-600" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute left-0 top-full pt-2 w-64 hidden group-hover:block z-50">
                  <div className="bg-white rounded-lg shadow-xl border border-zinc-200 py-2 overflow-hidden ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1 duration-150">
                    <Link
                      href="/registeration"
                      className="block px-4 py-2.5 text-xs xl:text-sm font-medium text-zinc-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    >
                      Registration form
                    </Link>
                    <Link
                      href="/delegatedata"
                      className="block px-4 py-2.5 text-xs xl:text-sm font-medium text-zinc-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    >
                      Check / Modify Your data
                    </Link>
                    <a
                      href="https://asiindia.org/member-application/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2.5 text-xs xl:text-sm font-medium text-zinc-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    >
                      ASI Membership Registration
                    </a>
                    <Link
                      href="#tariffs"
                      className="block px-4 py-2.5 text-xs xl:text-sm font-medium text-zinc-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    >
                      Tariffs
                    </Link>
                  </div>
                </div>
              </div>

              {/* D. FINALE PRESENTATION */}
              <Link
                href="#finale-presentation"
                className="px-3 py-2 rounded-md hover:text-amber-600 hover:bg-zinc-50 transition-colors uppercase whitespace-nowrap"
              >
                FINALE PRESENTATION
              </Link>

              {/* E. GUIDELINES */}
              <Link
                href="#guidelines"
                className="px-3 py-2 rounded-md hover:text-amber-600 hover:bg-zinc-50 transition-colors uppercase"
              >
                GUIDELINES
              </Link>

              {/* F. DOWNLOAD BROCHURES (Open on hover) */}
              <div className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-2 rounded-md hover:text-amber-600 hover:bg-zinc-50 transition-colors uppercase focus:outline-none whitespace-nowrap"
                >
                  <span>DOWNLOAD BROCHURES</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-zinc-500 group-hover:text-amber-600" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute left-0 top-full pt-2 w-64 hidden group-hover:block z-50">
                  <div className="bg-white rounded-lg shadow-xl border border-zinc-200 py-2 overflow-hidden ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1 duration-150">
                    <Link
                      href="#scientific-brochure"
                      className="block px-4 py-2.5 text-xs xl:text-sm font-medium text-zinc-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    >
                      Scientific brochure
                    </Link>
                    <Link
                      href="#paper-schedule"
                      className="block px-4 py-2.5 text-xs xl:text-sm font-medium text-zinc-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    >
                      Paper presentation Schedule
                    </Link>
                    <Link
                      href="#poster-schedule"
                      className="block px-4 py-2.5 text-xs xl:text-sm font-medium text-zinc-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    >
                      Poster presentation schedule
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* At Utmost Right: AP ASI CON Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/apasicon_logo.png"
                alt="AP ASI CON Logo"
                width={1254}
                height={1254}
                priority
                referrerPolicy="no-referrer"
                className="h-16 sm:h-14 w-auto object-contain"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-6 shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="flex flex-col space-y-1 text-sm font-semibold text-zinc-800">
            {/* A. HOME */}
            <Link
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-md hover:bg-zinc-100 hover:text-amber-600 uppercase"
            >
              HOME
            </Link>

            {/* B. COMMITTEE */}
            <Link
              href="#committee"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-md hover:bg-zinc-100 hover:text-amber-600 uppercase"
            >
              COMMITTEE
            </Link>

            {/* C. REGISTRATION Dropdown */}
            <div className="border-y border-zinc-100 py-1">
              <button
                type="button"
                onClick={() => setMobileRegOpen(!mobileRegOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-zinc-100 uppercase"
              >
                <span>REGISTRATION</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileRegOpen ? 'rotate-180 text-amber-600' : 'text-zinc-500'
                  }`}
                />
              </button>
              {mobileRegOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-zinc-50 rounded-md mt-1">
                  <Link
                    href="/registeration"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-medium text-zinc-700 hover:text-amber-600 rounded"
                  >
                    Registration form
                  </Link>
                  <Link
                    href="/delegatedata"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-medium text-zinc-700 hover:text-amber-600 rounded"
                  >
                    Check / Modify Your data
                  </Link>
                  <a
                    href="https://asiindia.org/member-application/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-medium text-zinc-700 hover:text-amber-600 rounded"
                  >
                    ASI Membership Registration
                  </a>
                  <Link
                    href="#tariffs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-medium text-zinc-700 hover:text-amber-600 rounded"
                  >
                    Tariffs
                  </Link>
                </div>
              )}
            </div>

            {/* D. FINALE PRESENTATION */}
            <Link
              href="#finale-presentation"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-md hover:bg-zinc-100 hover:text-amber-600 uppercase"
            >
              FINALE PRESENTATION
            </Link>

            {/* E. GUIDELINES */}
            <Link
              href="#guidelines"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-md hover:bg-zinc-100 hover:text-amber-600 uppercase"
            >
              GUIDELINES
            </Link>

            {/* F. DOWNLOAD BROCHURES Dropdown */}
            <div className="border-t border-zinc-100 pt-1">
              <button
                type="button"
                onClick={() => setMobileBrochuresOpen(!mobileBrochuresOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-zinc-100 uppercase"
              >
                <span>DOWNLOAD BROCHURES</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileBrochuresOpen ? 'rotate-180 text-amber-600' : 'text-zinc-500'
                  }`}
                />
              </button>
              {mobileBrochuresOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-zinc-50 rounded-md mt-1">
                  <Link
                    href="#scientific-brochure"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-medium text-zinc-700 hover:text-amber-600 rounded"
                  >
                    Scientific brochure
                  </Link>
                  <Link
                    href="#paper-schedule"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-medium text-zinc-700 hover:text-amber-600 rounded"
                  >
                    Paper presentation Schedule
                  </Link>
                  <Link
                    href="#poster-schedule"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-medium text-zinc-700 hover:text-amber-600 rounded"
                  >
                    Poster presentation schedule
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}