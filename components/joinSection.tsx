'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'motion/react';
import { ArrowRight, ExternalLink, UserCheck, Sparkles } from 'lucide-react';
import { Playfair_Display } from 'next/font/google';
import BgAura from './bgaura';

const blockVariantsLeft: Variants = {
  hidden: { opacity: 0, x: -30, y: 15 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const blockVariantsRight: Variants = {
  hidden: { opacity: 0, x: 30, y: 15 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay: 0.15,
    },
  },
};

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function JoinSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24">
      {/* Same background as the hero */}
      <BgAura waves={false} />

      {/* Seam fix (bottom): settle the aura to the plain base colour so the
          next section can start from exactly the same colour. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 sm:h-48 bg-gradient-to-b from-transparent to-[#fbfaf7]" />

      {/* Godavari blue: soft river-water tint on the left.
          It fades out toward the bottom (mask) and the Committee section
          picks the same tint up from its top, so the river flows across. */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[75%] sm:w-[60%]"
        style={{
          background:
            'radial-gradient(ellipse at 40% 65%, rgba(64,160,190,0.40) 0%, rgba(96,184,204,0.30) 35%, rgba(140,208,222,0.08) 62%, transparent 82%)',
          filter: 'blur(14px)',
          WebkitMaskImage:
            'linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)',
          maskImage:
            'linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)',
        }}
      />

      {/* Slow fade: the white Welcome section melts into the aura */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 sm:h-40 bg-gradient-to-b from-white via-white/70 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Left Block: Join the forefront of Surgery */}
          <motion.div
            variants={blockVariantsLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ minHeight: '7cm' }}
            className="flex flex-col justify-between bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#D4AF37] border border-amber-200/80 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Conference Pass</span>
              </div>
              <h3 className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight`}>
                Join the forefront of Surgery
              </h3>
              <p className="text-sm sm:text-base font-medium text-[#111111]/80 leading-relaxed">
                Secure your spot at the most anticipated surgical conference of 2027 and be a part of the change.
              </p>
            </div>

            <div className="pt-6">
              <Link
                href="/registeration"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#c59f2a] text-[#111111] font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                <span>Register now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Block: ASI Member Registration */}
          <motion.div
            variants={blockVariantsRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ minHeight: '7cm' }}
            className="flex flex-col justify-between bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border-2 border-[#187A83] shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#187A83] border border-teal-200/80 text-xs font-bold uppercase tracking-wider">
                <UserCheck className="w-3.5 h-3.5" />
                <span>ASI Membership</span>
              </div>
              <h3 className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight`}>
                ASI Member Registration
              </h3>
              <p className="text-sm sm:text-base font-medium text-[#111111]/80 leading-relaxed">
                Become an ASI member. The registration takes place on the official ASI membership portal.
              </p>
            </div>

            <div className="pt-6">
              <a
                href="https://asiindia.org/member-application/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#187A83] hover:bg-[#136067] text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                <span>ASI Membership</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}