'use client';

import React from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'motion/react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
};

export default function WelcomeSection() {
  const cards = [
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

  const marqueeText = 'LEARN • WATCH • PRACTISE • INNOVATE • APASICON 2027 • RAJAHMUNDRY • FROM FUNDAMENTALS TO FUTURE • ';

  return (
    <>
      {/* Background Image Welcome Section without bottom line */}
      <section
        id="welcome-section"
        className="relative overflow-hidden py-10 sm:py-16 md:py-20 lg:py-24 scroll-mt-6"
      >
        {/* Subtle decorative scroll entrance accent from Countdown */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent origin-center z-10"
        />

        {/* Background Image with increased transparency (opacity-20 and soft overlay) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/welcome1.png"
            alt="Welcome to APASICON 2027"
            fill
            priority={false}
            referrerPolicy="no-referrer"
            className="object-cover object-center opacity-60 sm:opacity-60"
          />
          {/* Transparent soft white overlay */}
          <div className="absolute inset-0 bg-[#FFFFFF]/55 sm:bg-[#FFFFFF]/45" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading - Responsive text sizes, decreased on mobile */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#111111]">
              Welcome to APASICON 2027 Rajahmundry.
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-[#D4AF37] mx-auto mt-3 sm:mt-4 rounded-full" />
          </motion.div>

          {/* 2-Column Layout: Left (Animated Black text with responsive sizes) & Right (Cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left Side: Black color and responsive decreased font sizes for mobile */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-5 lg:space-y-6 text-[#111111]"
            >
              {/* Paragraph 1: Large invitation */}
              <motion.p
                variants={fadeUpVariants}
                className="text-base sm:text-xl lg:text-2xl font-bold leading-snug text-[#111111]"
              >
                With great pride and enthusiasm, we, the organizing committee of APASICON 2027, invite you to Rajamahendravaram.
              </motion.p>

              {/* Paragraph 2: Host privilege */}
              <motion.p
                variants={fadeUpVariants}
                className="text-xs sm:text-base lg:text-lg font-medium leading-relaxed text-[#111111]"
              >
                It is a great privilege for GSL Medical College and Government Medical College, Rajamahendravarm, to host this prestigious conference.
              </motion.p>

              {/* Paragraph 3: Golden Jubilee milestone */}
              <motion.p
                variants={fadeUpVariants}
                className="text-sm sm:text-lg lg:text-xl font-extrabold text-[#111111] border-l-4 border-[#D4AF37] pl-3 sm:pl-4 py-0.5 sm:py-1"
              >
                Join us for the Golden Jubilee Annual State Conference of the Association of Surgeons of India.
              </motion.p>

              {/* Paragraph 4: Theme */}
              <motion.p
                variants={fadeUpVariants}
                className="text-xs sm:text-base lg:text-lg italic font-semibold leading-relaxed text-[#111111]"
              >
                Our theme is “From Fundamentals to Future,” reflecting the journey of surgery from basic principles to advanced laparoscopy and robotic stimulation.
              </motion.p>

              {/* Paragraph 5: Scientific meeting description */}
              <motion.p
                variants={fadeUpVariants}
                className="text-xs sm:text-sm lg:text-base font-normal leading-relaxed text-[#111111]"
              >
                APASICON 2027 will be more than a scientific meeting. It will bring together experience ,enthusiasm, wisdom , innovation, and senior surgeons with the next generation of young surgeons.
              </motion.p>

              {/* Highlights bullet line */}
              <motion.p
                variants={fadeUpVariants}
                className="text-xs sm:text-sm lg:text-base font-bold tracking-wide text-[#111111] pt-1"
              >
                Hands-on workshops • Live operations • Next-generation surgical technology.
              </motion.p>
            </motion.div>

            {/* Right Side: Responsive Cards */}
            <motion.div
              variants={cardContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="lg:col-span-5 grid grid-cols-1 gap-3 sm:gap-4 lg:gap-5"
            >
              {cards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={cardItemVariants}
                  className="bg-[#FFFFFF] border-l-4 border-l-[#187A83] border border-[#111111]/10 rounded-xl p-3.5 sm:p-5 shadow-xs hover:shadow-md transition-shadow duration-300"
                >
                  <h3 className="text-xs sm:text-sm lg:text-base font-black tracking-wide text-[#111111] uppercase mb-1 sm:mb-2">
                    {card.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs lg:text-sm font-medium text-[#111111]/85 leading-relaxed">
                    {card.content}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* AFTER the background image section: Horizontally scrolling ticker with poster font black letters */}
      <div className="relative w-full overflow-hidden bg-[#FAFAF8] py-3 sm:py-4 md:py-5 lg:py-6 border-y border-[#111111]/15 select-none">
        <motion.div
          className="flex whitespace-nowrap will-change-transform"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 12,
            repeat: Infinity,
          }}
        >
          <div className="flex items-center shrink-0 space-x-6 sm:space-x-8 md:space-x-10 pr-6 sm:pr-8 md:pr-10">
            <span className="font-sans font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-[#111111] uppercase">
              {marqueeText}
            </span>
          </div>
          <div className="flex items-center shrink-0 space-x-6 sm:space-x-8 md:space-x-10 pr-6 sm:pr-8 md:pr-10">
            <span className="font-sans font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-[#111111] uppercase">
              {marqueeText}
            </span>
          </div>
        </motion.div>
      </div>
    </>
  );
}
