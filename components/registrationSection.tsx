'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface TariffPlan {
  category: string;
  earlyBird: string;
  slab1: string;
  slab2: string;
}

const TARIFF_DATA: TariffPlan[] = [
  {
    category: 'ASI Member',
    earlyBird: '₹6,400',
    slab1: '₹7,080',
    slab2: '₹7,670',
  },
  {
    category: 'ASI Non-Member',
    earlyBird: '₹7,080',
    slab1: '₹7,670',
    slab2: '₹8,260',
  },
  {
    category: 'PG Student',
    earlyBird: '₹5,000',
    slab1: '₹6,400',
    slab2: '₹7,080',
  },
  {
    category: 'Accompanying Person',
    earlyBird: '₹5,310',
    slab1: '₹5,000',
    slab2: '₹6,490',
  },
];

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
};

export default function RegistrationSection() {
  return (
    <section
      id="tariffs"
      className="relative overflow-hidden bg-[#F7F7F5] py-12 sm:py-16 md:py-20 lg:py-24 border-b border-zinc-200 scroll-mt-6"
    >
      {/* Decorative top transition line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#187A83]/50 to-transparent origin-center"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with scroll transition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-8 sm:mb-12 lg:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#111111]">
            Registration Tariff
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-[#D4AF37] mx-auto mt-3 sm:mt-4 rounded-full" />
          <p className="mt-3 text-xs sm:text-sm font-medium text-zinc-600 max-w-xl mx-auto">
            Early bird registrations and conference tariffs for APASICON 2027.
          </p>
        </motion.div>

        {/* Vertical Pricing Cards Grid - Responsive & decreased sizes for mobile */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 items-stretch"
        >
          {TARIFF_DATA.map((plan) => (
            <motion.div
              key={plan.category}
              variants={cardItemVariants}
              className="flex flex-col justify-between bg-white rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-300 shadow-xs hover:shadow-lg border border-zinc-200/90 hover:border-[#187A83]/70"
            >
              <div>
                {/* Category Name */}
                <h3 className="text-base sm:text-lg lg:text-xl font-black text-[#111111] tracking-tight pb-2.5 sm:pb-3 border-b border-zinc-100">
                  {plan.category}
                </h3>

                {/* Slabs Pricing Display - Responsive compact sizes */}
                <div className="py-3.5 sm:py-4 space-y-2.5">
                  {/* Previous Strikethrough Slabs */}
                  <div className="space-y-1 text-[11px] sm:text-xs text-zinc-400">
                    <div className="flex items-center justify-between">
                      <span>Early Bird:</span>
                      <span className="line-through font-semibold text-zinc-400 text-xs sm:text-sm">
                        {plan.earlyBird}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Slab 1:</span>
                      <span className="line-through font-semibold text-zinc-400 text-xs sm:text-sm">
                        {plan.slab1}
                      </span>
                    </div>
                  </div>

                  {/* Active Current Price: Slab 2 */}
                  <div className="pt-2 border-t border-zinc-100">
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-[#187A83] block mb-1">
                      Slab 2 (Current Rate)
                    </span>
                    <div className="flex items-baseline">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] tracking-tight">
                        {plan.slab2}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button: Register Now - Clean & Uniform for all cards */}
              <div className="pt-3">
                <Link
                  href={`/registeration?category=${encodeURIComponent(plan.category)}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#187A83] hover:bg-[#136067] text-white shadow-xs hover:shadow transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#187A83]"
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
