import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 items-start">
          {/* Column 1: Conference Branding, Logos, and Date & Venue */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-lg shrink-0">
                <Image
                  src="/asi_logo.png"
                  alt="ASI Logo"
                  width={192}
                  height={172}
                  referrerPolicy="no-referrer"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div className="bg-white p-1.5 rounded-lg shrink-0">
                <Image
                  src="/apasicon_logo.png"
                  alt="APASICON Logo"
                  width={1254}
                  height={1254}
                  referrerPolicy="no-referrer"
                  className="h-9 w-auto object-contain"
                />
              </div>
            </div>

            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                APASICON 2027 RAJAMAHENDRAVARAM
              </h2>
              <p className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mt-0.5">
                50th Annual Conference ASI AP Chapter
              </p>
              <p className="text-xs text-zinc-400 mt-0.5 italic">
                From Fundamentals to Future
              </p>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Hosted by GSL Medical College and general hospital in association with Government medical college and general hospital, Rajamahendravarm.
            </p>

            {/* Date & Venue */}
            <div className="pt-2 text-xs text-zinc-300 space-y-1.5 border-t border-zinc-800/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span className="font-semibold text-zinc-200">26 to 28 August 2027</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#187A83] shrink-0 mt-0.5" />
                <span className="text-zinc-400">GSL Educational Institutions, Rajamahendravaram, Andhra Pradesh</span>
              </div>
            </div>
          </div>

          {/* Column 2: ORGANISING SECRETARIAT - In Middle between Date & Venue AND Main Menu on both mobile & laptop */}
          <div className="space-y-3.5 bg-zinc-900/60 p-4 sm:p-4.5 rounded-2xl border border-zinc-800/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] border-b border-zinc-800 pb-2">
              Organising Secretariat
            </h3>
            <div className="flex flex-col items-start gap-3">
              <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden border-2 border-[#D4AF37] shadow-md bg-zinc-900 shrink-0">
                <Image
                  src="/drnayak.png"
                  alt="DR. SAMIR RANJAN NAYAK"
                  fill
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  DR. SAMIR RANJAN NAYAK
                </h4>
                <p className="text-xs text-zinc-300">
                  Room No. 09, Dept of General Surgery
                </p>
                <p className="text-xs font-semibold text-zinc-200">
                  GSL MEDICAL COLLEGE & HOSPITAL
                </p>
                <p className="text-[11px] text-zinc-400">
                  NH 16 LAKSHMIPURAM, PINCODE 533296
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Links / Main Menu */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
              Main Menu
            </h3>
            <ul className="space-y-2 text-xs">
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

          {/* Column 4: Registration Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
              Registration
            </h3>
            <ul className="space-y-2 text-xs">
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

          {/* Column 5: Download Brochures Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
              Download Brochures
            </h3>
            <ul className="space-y-2 text-xs">
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

        {/* Bottom Bar: Copyright & Association notice */}
        <div className="mt-10 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3">
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
