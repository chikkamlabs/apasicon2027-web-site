'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { User, ChevronDown } from 'lucide-react';

interface Member {
  name: string;
  designation: string;
  image?: string;
}

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
      className="relative overflow-hidden bg-white py-14 sm:py-20 lg:py-24"
    >
      {/* Scroll Transition Container: expands from small down to full screen on scroll from JoinSection */}
      <motion.div
        initial={{ scale: 0.88, y: 75, opacity: 0.6 }}
        whileInView={{ scale: 1, y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-full"
      >
        {/* Main Section Heading */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111]">
            Organizing Committee
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mt-4 rounded-full" />
        </div>

        {/* 1. AP ASI LEADERSHIP: Written directly on screen (not inside containers) */}
        <div className="mb-12 sm:mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-7 sm:h-8 bg-[#D4AF37] rounded-sm" />
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#111111] tracking-wide uppercase">
                AP ASI LEADERSHIP
              </h3>
            </div>
          </div>

          {/* Carousel: Images and cards flow freely across full screen without stopping at a container */}
          <div className="relative w-full overflow-hidden py-4">
            <div className="animate-committee-scroll">
              {[...AP_ASI_LEADERSHIP, ...AP_ASI_LEADERSHIP].map((member, index) => {
                const isEven = (index % AP_ASI_LEADERSHIP.length + 1) % 2 === 0;

                return (
                  <div
                    key={`leadership-${index}`}
                    className={`flex flex-col items-center mx-3 sm:mx-5 shrink-0 transition-transform duration-300 w-52 sm:w-60 md:w-64 ${
                      isEven ? '-translate-y-3 mt-0' : 'translate-y-0 mt-3'
                    }`}
                  >
                    {/* Big Profile Card Image with Gold Border */}
                    <div className="relative w-48 sm:w-56 md:w-60 h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-100 to-amber-50/40 border-4 border-[#D4AF37] shadow-[0_8px_24px_rgba(212,175,55,0.22)] group/photo cursor-default">
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
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 border-amber-300/80 shadow-md flex items-center justify-center text-[#187A83] group-hover/photo:text-[#D4AF37] transition-colors">
                            <User className="w-10 h-10 sm:w-12 sm:h-12" />
                          </div>
                          <span className="text-[11px] sm:text-xs font-black text-amber-700/80 tracking-widest uppercase mt-4">
                            Faculty
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Big Profile Card Text */}
                    <div className="mt-3.5 text-center w-full px-2">
                      <p className="text-sm sm:text-base md:text-lg font-black text-[#111111] leading-snug">
                        {member.name}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-zinc-600 mt-1">
                        {member.designation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. AP ASI LOCAL LEADERSHIP: Written directly on screen (not inside containers) */}
        <div className="mb-8 sm:mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-7 sm:h-8 bg-[#187A83] rounded-sm" />
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#111111] tracking-wide uppercase">
                AP ASI LOCAL LEADERSHIP
              </h3>
            </div>
          </div>

          {/* Carousel: Images and cards flow freely across full screen without stopping at a container */}
          <div className="relative w-full overflow-hidden py-4">
            <div className="animate-committee-scroll">
              {[...AP_ASI_LOCAL_LEADERSHIP, ...AP_ASI_LOCAL_LEADERSHIP].map(
                (member, index) => {
                  const isEven = (index % AP_ASI_LOCAL_LEADERSHIP.length + 1) % 2 === 0;

                  return (
                    <div
                      key={`local-leadership-${index}`}
                      className={`flex flex-col items-center mx-3 sm:mx-5 shrink-0 transition-transform duration-300 w-52 sm:w-60 md:w-64 ${
                        isEven ? '-translate-y-3 mt-0' : 'translate-y-0 mt-3'
                      }`}
                    >
                      {/* Big Profile Card Image with Godavari Teal Border */}
                      <div className="relative w-48 sm:w-56 md:w-60 h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-100 to-teal-50/40 border-4 border-[#187A83] shadow-[0_8px_24px_rgba(24,122,131,0.22)] group/photo cursor-default">
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
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 border-teal-300/80 shadow-md flex items-center justify-center text-[#187A83] group-hover/photo:text-[#D4AF37] transition-colors">
                              <User className="w-10 h-10 sm:w-12 sm:h-12" />
                            </div>
                            <span className="text-[11px] sm:text-xs font-black text-teal-800/80 tracking-widest uppercase mt-4">
                              Organizing Team
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Big Profile Card Text */}
                      <div className="mt-3.5 text-center w-full px-2">
                        <p className="text-sm sm:text-base md:text-lg font-black text-[#111111] leading-snug">
                          {member.name}
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-zinc-600 mt-1">
                          {member.designation}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* Transition Bridge to Registration Section */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center">
          <motion.button
            onClick={scrollToRegistration}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, 5, 0] }}
            transition={{
              y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: 0.2 },
            }}
            className="flex items-center gap-2 bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-[#187A83] text-[#111111] px-4 py-1.5 rounded-full shadow-sm text-xs sm:text-sm font-bold cursor-pointer group transition-all"
            title="View Registration Tariffs"
          >
            <span>View Registration Tariffs</span>
            <ChevronDown className="w-4 h-4 text-[#187A83] group-hover:translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
