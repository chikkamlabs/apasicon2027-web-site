'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { MapPin, ShieldCheck, Wifi, ExternalLink } from 'lucide-react';

export default function VenueSection() {
  const venueFeatures = [
    {
      title: 'Strategic Location',
      description: 'Easily accessible via NH16, 15 minutes from Rajahmundry Airport.',
      icon: MapPin,
    },
    {
      title: 'Safety & Protocol',
      description: 'Full compliance with international health and safety standards for large gatherings.',
      icon: ShieldCheck,
    },
    {
      title: 'Advanced Facilities',
      description: 'High-speed Wi-Fi, 4K digital projection, and simultaneous interpretation booths.',
      icon: Wifi,
    },
  ];

  return (
    <section
      id="venue"
      className="relative overflow-hidden bg-white py-10 sm:py-14 md:py-18 lg:py-22 border-b border-zinc-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid: Left (Venue Content) and Right (gsl1.png + Maps Loc Map UI) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Side: Heading, Paragraph, and 3 Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-5"
          >
            {/* Heading - Decreased size on mobile */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] leading-tight">
                The Venue: GSL Medical College
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-[#D4AF37] mt-3 sm:mt-4 rounded-full" />
            </div>

            {/* Introductory Description - Compact responsive text */}
            <p className="text-xs sm:text-sm md:text-base text-zinc-700 leading-relaxed font-normal">
              A premier institutional landmark in Rajahmundry, GSL Medical College offers state-of-the-art auditoriums, specialized simulation labs, and ample exhibition spaces for medical tech partners.
            </p>

            {/* 3 Venue Feature Points - Scaled down for mobile */}
            <div className="pt-1 space-y-3 sm:space-y-3.5">
              {venueFeatures.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-[#187A83]/50 transition-all duration-300"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white border border-zinc-200 shadow-2xs flex items-center justify-center shrink-0 text-[#187A83]">
                      <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#111111] tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-0.5 text-[11px] sm:text-xs md:text-sm text-zinc-600 leading-relaxed font-normal">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Side: Image (public/gsl1.png) and below it maps Loc map ui */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-5 flex flex-col space-y-4 sm:space-y-5"
          >
            {/* Image: public/gsl1.png */}
            <div className="relative w-full aspect-[623/335] rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-zinc-100">
              <Image
                src="/gsl1.png"
                alt="The Venue: GSL Medical College"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </div>

            {/* Maps Loc Map UI - Responsive height and compact mobile bar */}
            <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-white">
              <div className="relative w-full h-44 sm:h-52 md:h-60 bg-zinc-100">
                <iframe
                  src="https://www.google.com/maps?q=GSL+Medical+College+and+General+Hospital+Rajahmundry&output=embed"
                  title="GSL Medical College Location Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
              <div className="p-3 sm:p-3.5 bg-white flex items-center justify-between gap-2.5 border-t border-zinc-100">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#187A83] shrink-0" />
                  <span className="text-[11px] sm:text-xs font-semibold text-zinc-800 truncate">
                    GSL Medical College, Rajahmundry (NH16)
                  </span>
                </div>
                <a
                  href="https://maps.app.goo.gl/AxAMBqb4V6xjFYXa7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#187A83] hover:bg-[#136067] text-white text-[11px] sm:text-xs font-bold transition-colors shrink-0 shadow-2xs"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Below the left and right corner: Put image (public/gsl2.png) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 }}
          className="mt-8 sm:mt-12 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-zinc-100"
        >
          <div className="relative w-full aspect-[556/246]">
            <Image
              src="/gsl2.png"
              alt="GSL Medical College Campus Overview"
              fill
              sizes="100vw"
              referrerPolicy="no-referrer"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
