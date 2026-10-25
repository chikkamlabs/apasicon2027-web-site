'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Outfit, Roboto_Slab } from 'next/font/google';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { User, ChevronDown } from 'lucide-react';
import BgAura from './bgaura';

// Modern font for headings
const modernFont = Outfit({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
});

// Slab serif for member names
const slabFont = Roboto_Slab({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
});

interface Member {
  name: string;
  designation: string;
  image?: string;
}

type Tone = 'gold' | 'teal';

const AP_ASI_LEADERSHIP: Member[] = [
  {
    name: 'Dr. Sushama Surapaneni',
    designation: 'Chairperson',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Dr. M.A.Hari babu',
    designation: 'Chair man elect',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Dr.Nukala Srinivasa Rao',
    designation: 'Immediate past Chairperson',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Dr. Phani Mahesh Reddy',
    designation: 'Secretary',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Dr. Basa Maruti',
    designation: 'Joint secretary',
    image: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Dr. Anuroop Thota',
    designation: 'Treasurer',
    image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Dr. Samir Ranjan Nayak',
    designation: 'Ec Member',
    image: '/drnayak.png',
  },
  {
    name: 'Dr. K.Tirumala Prasad',
    designation: 'Ec Member',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Dr. K.Ramachandra Naidu',
    designation: 'Ec Member',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Dr. S.V. Rama mohan Reddy',
    designation: 'Ec Member',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  },
];

const AP_ASI_LOCAL_LEADERSHIP: Member[] = [
  {
    name: 'Dr. Ganni Bhaskara Rao',
    designation: 'Organising Chairman',
    image: '/gannibhaskarrao.png',
  },
  {
    name: 'Dr. Nukala Srinivas Rao',
    designation: 'Organising Co-Chairman',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Dr. Samir Ranjan Nayak',
    designation: 'Organising Secretary',
    image: '/drnayak.png',
  },
  {
    name: 'Dr. Tarun Gogineni',
    designation: 'Organising Co-Secretary',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Dr. T.Ramesh Kishore',
    designation: 'Organising Co-Secretary',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Dr. Boyidi Venkat Raju',
    designation: 'Treasurer',
    image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=600&q=80',
  },
];

// Full class strings so Tailwind can see them
const TONES: Record<
  Tone,
  { border: string; shadow: string; bg: string; ring: string; label: string; labelText: string }
> = {
  gold: {
    border: 'border-[#D4AF37]',
    shadow: 'shadow-[0_8px_24px_rgba(212,175,55,0.22)]',
    bg: 'to-amber-50/40',
    ring: 'border-amber-300/80',
    label: 'text-amber-700/80',
    labelText: 'Faculty',
  },
  teal: {
    border: 'border-[#187A83]',
    shadow: 'shadow-[0_8px_24px_rgba(24,122,131,0.22)]',
    bg: 'to-teal-50/40',
    ring: 'border-teal-300/80',
    label: 'text-teal-800/80',
    labelText: 'Organizing Team',
  },
};

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

/** One member: photo + name + designation. `stage` = the big phone version. */
function MemberCard({
  member,
  tone,
  variant,
  className = '',
}: {
  member: Member;
  tone: Tone;
  variant: 'carousel' | 'stage';
  className?: string;
}) {
  const t = TONES[tone];
  const stage = variant === 'stage';

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-100 ${t.bg} border-4 ${t.border} ${t.shadow} group/photo cursor-default ${
          stage
            ? 'w-[78vw] max-w-[19rem] h-[24rem]'
            : 'w-48 sm:w-56 md:w-60 h-64 sm:h-72 md:h-80'
        }`}
      >
        {member.image ? (
          <div className="relative w-full h-full">
            <Image
              src={member.image}
              alt={member.name}
              fill
              referrerPolicy="no-referrer"
              className="object-cover object-top transition-transform duration-500 group-hover/photo:scale-105"
            />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center transition-transform duration-300 group-hover/photo:scale-105">
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 ${t.ring} shadow-md flex items-center justify-center text-[#187A83] group-hover/photo:text-[#D4AF37] transition-colors`}
            >
              <User className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>
            <span
              className={`text-[11px] sm:text-xs font-black ${t.label} tracking-widest uppercase mt-4`}
            >
              {t.labelText}
            </span>
          </div>
        )}
      </div>

      <div
        className={`text-center w-full px-2 ${
          stage ? 'mt-4 min-h-[4.5rem]' : 'mt-3.5'
        }`}
      >
        <p
          className={`${slabFont.className} font-extrabold text-[#111111] leading-snug ${
            stage ? 'text-xl' : 'text-sm sm:text-base md:text-lg'
          }`}
        >
          {member.name}
        </p>
        <p
          className={`font-semibold text-zinc-600 mt-1 ${
            stage ? 'text-base' : 'text-xs sm:text-sm'
          }`}
        >
          {member.designation}
        </p>
      </div>
    </div>
  );
}

/**
 * Phones only: the outgoing card slides out to the left WHILE the next card
 * slides in from the right at the same time, so there is never an empty gap.
 * Both cards share the same grid cell, so they overlap during the hand-off.
 */
function MobileMemberStage({ members, tone }: { members: Member[]; tone: Tone }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  // ~3.4s hold + ~0.6s for the simultaneous out / in animation
  const [active, setActive] = useRotator(members.length, 2000, inView);
  const member = members[active];

  return (
    <div ref={ref} className="md:hidden">
      <div className="grid justify-items-center overflow-hidden py-3">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={`${member.name}-${active}`}
            className="col-start-1 row-start-1"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <MemberCard member={member} tone={tone} variant="stage" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="mt-1 flex items-center justify-center gap-1.5">
        {members.map((m, i) => (
          <button
            key={`${m.name}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${m.name}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active
                ? `w-5 ${tone === 'gold' ? 'bg-[#D4AF37]' : 'bg-[#187A83]'}`
                : 'w-1.5 bg-[#111111]/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/** Tablet / desktop: the original endless scrolling carousel. */
function DesktopCarousel({ members, tone, keyPrefix }: { members: Member[]; tone: Tone; keyPrefix: string }) {
  return (
    <div className="hidden md:block relative w-full overflow-hidden py-4">
      <div className="animate-committee-scroll">
        {[...members, ...members].map((member, index) => {
          const isEven = (index % members.length + 1) % 2 === 0;

          return (
            <MemberCard
              key={`${keyPrefix}-${index}`}
              member={member}
              tone={tone}
              variant="carousel"
              className={`mx-3 sm:mx-5 shrink-0 transition-transform duration-300 w-52 sm:w-60 md:w-64 ${
                isEven ? '-translate-y-3 mt-0' : 'translate-y-0 mt-3'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function CommitteeSection() {
  const scrollToRegistration = () => {
    const el = document.getElementById('tariffs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="committee"
      className="relative overflow-hidden py-14 sm:py-20 lg:py-24"
    >
      {/* Same aura background as the hero and join section (outside the animated container) */}
      <BgAura waves={false} />

      {/* Godavari blue, top-left: continues the river tint from the Join section.
          It fades IN from the top edge (mask) so it meets the Join section's
          fading-out tint with no visible line. */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[75%] sm:w-[60%]"
        style={{
          background:
            'radial-gradient(ellipse at 35% 22%, rgba(64,160,190,0.38) 0%, rgba(96,184,204,0.28) 35%, rgba(140,208,222,0.08) 62%, transparent 82%)',
          filter: 'blur(14px)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, #000 22%, #000 55%, transparent 100%)',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, #000 22%, #000 55%, transparent 100%)',
        }}
      />

      {/* Godavari blue, lower-right: a second, lighter pool of river water
          behind the teal "Local Leadership" row so the section feels balanced. */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-0 right-0 z-[1] h-[55%] w-[70%] sm:w-[55%]"
        style={{
          background:
            'radial-gradient(ellipse at 60% 55%, rgba(64,160,190,0.30) 0%, rgba(96,184,204,0.20) 38%, rgba(140,208,222,0.06) 64%, transparent 84%)',
          filter: 'blur(16px)',
        }}
      />

      {/* Seam fix (top): start from the exact base colour the Join section ends on,
          then melt away, so the two sections read as one continuous surface. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 sm:h-48 bg-gradient-to-b from-[#fbfaf7] via-[#fbfaf7]/60 to-transparent" />

      <motion.div
        initial={{ scale: 0.88, y: 75, opacity: 0.6 }}
        whileInView={{ scale: 1, y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-10 w-full"
      >
        {/* Main Section Heading */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 sm:mb-14">
          <h2
            className={`${modernFont.className} text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111]`}
          >
            Organizing Committee
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mt-4 rounded-full" />
        </div>

        {/* 1. AP ASI LEADERSHIP */}
        <div className="mb-12 sm:mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-7 sm:h-8 bg-[#D4AF37] rounded-sm" />
              <h3
                className={`${modernFont.className} text-xl sm:text-2xl md:text-3xl font-bold text-[#111111] tracking-wide uppercase`}
              >
                AP ASI LEADERSHIP
              </h3>
            </div>
          </div>

          <MobileMemberStage members={AP_ASI_LEADERSHIP} tone="gold" />
          <DesktopCarousel members={AP_ASI_LEADERSHIP} tone="gold" keyPrefix="leadership" />
        </div>

        {/* 2. AP ASI LOCAL LEADERSHIP */}
        <div className="mb-8 sm:mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-7 sm:h-8 bg-[#187A83] rounded-sm" />
              <h3
                className={`${modernFont.className} text-xl sm:text-2xl md:text-3xl font-bold text-[#111111] tracking-wide uppercase`}
              >
                AP ASI LOCAL LEADERSHIP
              </h3>
            </div>
          </div>

          <MobileMemberStage members={AP_ASI_LOCAL_LEADERSHIP} tone="teal" />
          <DesktopCarousel members={AP_ASI_LOCAL_LEADERSHIP} tone="teal" keyPrefix="local-leadership" />
        </div>

        {/* Transition Bridge to Registration Section */}
      
      </motion.div>
    </section>
  );
}