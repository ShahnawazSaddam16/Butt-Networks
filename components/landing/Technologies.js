"use client";

import React, { useEffect, useRef, useState } from 'react';
import {
  SiNextdotjs,
  SiSupabase,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiNodedotjs,
  SiVercel,
  SiJavascript,
  SiMongodb,
} from 'react-icons/si';
import { Zap, Server, ArrowLeft, ArrowRight } from 'lucide-react';
import { Sora, Inter } from 'next/font/google';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const technologies = [
  {
    icon: SiNextdotjs,
    name: 'Next.js',
    desc: 'The framework behind every project we ship, giving us fast, SEO-friendly, full-stack React apps.',
  },
  {
    icon: SiSupabase,
    name: 'Supabase',
    desc: 'Our backend of choice, handling the database, authentication, and storage in one managed platform.',
  },
  {
    icon: Zap,
    name: 'Groq',
    desc: 'Ultra-low-latency AI inference, so the AI features we build feel instant instead of laggy.',
  },
  {
    icon: SiJavascript,
    name: 'JavaScript',
    desc: 'Type-safe code across the stack, catching bugs before they ever reach production.',
  },
  {
    icon: SiTailwindcss,
    name: 'Tailwind CSS',
    desc: 'How we design and ship clean, responsive interfaces without slowing development down.',
  },
  {
    icon: SiPostgresql,
    name: 'PostgreSQL',
    desc: 'The relational database under Supabase, powering the data layer for every product.',
  },
  {
    icon: SiNodedotjs,
    name: 'Node.js',
    desc: 'Custom backend services and APIs whenever a project needs more than a managed platform.',
  },
  {
    icon: SiVercel,
    name: 'Vercel',
    desc: 'Where our frontend projects get deployed and served, built for instant global delivery.',
  },
  {
    icon: SiMongodb,
    name: 'MongoDB',
    desc: 'A flexible NoSQL database we reach for when a project needs schema-less, document-based data.',
  },
  {
    icon: Server,
    name: 'VPS Hosting',
    desc: 'Self-managed VPS hosting for projects that need full control over the server and environment.',
  },
];

const Technologies = () => {
  const [mounted, setMounted] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id='technologies' className={`${inter.className} relative bg-slate-900 text-white py-24 overflow-hidden`}>
      <div className='pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-cyan-600/10 rounded-full blur-3xl' />

      <div className='relative z-10 max-w-7xl mx-auto px-6 lg:px-10'>
        <div className='flex flex-col items-center text-center gap-5 mb-16'>
          <span className='inline-flex items-center gap-2 border border-cyan-600/40 bg-cyan-600/10 text-cyan-400 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase'>
            Our Stack
          </span>

          <h2 className={`${sora.className} font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl max-w-3xl`}>
            Built on tools we trust,
            <span className='text-cyan-400'> not trends we chase.</span>
          </h2>

          <p className='text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed'>
            Every project runs on Next.js for the frontend, Supabase for the backend and data layer,
            and Groq when a product needs real-time AI. It is a stack chosen for speed, reliability,
            and how fast one founder can move without cutting corners.
          </p>
        </div>

        <div
          className={`transition-all duration-700 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Swiper
            modules={[Navigation]}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            spaceBetween={20}
            slidesPerView={1.3}
            breakpoints={{
              480: { slidesPerView: 2.2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            className='!pb-2 items-stretch'
          >
            {technologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <SwiperSlide key={tech.name} className='h-auto'>
                  <div className='group relative bg-slate-800/40 border border-slate-800 hover:border-cyan-600/60 rounded-xl p-6 flex flex-col items-center text-center gap-4 h-60 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-600/10'>
                    <div className='w-14 h-14 rounded-xl bg-cyan-600/10 border border-cyan-600/30 flex items-center justify-center text-cyan-400 transition-all duration-500 group-hover:bg-cyan-600/20 group-hover:rotate-6 group-hover:scale-110'>
                      <Icon size={26} />
                    </div>

                    <h3 className={`${sora.className} text-white text-base font-bold`}>{tech.name}</h3>

                    <p className='text-slate-400 text-xs leading-relaxed'>{tech.desc}</p>

                    <div className='pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-cyan-600/10 via-transparent to-transparent' />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className='flex items-center justify-center gap-4 mt-10'>
            <button
              ref={prevRef}
              aria-label='Previous technologies'
              className='w-11 h-11 rounded-full border border-slate-700 hover:border-cyan-600/60 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all duration-200 hover:bg-cyan-600/10'
            >
              <ArrowLeft size={18} />
            </button>
            <button
              ref={nextRef}
              aria-label='Next technologies'
              className='w-11 h-11 rounded-full border border-slate-700 hover:border-cyan-600/60 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all duration-200 hover:bg-cyan-600/10'
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;