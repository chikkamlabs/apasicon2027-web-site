'use client';

import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  mins: number;
  sec: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const popItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
};

const TARGET_DATE = new Date('2027-08-26T09:00:00+05:30').getTime();

function calculateTimeLeft(): TimeLeft {
  const now = Date.now();
  const difference = TARGET_DATE - now;

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      mins: Math.floor((difference % (1000 * 60)) / (1000 * 60)),
      sec: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }
  return { days: 0, hours: 0, mins: 0, sec: 0 };
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  const scrollToWelcome = () => {
    const welcomeEl = document.getElementById('welcome-section');
    if (welcomeEl) {
      welcomeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-visible bg-[#F7F7F5] py-5 sm:py-6 md:py-7 lg:py-8 border-b border-[#D4AF37]/30 shadow-xs z-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-5 lg:gap-8"
        >
          {/* Mobile Line 1 / Desktop Single Line Part 1: Event begins in */}
          <motion.div
            variants={popItemVariants}
            className="flex items-baseline justify-center gap-x-2 sm:gap-x-2.5 text-center shrink-0"
          >
            {/* Word 1: Event */}
            <span className="font-serif italic text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black text-[#111111] tracking-tight">
              Event
            </span>

            {/* Word 2: begins */}
            <span className="font-sans font-extrabold text-xl sm:text-2xl md:text-2xl lg:text-3xl text-[#187A83] tracking-wide">
              begins
            </span>

            {/* Word 3: in */}
            <span className="font-mono font-bold text-lg sm:text-xl md:text-xl lg:text-2xl text-[#D4AF37] uppercase tracking-wider">
              in
            </span>

            {/* Subtext shown on mobile line 1 */}
            <span className="inline-block md:hidden font-serif italic text-[11px] sm:text-xs text-[#111111]/70 bg-white/80 px-2 py-0.5 rounded-full border border-[#D4AF37]/35 ml-1">
              (from now to 26th Aug)
            </span>
          </motion.div>

          {/* Mobile Line 2 / Desktop Single Line Part 2: Horizontal Countdown Units */}
          <motion.div
            variants={popItemVariants}
            className="flex items-center justify-center gap-2 sm:gap-3 md:gap-3 lg:gap-4 shrink-0"
          >
            {/* Days Unit */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="flex items-center gap-1.5 bg-[#FFFFFF] border-2 border-[#D4AF37] rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-3.5 md:py-1.5 shadow-xs"
            >
              <span
                suppressHydrationWarning
                className="font-mono font-black text-lg sm:text-xl md:text-2xl text-[#111111] tabular-nums leading-none"
              >
                {formatNumber(timeLeft.days)}
              </span>
              <span className="font-sans font-bold text-[9px] sm:text-[10px] md:text-[11px] text-[#187A83] uppercase tracking-wider">
                Days
              </span>
            </motion.div>

            {/* Hours Unit */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="flex items-center gap-1.5 bg-[#FFFFFF] border-2 border-[#187A83] rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-3.5 md:py-1.5 shadow-xs"
            >
              <span
                suppressHydrationWarning
                className="font-mono font-black text-lg sm:text-xl md:text-2xl text-[#111111] tabular-nums leading-none"
              >
                {formatNumber(timeLeft.hours)}
              </span>
              <span className="font-sans font-bold text-[9px] sm:text-[10px] md:text-[11px] text-[#D4AF37] uppercase tracking-wider">
                Hours
              </span>
            </motion.div>

            {/* Mins Unit */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="flex items-center gap-1.5 bg-[#FFFFFF] border-2 border-[#D4AF37] rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-3.5 md:py-1.5 shadow-xs"
            >
              <span
                suppressHydrationWarning
                className="font-mono font-black text-lg sm:text-xl md:text-2xl text-[#111111] tabular-nums leading-none"
              >
                {formatNumber(timeLeft.mins)}
              </span>
              <span className="font-sans font-bold text-[9px] sm:text-[10px] md:text-[11px] text-[#187A83] uppercase tracking-wider">
                Mins
              </span>
            </motion.div>

            {/* Sec Unit */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="flex items-center gap-1.5 bg-[#FFFFFF] border-2 border-[#187A83] rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-3.5 md:py-1.5 shadow-xs"
            >
              <span
                suppressHydrationWarning
                className="font-mono font-black text-lg sm:text-xl md:text-2xl text-[#111111] tabular-nums leading-none"
              >
                {formatNumber(timeLeft.sec)}
              </span>
              <span className="font-sans font-bold text-[9px] sm:text-[10px] md:text-[11px] text-[#D4AF37] uppercase tracking-wider">
                Sec
              </span>
            </motion.div>
          </motion.div>

          {/* Desktop Single Line Part 3: Subtext */}
          <motion.div variants={popItemVariants} className="hidden md:flex items-center shrink-0">
            <span className="font-serif italic text-xs lg:text-sm font-semibold tracking-wide text-[#111111]/75 bg-[#FFFFFF] px-3 py-1 rounded-full border border-[#D4AF37]/40 shadow-2xs">
              (from now to 26th Aug)
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Attractive Transition Indicator to Welcome Section */}
      <div className="absolute left-1/2 -bottom-3 -translate-x-1/2 z-30 pointer-events-auto">
        <motion.button
          onClick={scrollToWelcome}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, 4, 0] }}
          transition={{
            y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 0.2 },
          }}
          className="flex items-center gap-1 bg-white hover:bg-zinc-50 border border-[#D4AF37] text-[#187A83] px-2.5 py-0.5 rounded-full shadow-sm text-[10px] sm:text-[11px] font-semibold cursor-pointer group transition-colors"
          title="Scroll to Welcome section"
          aria-label="Scroll to Welcome Section"
        >
          <span className="group-hover:text-[#111111] transition-colors">Discover</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-y-0.5 transition-transform" />
        </motion.button>
      </div>

      {/* Subtle animated glowing transition beam along the bottom edge */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 100%',
        }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-75"
      />
    </section>
  );
}
