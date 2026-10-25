'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Antonio, Cormorant_Garamond, DM_Serif_Display, Michroma } from 'next/font/google';
import { motion, AnimatePresence, useInView, type Variants } from 'motion/react';

// "APASICON 2027 Rajahmundry": Antonio (golden)
const headingFont = Antonio({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
});
// Theme sentence (black)
const themeFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'],
  style: ['italic'],
  display: 'swap',
});
// "From Fundamentals to Future" (blue) – a different font
const accentFont = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});
// Bottom ticker: Bank Gothic is a paid font, so this is the closest free Google font.
// If you own the Bank Gothic files, swap this for next/font/local (see note in the reply).
const tickerFont = Michroma({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const EYEBROW = 'Welcome to';
const HEADING = 'APASICON 2027 Rajahmundry';

// Heading timing (seconds)
const EYEBROW_START = 0.1;
const EYEBROW_STEP = 0.04;
const HEADING_START = EYEBROW_START + EYEBROW.length * EYEBROW_STEP + 0.15;
const HEADING_STEP = 0.045;

const HIGHLIGHTS = [
  'Hands-on workshops.',
  'Live operations.',
  'Next-generation surgical technology.',
];

const CARDS = [
  {
    title: 'LAPAROSCOPIC MASTERY',
    content:
      'Hands-on laparoscopy • Advanced MIS techniques • Tips, tricks & live demonstrations',
  },
  {
    title: 'ROBOTIC SURGERY',
    content:
      'Robotic instruments • Console & simulation experience • Precision beyond limits',
  },
  {
    title: 'LIVE OPERATIVE EXPERIENCE',
    content:
      'Live surgeries • Expert commentary • Step-by-step operative decision making',
  },
  {
    title: 'SURGICAL INNOVATION',
    content:
      'Next-gen instruments • Emerging technologies • AI, robotics & the future of surgery',
  },
];

const MARQUEE_TEXT =
  'LEARN • WATCH • PRACTISE • INNOVATE • APASICON 2027 • RAJAHMUNDRY • FROM FUNDAMENTALS TO FUTURE • ';

/* ---------- variants ---------- */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

interface LetterCustom {
  i: number;
  start: number;
  step: number;
}

// Each letter is written left -> right: slides in from the left while the blur clears
const letterV: Variants = {
  hidden: { opacity: 0, x: -10, filter: 'blur(6px)' },
  visible: ({ i, start, step }: LetterCustom) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.35, ease: 'easeOut', delay: start + i * step },
  }),
};

// Gold underline draws left -> right
const lineV: Variants = {
  hidden: { scaleX: 0 },
  visible: (delay: number) => ({
    scaleX: 1,
    transition: { duration: 0.8, ease, delay },
  }),
};

const themeV: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease, delay: 0.1 },
  },
};

/* ---------- helpers ---------- */

/** Steps 0..length-1 on a timer, only while `enabled` (i.e. on screen). */
function useRotator(length: number, delay: number, enabled: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const t = setTimeout(() => setIndex((p) => (p + 1) % length), delay);
    return () => clearTimeout(t);
  }, [index, enabled, length, delay]);

  return [index, setIndex] as const;
}

/* ---------- heading (written left to right, left-aligned) ---------- */

/** One line of text written letter by letter. Reads "hidden/visible" from the parent motion element. */
function WrittenLine({
  as: Tag,
  text,
  className,
  start,
  step,
}: {
  as: 'h2' | 'p';
  text: string;
  className: string;
  start: number;
  step: number;
}) {
  let counter = 0;
  const words = text.split(' ').map((word) => ({
    word,
    chars: word.split('').map((ch) => ({ ch, i: counter++ })),
  }));

  return (
    <Tag aria-label={text} className={className}>
      {words.map(({ word, chars }, wi) => (
        <span
          key={`${word}-${wi}`}
          aria-hidden="true"
          className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
        >
          {chars.map(({ ch, i }) => (
            <motion.span
              key={i}
              custom={{ i, start, step } satisfies LetterCustom}
              variants={letterV}
              className="inline-block"
            >
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

/** "Welcome to" on top, "APASICON 2027 RAJAHMUNDRY" right below it, both left-aligned with the image. */
function HeadingBlock() {
  const lineDelay = HEADING_START + HEADING.length * HEADING_STEP + 0.1;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className="text-left"
    >
      <WrittenLine
        as="p"
        text={EYEBROW}
        start={EYEBROW_START}
        step={EYEBROW_STEP}
        className="font-sans font-normal text-xl sm:text-3xl lg:text-4xl xl:text-5xl leading-none tracking-wide text-[#111111]"
      />
      <WrittenLine
        as="h2"
        text={HEADING}
        start={HEADING_START}
        step={HEADING_STEP}
        className={`${headingFont.className} mt-1 sm:mt-1.5 text-[26px] leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-wide text-[#D4AF37]`}
      />
      <motion.div
        custom={lineDelay}
        variants={lineV}
        className="mt-2 sm:mt-3 h-[3px] w-24 sm:w-40 origin-left rounded-full bg-[#D4AF37]"
      />
    </motion.div>
  );
}

/* ---------- theme sentence (inside the image) ---------- */

function ThemeText() {
  return (
    <motion.p
      variants={themeV}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={`${themeFont.className} mx-auto max-w-3xl text-center text-[18px] leading-snug sm:text-2xl lg:text-[30px] font-bold italic text-[#111111]`}
    >
      Our theme is “
      <span className="relative inline-block whitespace-normal">
        <span
          className={`${accentFont.className} not-italic font-normal text-[#1D4ED8] text-[1.3em] tracking-tight`}
        >
          From Fundamentals to Future
        </span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 1.0 }}
          className="absolute left-0 -bottom-0.5 h-[2px] w-full origin-left bg-[#1D4ED8]/60"
        />
      </span>
      ,” reflecting the journey of surgery from basic principles to advanced laparoscopy and robotic simulation.
    </motion.p>
  );
}

/* ---------- text blocks ---------- */

function IntroText() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="flex flex-col space-y-2.5 sm:space-y-3 text-[#111111]"
    >
      <motion.p
        variants={fadeUpVariants}
        className="text-sm sm:text-base lg:text-lg font-bold leading-snug"
      >
        With great pride and enthusiasm, we, the organizing committee of APASICON 2027, invite you to Rajamahendravaram.
      </motion.p>
      <motion.p
        variants={fadeUpVariants}
        className="text-xs sm:text-sm lg:text-[15px] font-medium leading-relaxed"
      >
        It is a great privilege for GSL Medical College and Government Medical College, Rajamahendravarm, to host this prestigious conference.
      </motion.p>
    </motion.div>
  );
}

function MainText() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="flex flex-col space-y-2.5 sm:space-y-3 text-[#111111]"
    >
      <motion.p
        variants={fadeUpVariants}
        className="text-xs sm:text-sm lg:text-base font-extrabold border-l-4 border-[#D4AF37] pl-3 py-0.5"
      >
        Join us for the Golden Jubilee Annual State Conference of the Association of Surgeons of India.
      </motion.p>
      <motion.p
        variants={fadeUpVariants}
        className="text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed"
      >
        APASICON 2027 will be more than a scientific meeting. It will bring together experience, enthusiasm, wisdom, innovation, and senior surgeons with the next generation of young surgeons.
      </motion.p>
    </motion.div>
  );
}

/** Hands-on workshops → Live operations → Next-generation… one after another, same spot. */
function HighlightsRotator() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const [active] = useRotator(HIGHLIGHTS.length, 2200, inView);

  return (
    <div ref={ref} className="flex items-center gap-2.5 text-[#111111]">
      <span className="h-5 w-1 rounded-full bg-[#187A83] shrink-0" aria-hidden="true" />
      <div className="relative h-6 sm:h-7 overflow-hidden flex-1" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={HIGHLIGHTS[active]}
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute inset-0 flex items-center text-sm sm:text-base lg:text-lg font-bold tracking-wide"
          >
            {HIGHLIGHTS[active]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- cards ---------- */

/** Phones: one card, same spot, changes by itself once it is on screen. */
function CardStage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const [active, setActive] = useRotator(CARDS.length, 3000, inView);
  const card = CARDS[active];

  return (
    <div ref={ref} className="md:hidden">
      <div className="relative min-h-[150px] bg-white border border-[#111111]/10 border-l-4 border-l-[#187A83] rounded-xl p-4 shadow-sm overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={card.title}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <span className="text-[10px] font-bold tracking-widest text-[#D4AF37]">
              0{active + 1} / 0{CARDS.length}
            </span>
            <h3 className="mt-1 text-sm font-black tracking-wide text-[#111111] uppercase">
              {card.title}
            </h3>
            <p className="mt-1.5 text-xs font-medium text-[#111111]/85 leading-relaxed">
              {card.content}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {CARDS.map((c, i) => (
          <button
            key={c.title}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show card ${i + 1}: ${c.title}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? 'w-6 bg-[#187A83]' : 'w-1.5 bg-[#111111]/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/** Tablet / desktop card grid (layout classes come from the parent). */
function CardGrid({ className }: { className: string }) {
  return (
    <motion.div
      variants={cardContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {CARDS.map((card) => (
        <motion.div
          key={card.title}
          variants={cardItemVariants}
          className="bg-white border border-[#111111]/10 border-l-4 border-l-[#187A83] rounded-xl p-3.5 lg:p-4 shadow-xs hover:shadow-md transition-shadow duration-300"
        >
          <h3 className="text-xs lg:text-sm font-black tracking-wide text-[#111111] uppercase mb-1">
            {card.title}
          </h3>
          <p className="text-[11px] lg:text-xs font-medium text-[#111111]/85 leading-relaxed">
            {card.content}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ---------- section ---------- */

export default function WelcomeSection() {
  return (
    <>
      <section
        id="welcome-section"
        className="relative bg-white px-3 sm:px-6 lg:px-8 pt-8 pb-6 sm:pt-12 sm:pb-10 lg:pt-14 lg:pb-12 scroll-mt-6"
      >
        {/* Heading: same width as the image container, so its left edge lines up with the image */}
        <div className="max-w-7xl mx-auto mb-4 sm:mb-6 lg:mb-8">
          <HeadingBlock />
        </div>

        {/* Image container */}
        <div className="relative max-w-7xl mx-auto overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200/80 shadow-sm">
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="/welcome1.png"
              alt="Welcome to APASICON 2027"
              fill
              priority={false}
              referrerPolicy="no-referrer"
              className="object-cover object-center opacity-60"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-white/55 sm:bg-white/45" />
          </div>

          <div className="relative z-10 px-4 sm:px-8 lg:px-10 py-6 sm:py-9 lg:py-10">
            {/* Theme sentence, inside the image */}
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <ThemeText />
            </div>

            {/* < lg: intro + rotating highlights, all on the image */}
            <div className="lg:hidden space-y-4">
              <IntroText />
              <HighlightsRotator />
            </div>

            {/* lg+: text | cards, all on the image */}
            <div className="hidden lg:grid grid-cols-12 gap-10 items-start">
              <div className="col-span-7 flex flex-col space-y-3">
                <IntroText />
                <MainText />
                <HighlightsRotator />
              </div>
              <div className="col-span-5">
                <CardGrid className="grid grid-cols-1 gap-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* < lg: rest continues on the plain white background */}
        <div className="lg:hidden max-w-7xl mx-auto mt-5 sm:mt-7 px-1 sm:px-2 space-y-4 sm:space-y-5">
          <MainText />
          <CardStage />
          <CardGrid className="hidden md:grid md:grid-cols-2 gap-3" />
        </div>
        {/* Ticker: lives on the section background (no band, no lines).
            Negative margins cancel the section padding so it runs edge to edge. */}
        <div className="relative overflow-hidden -mx-3 sm:-mx-6 lg:-mx-8 mt-8 sm:mt-10 lg:mt-12 select-none">
        <motion.div
          className="flex whitespace-nowrap will-change-transform"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 12, repeat: Infinity }}
        >
          {[0, 1].map((n) => (
            <div
              key={n}
              className="flex items-center shrink-0 space-x-6 sm:space-x-8 md:space-x-10 pr-6 sm:pr-8 md:pr-10"
            >
              <span
                className={`${tickerFont.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-wide text-[#111111] uppercase`}
              >
                {MARQUEE_TEXT}
              </span>
            </div>
          ))}
        </motion.div>
        </div>
      </section>
    </>
  );
}