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

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Whole block rises in with a soft un-blur, then the pieces pop in one by one.
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 48, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease,
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const popItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 14 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 380, damping: 24 },
  },
};

const TARGET_DATE = new Date('2027-08-26T09:00:00+05:30').getTime();

function calculateTimeLeft(): TimeLeft {
  const difference = TARGET_DATE - Date.now();

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      sec: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }
  return { days: 0, hours: 0, mins: 0, sec: 0 };
}

const unitBox =
  'flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-3.5 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 shadow-sm';
const unitNum =
  'font-mono font-black text-2xl sm:text-3xl md:text-4xl text-[#111111] tabular-nums leading-none';
const unitLabel =
  'font-sans font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-wider';

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fmt = (num: number) => String(num).padStart(2, '0');

  const scrollToWelcome = () => {
    document.getElementById('welcome-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const units = [
    { value: timeLeft.days, label: 'Days', border: 'border-[#D4AF37]', text: 'text-[#187A83]', big: true },
    { value: timeLeft.hours, label: 'Hours', border: 'border-[#187A83]', text: 'text-[#D4AF37]', big: false },
    { value: timeLeft.mins, label: 'Mins', border: 'border-[#D4AF37]', text: 'text-[#187A83]', big: false },
    { value: timeLeft.sec, label: 'Sec', border: 'border-[#187A83]', text: 'text-[#D4AF37]', big: false },
  ];

  return (
    <section className="relative z-10 py-10 sm:py-12 md:py-14 lg:py-16 pb-14 sm:pb-16">
      {/* No background of its own: it sits on the shared hero background */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-10"
        >
          {/* Event begins in */}
          <motion.div
            variants={popItemVariants}
            className="flex items-baseline justify-center gap-x-2.5 text-center shrink-0"
          >
            <span className="font-serif italic text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
              Event
            </span>
            <span className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#187A83] tracking-wide">
              begins
            </span>
            <span className="font-mono font-bold text-2xl sm:text-3xl lg:text-4xl text-[#D4AF37] uppercase tracking-wider">
              in
            </span>
          </motion.div>

          {/* Countdown units */}
          <motion.div
            variants={popItemVariants}
            className="grid grid-cols-3 gap-2 w-full max-w-sm sm:max-w-none sm:w-auto sm:flex sm:items-center sm:justify-center sm:gap-3 lg:gap-4 shrink-0"
          >
            {units.map((u) => (
              <motion.div
                key={u.label}
                whileHover={{ scale: 1.06 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className={`${unitBox} border-2 ${u.border} justify-center ${
                  u.big
                    ? 'col-span-3 mx-auto px-8 py-3 sm:mx-0 sm:px-4 sm:py-2.5 md:px-5 md:py-3'
                    : 'px-2 sm:px-4'
                }`}
              >
                <span
                  suppressHydrationWarning
                  className={`${unitNum} ${u.big ? 'text-3xl sm:text-3xl md:text-4xl' : ''}`}
                >
                  {fmt(u.value)}
                </span>
                <span className={`${unitLabel} ${u.text} ${u.big ? 'text-sm sm:text-xs md:text-sm' : ''}`}>
                  {u.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Subtext */}
          <motion.div variants={popItemVariants} className="flex items-center shrink-0">
            <span className="font-serif italic text-xs sm:text-sm lg:text-base font-semibold tracking-wide text-[#111111]/75 bg-white/90 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-sm">
              (Mark Your Date - 26th Aug 2027)
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Smooth fade into the next section (change `to-white` if Welcome has another bg) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-14 sm:h-16 bg-gradient-to-b from-transparent via-white/70 to-white" />

      {/* Discover button */}
      {/* <div className="absolute left-1/2 bottom-4 -translate-x-1/2 z-30">
        <motion.button
          onClick={scrollToWelcome}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, 4, 0] }}
          transition={{
            y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 0.2 },
          }}
          className="flex items-center gap-1 bg-white hover:bg-zinc-50 border border-[#D4AF37] text-[#187A83] px-3 py-1 rounded-full shadow-sm text-[11px] sm:text-xs font-semibold cursor-pointer group transition-colors"
          title="Scroll to Welcome section"
          aria-label="Scroll to Welcome Section"
        >
          <span className="group-hover:text-[#111111] transition-colors">Discover</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-y-0.5 transition-transform" />
        </motion.button>
      </div> */}
    </section>
  );
}