'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'motion/react';
import { MapPin, RotateCw, Compass, Sparkles } from 'lucide-react';

interface CityPlace {
  id: string;
  name: string;
  tagline: string;
  description: string;
  distance: string;
  travelTime: string;
  image: string;
  category: string;
}

const PLACES_DATA: CityPlace[] = [
  {
    id: 'godavari',
    name: 'Godavari River & Hills',
    tagline: 'Iconic Bridges, Godavari & Hills',
    description:
      'The sacred lifeline of the city, renowned for picturesque river cruises, the historic Havelock Bridge, the majestic Godavari Arch Bridge, and the mesmerizing evening Godavari Harathi.',
    distance: '12 km from GSL',
    travelTime: 'approx. 20 mins',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    category: 'Riverfront & Heritage',
  },
  {
    id: 'pushkar-vanam',
    name: 'Pushkar Vanam & Ghat',
    tagline: 'Lush Green Riverside Promenade',
    description:
      'A peaceful botanical river park and historic bathing ghat on the banks of Godavari, featuring manicured floral avenues, walking tracks, and magnificent river sunset vistas.',
    distance: '14 km from GSL',
    travelTime: 'approx. 25 mins',
    image:
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    category: 'Nature & Botanical',
  },
  {
    id: 'maredumilli',
    name: 'Maredumilli Eco-Tourism',
    tagline: 'Misty Rainforests & Waterfalls',
    description:
      'A scenic hill retreat in the Eastern Ghats famous for lush semi-evergreen jungles, cascading waterfalls (Amritadhara & Jalatarangini), tribal bamboo chicken delicacies, and eco-trails.',
    distance: '85 km from GSL',
    travelTime: 'approx. 1 hr 50 mins',
    image:
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
    category: 'Eco-Tourism & Hills',
  },
  {
    id: 'kadiyam',
    name: 'Kadiyam Nurseries',
    tagline: 'Asia’s Floral & Horticulture Capital',
    description:
      'Spanning thousands of acres, this global horticulture wonderland features millions of exotic plants, vibrant ornamental blooms, bonsai collections, and export nurseries.',
    distance: '22 km from GSL',
    travelTime: 'approx. 30 mins',
    image:
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    category: 'Floral & Botanical',
  },
  // {
  //   id: 'dowleswaram',
  //   name: 'Dowleswaram Barrage & Museum',
  //   tagline: 'Historic Engineering Marvel',
  //   description:
  //     'Built across the Akhanda Godavari with 175 crest gates, this colossal barrage features panoramic river vistas and the Sir Arthur Cotton Museum celebrating agricultural engineering heritage.',
  //   distance: '18 km from GSL',
  //   travelTime: 'approx. 25 mins',
  //   image:
  //     'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
  //   category: 'Architecture & History',
  // },
  // {
  //   id: 'iskcon',
  //   name: 'ISKCON Temple (Gowthami Ghat)',
  //   tagline: 'Sacred Riverside Spiritual Haven',
  //   description:
  //     'One of the largest ISKCON centres in South India, situated directly along Gowthami Ghat with sculpted domes, serene meditation halls, and tranquil riverside gardens.',
  //   distance: '13 km from GSL',
  //   travelTime: 'approx. 20 mins',
  //   image:
  //     'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
  //   category: 'Spiritual & Culture',
  // },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function ExploreCity() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="explore-city"
      className="relative overflow-hidden bg-[#F7F7F5] py-16 sm:py-20 lg:py-24 border-b border-zinc-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#187A83] text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Delegate Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111]">
            Explore Rajamahendravaram
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sm sm:text-base font-medium text-zinc-600 max-w-2xl mx-auto">
            Discover renowned attractions, scenic ghats, and natural getaways near GSL Medical College.
          </p>
        </motion.div>

        {/* 6 Interactive 3D Flip Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {PLACES_DATA.map((place) => {
            const isFlipped = !!flippedCards[place.id];

            return (
              <motion.div
                key={place.id}
                variants={cardItemVariants}
                className="group perspective-1000 cursor-pointer"
                onClick={() => toggleFlip(place.id)}
              >
                {/* Flippable Container */}
                <div
                  className={`relative w-full h-[370px] sm:h-[390px] rounded-3xl transition-transform duration-700 transform-style-3d shadow-md hover:shadow-2xl ${
                    isFlipped ? 'rotate-y-180' : 'group-hover:rotate-y-180'
                  }`}
                >
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden backface-hidden border border-zinc-200/90 bg-zinc-900 flex flex-col justify-between">
                    {/* Background Area Photo */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={place.image}
                        alt={place.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        referrerPolicy="no-referrer"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Gradient overlay for text contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30" />
                    </div>

                    {/* Top Badges */}
                    <div className="relative z-10 p-5 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/40 text-[11px] font-bold uppercase tracking-wider">
                        {place.category}
                      </span>
                      <div className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-zinc-950 text-xs font-bold shadow-xs flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#187A83]" />
                        <span>{place.distance}</span>
                      </div>
                    </div>

                    {/* Bottom Info on Front */}
                    <div className="relative z-10 p-6 space-y-2">
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
                        {place.name}
                      </h3>
                      <p className="text-xs font-medium text-zinc-300">
                        {place.tagline}
                      </p>
                      <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#D4AF37]">
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Hover to view details</span>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE (Revealed on Flip) */}
                  <div className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-7 rotate-y-180 backface-hidden bg-gradient-to-br from-zinc-950 via-[#0d2a2f] to-zinc-900 text-white border-2 border-[#D4AF37]/70 flex flex-col justify-between shadow-2xl">
                    <div className="space-y-4">
                      {/* Category & Flip hint */}
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{place.category}</span>
                        </div>
                        <span className="text-[11px] text-zinc-400 font-medium">
                          {place.travelTime}
                        </span>
                      </div>

                      {/* Name on Back */}
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {place.name}
                      </h3>

                      {/* Small Description */}
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                        {place.description}
                      </p>
                    </div>

                    {/* Bottom Distance & Location Bar */}
                    <div className="pt-4 border-t border-zinc-800 space-y-2.5">
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
                        <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <div className="flex-1 text-xs">
                          <span className="text-zinc-400 block">Distance from GSL</span>
                          <span className="text-white font-bold">{place.distance}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-400">
                        <RotateCw className="w-3 h-3" />
                        <span>Move away or tap to flip back</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
