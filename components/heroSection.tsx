'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { Calendar, MapPin, Building2, Award, ArrowRight, FileText } from 'lucide-react';
import BgAura from './bgaura';
import CountdownSection from './countdownSection';

const ROTATING_WORDS = ['LEARN', 'WATCH', 'PRACTISE', 'INNOVATE'];

/**
 * Timeline (smooth ease-out everywhere):
 *  0.10s  Headline "APASICON 2027 RAJAMAHENDRAVARAM." + both images slide in from the RIGHT
 *  0.80s  Tagline   "FROM FUNDAMENTALS TO FUTURE •" + rotating word
 *  1.50s  Badge -> Dates -> Venue -> Host (staggered, 0.18s apart)
 *  2.00s  CTA buttons slide in from the LEFT
 */
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const headlineV: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(12px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.0, ease, delay: 0.1 },
  },
};

const taglineV: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease, delay: 0.8 },
  },
};

const detailsContainerV: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 1.5, staggerChildren: 0.18 } },
};

const detailItemV: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

// CTA buttons: from the LEFT
const ctaV: Variants = {
  hidden: { opacity: 0, x: -70 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease, delay: 2.0 } },
};

// Images: from the RIGHT (same moment as the headline)
const imageV: Variants = {
  hidden: { opacity: 0, x: 90 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 1.0, ease, delay: 0.1 + i * 0.2 },
  }),
};

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    // ONE section, ONE background: hero content + countdown both sit on the same BgAura.
    // -mt-20 / pt-* slide it under the transparent header (h-20).
    <section className="relative overflow-hidden -mt-20 pt-28 sm:pt-36 lg:pt-28">
      <BgAura />

      {/* Light Godavari blue: a soft river-water tint on the left, kept
          lighter than the Join / Committee sections so the headline stays crisp.
          Faded at the top and bottom so it never leaves a hard edge. */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[80%] sm:w-[60%]"
        style={{
          background:
            'radial-gradient(ellipse at 35% 60%, rgba(64,160,190,0.24) 0%, rgba(96,184,204,0.17) 35%, rgba(140,208,222,0.05) 62%, transparent 82%)',
          filter: 'blur(16px)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, #000 20%, #000 70%, transparent 100%)',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, #000 20%, #000 70%, transparent 100%)',
        }}
      />
      {/* Soft white glow, top right */}
<div
  aria-hidden="true"
  className="pointer-events-none absolute top-0 right-0 z-[1] w-[70%] sm:w-[50%] h-[60%]"
  style={{
    background:
      'radial-gradient(ellipse at 85% 10%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.4) 35%, rgba(255,255,255,0.1) 60%, transparent 80%)',
    filter: 'blur(14px)',
  }}
/>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-6 text-left">
            <motion.div
              variants={detailItemV}
              className="inline-flex items-center gap-1.5 sm:gap-2 self-start px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-amber-50/90 border border-amber-200/90 text-amber-900 text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide uppercase shadow-xs"
            >
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0" />
              <span>50 th annual conference ASI AP CHAPTER</span>
            </motion.div>

            {/* Headline first, then tagline */}
            <div className="space-y-1.5 sm:space-y-2">
              <motion.h1
                variants={headlineV}
                initial="hidden"
                animate="show"
                className="text-2xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-5xl font-black tracking-tight text-zinc-950 leading-[1.2] sm:leading-[1.15]"
              >
                APASICON 2027 RAJAMAHENDRAVARAM.
              </motion.h1>

              <motion.div
                variants={taglineV}
                initial="hidden"
                animate="show"
                className="flex flex-wrap items-center gap-2 pt-0.5"
              >
                <span className="text-sm sm:text-lg md:text-xl font-bold tracking-wider text-[#187A83] uppercase">
                  FROM FUNDAMENTALS TO FUTURE
                </span>
                <span className="text-zinc-400 font-bold hidden sm:inline">&bull;</span>
                <div className="inline-flex items-center relative min-w-[100px] sm:min-w-[160px] h-7 sm:h-9">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={ROTATING_WORDS[wordIndex]}
                      initial={{ opacity: 0, y: 8, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -8, filter: 'blur(8px)' }}
                      transition={{ duration: 0.45, ease: 'easeInOut' }}
                      className="font-black text-base sm:text-xl md:text-2xl lg:text-3xl tracking-widest text-[#D4AF37] uppercase select-none"
                    >
                      {ROTATING_WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Event details, staggered */}
            <motion.div
              variants={detailsContainerV}
              initial="hidden"
              animate="show"
              className="flex flex-col space-y-4 sm:space-y-6"
            >
              <div className="space-y-2.5 sm:space-y-3.5 pt-1 sm:pt-2 text-zinc-800">
                {/* Dates */}
                <motion.div variants={detailItemV} className="flex items-center gap-2.5 sm:gap-3">
                  <div className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-amber-500/15 text-amber-800 shrink-0">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-zinc-500 block">
                      Conference Dates
                    </span>
                    <span className="text-xs sm:text-base md:text-lg font-bold text-zinc-900">
                      Dates - 26 to 28 August 2027
                    </span>
                  </div>
                </motion.div>

                {/* Venue */}
                <motion.div variants={detailItemV} className="flex items-start gap-2.5 sm:gap-3">
                  <div className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-teal-500/15 text-[#187A83] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-zinc-500 block">
                      Venue Location
                    </span>
                    <span className="text-xs sm:text-sm md:text-base font-bold text-zinc-900 uppercase">
                      GSL EDUCATIONAL INSTITUTIONS , RAJAMAHENDRAVARAM.
                    </span>
                  </div>
                </motion.div>

                {/* Host Institution */}
                <motion.div variants={detailItemV} className="flex items-start gap-2.5 sm:gap-3">
                  <div className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-zinc-200/80 text-zinc-700 shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-zinc-500 block">
                      Organized &amp; Hosted By
                    </span>
                    <p className="text-[11px] sm:text-sm font-medium text-zinc-700 leading-snug sm:leading-relaxed">
                      Hosted by GSL Medical College and general hospital in association with Government medical college and general hospital, Rajamahendravarm
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* CTA Buttons: slide in from the LEFT */}
            <motion.div
              variants={ctaV}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-4 pt-2 sm:pt-4"
            >
              <Link
                href="/registeration"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-7 py-2.5 sm:py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#c59f2a] text-zinc-950 font-bold text-xs sm:text-base shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 text-center"
              >
                <span>Register now</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>

              <Link
                href="#submit-abstract"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-7 py-2.5 sm:py-3.5 rounded-lg bg-white/95 hover:bg-white text-[#187A83] border-2 border-[#187A83] font-bold text-xs sm:text-base shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 text-center"
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Submit Abstract</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: images slide in from the RIGHT */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6 items-center justify-center">
            <motion.div
              custom={0}
              variants={imageV}
              initial="hidden"
              animate="show"
              className="w-full max-w-md sm:max-w-lg lg:max-w-none rounded-2xl overflow-hidden border border-zinc-200/90 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white p-1.5 sm:p-2"
            >
              <div className="relative w-full aspect-[495/253] rounded-xl overflow-hidden bg-zinc-100">
                <Image
                  src="/hero1apasicon.png"
                  alt="APASICON 2027 Rajamahendravaram GSL Campus"
                  fill
                  priority
                  referrerPolicy="no-referrer"
                  className="object-cover hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
            </motion.div>

            <motion.div
              custom={1}
              variants={imageV}
              initial="hidden"
              animate="show"
              className="w-full max-w-md sm:max-w-lg lg:max-w-none rounded-2xl overflow-hidden border border-zinc-200/90 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white p-1.5 sm:p-2"
            >
              <div className="relative w-full aspect-[591/321] rounded-xl overflow-hidden bg-zinc-100">
                <Image
                  src="/hero2apasicon.png"
                  alt="APASICON 2027 Rajamahendravaram Conference View"
                  fill
                  priority
                  referrerPolicy="no-referrer"
                  className="object-cover hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Countdown lives inside the hero, on the same background */}
      <CountdownSection />
    </section>
  );
}