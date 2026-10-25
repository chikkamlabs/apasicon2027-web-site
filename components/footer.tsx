import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* LEFT HALF: Branding (left) + Organising Secretariat (right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 items-start">
            {/* Conference Branding, Logos, and Date & Venue */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-xl shrink-0">
                  <Image
                    src="/asi_logo.png"
                    alt="ASI Logo"
                    width={192}
                    height={172}
                    referrerPolicy="no-referrer"
                    className="h-12 sm:h-14 w-auto object-contain"
                  />
                </div>
                <div className="bg-white p-2 rounded-xl shrink-0">
                  <Image
                    src="/apasicon_logo.png"
                    alt="APASICON Logo"
                    width={1254}
                    height={1254}
                    referrerPolicy="no-referrer"
                    className="h-12 sm:h-14 w-auto object-contain"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                  APASICON 2027 RAJAMAHENDRAVARAM
                </h2>
                <p className="text-xs sm:text-sm uppercase tracking-wider text-[#D4AF37] font-semibold mt-1.5">
                  50th Annual Conference ASI AP Chapter
                </p>
                <p className="text-sm text-zinc-400 mt-1 italic">
                  From Fundamentals to Future
                </p>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed">
                Hosted by GSL Medical College and general hospital in association with Government medical college and general hospital, Rajamahendravarm.
              </p>

              {/* Date & Venue */}
              <div className="pt-4 text-sm text-zinc-300 space-y-2 border-t border-zinc-800/80">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="font-semibold text-zinc-200">26 to 28 August 2027</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#187A83] shrink-0 mt-0.5" />
                  <span className="text-zinc-400">
                    GSL Educational Institutions, Rajamahendravaram, Andhra Pradesh
                  </span>
                </div>
              </div>
            </div>

            {/* Organising Secretariat */}
            <div className="bg-zinc-900/60 p-4 sm:p-5 rounded-2xl border border-zinc-800/80 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] border-b border-zinc-800 pb-3">
                Organising Secretariat
              </h3>
              {/* Mobile: photo + content side by side. md and up: photo on top, content below */}
              <div className="flex flex-row md:flex-col items-start gap-4">
                <div className="relative w-28 h-36 sm:w-32 sm:h-40 md:w-full md:h-64 lg:h-72 rounded-xl overflow-hidden border-2 border-[#D4AF37] shadow-md bg-zinc-900 shrink-0">
                  <Image
                    src="/drnayak.png"
                    alt="DR. SAMIR RANJAN NAYAK"
                    fill
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="space-y-1.5 min-w-0">
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
                    DR. SAMIR RANJAN NAYAK
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300">
                    Room No. 09, Dept of General Surgery
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-zinc-200">
                    GSL MEDICAL COLLEGE & HOSPITAL
                  </p>
                  <p className="text-[11px] sm:text-xs text-zinc-400">
                    NH 16 LAKSHMIPURAM, PINCODE 533296
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT HALF: 2 columns x 2 rows of link groups */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 sm:gap-y-12 content-start lg:pt-2">
            {/* Main Menu */}
            <div className="space-y-3">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
                Main Menu
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="#home" className="hover:text-amber-400 transition-colors">
                    HOME
                  </Link>
                </li>
                <li>
                  <Link href="#committee" className="hover:text-amber-400 transition-colors">
                    COMMITTEE
                  </Link>
                </li>
                <li>
                  <Link href="#finale-presentation" className="hover:text-amber-400 transition-colors">
                    FINALE PRESENTATION
                  </Link>
                </li>
                <li>
                  <Link href="#guidelines" className="hover:text-amber-400 transition-colors">
                    GUIDELINES
                  </Link>
                </li>
              </ul>
            </div>

            {/* Registration */}
            <div className="space-y-3">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
                Registration
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/registeration" className="hover:text-amber-400 transition-colors">
                    Registration form
                  </Link>
                </li>
                <li>
                  <Link href="/delegatedata" className="hover:text-amber-400 transition-colors">
                    Check / Modify Your data
                  </Link>
                </li>
                <li>
                  <Link href="#membership" className="hover:text-amber-400 transition-colors">
                    ASI Membership Registration
                  </Link>
                </li>
                <li>
                  <Link href="#tariffs" className="hover:text-amber-400 transition-colors">
                    Tariffs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Download Brochures */}
            <div className="space-y-3">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
                Download Brochures
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="#scientific-brochure" className="hover:text-amber-400 transition-colors">
                    Scientific brochure
                  </Link>
                </li>
                <li>
                  <Link href="#paper-schedule" className="hover:text-amber-400 transition-colors">
                    Paper presentation Schedule
                  </Link>
                </li>
                <li>
                  <Link href="#poster-schedule" className="hover:text-amber-400 transition-colors">
                    Poster presentation schedule
                  </Link>
                </li>
                <li>
                  <Link href="#submit-abstract" className="hover:text-amber-400 transition-colors">
                    Submit Abstract
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Association notice */}
        <div className="mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-zinc-500 gap-3 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} APASICON Rajamahendravaram. All rights reserved.
          </p>
          <p className="text-zinc-500">
            Association of Surgeons of India (ASI) &bull; Andhra Pradesh Chapter
          </p>
        </div>
      </div>
    </footer>
  );
}