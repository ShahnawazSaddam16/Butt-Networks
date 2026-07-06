'use client';

import React, { useRef, useState } from 'react';
import { Inter } from 'next/font/google';
import {
  Sparkles,
  Gauge,
  SearchX,
  MousePointerClick,
  LayoutDashboard,
  ShieldAlert,
  Server,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const problems = [
  {
    icon: Gauge,
    title: 'Slow Load Times',
    description:
      'Pages that drag past three seconds lose visitors before they ever see your product. We profile, trim, and rebuild until load feels instant.',
  },
  {
    icon: SearchX,
    title: 'Invisible on Search',
    description:
      "Great sites still lose customers if Google can't find them. We fix technical SEO issues so you rank for the searches that matter.",
  },
  {
    icon: MousePointerClick,
    title: 'Low Conversions',
    description:
      'Traffic without action is a leaky funnel. We rework flows, copy, and friction points so more visitors turn into customers.',
  },
  {
    icon: LayoutDashboard,
    title: 'Clunky UX',
    description:
      'Confusing navigation and inconsistent layouts erode trust fast. We simplify interfaces until using your product feels obvious.',
  },
  {
    icon: ShieldAlert,
    title: 'Security Gaps',
    description:
      'Outdated dependencies and loose configs are an open door. We audit, patch, and harden your stack before it becomes a headline.',
  },
  {
    icon: Server,
    title: 'Scaling Issues',
    description:
      "What works for a hundred users can buckle at ten thousand. We re-architect systems so growth doesn't break production.",
  },
];

const WhatWeFix = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavState = (swiper) => {
    setActiveIndex(swiper.activeIndex);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <>
      <section id="home" className={`${inter.className} relative pt-20 bg-slate-900 text-white overflow-hidden pb-10`}>
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-40 -right-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />

        {/* Header */}
        <header className="flex justify-center items-center mx-auto bg-cyan-600/10 w-45 h-9 border border-cyan-600/40 hover:border-cyan-600 text-cyan-400 rounded-[10px] gap-2 animate-[fadeInUp_0.6s_ease_forwards] opacity-0 transition-colors duration-300">
          <Sparkles className="w-4 h-4" />
          <h1 className="font-semibold text-[16px]">WHAT WE FIX</h1>
        </header>

        {/* Main Section */}
        <div className="relative mt-14 flex flex-col lg:flex-row justify-center lg:justify-between items-start gap-12 max-w-7xl mx-auto px-6 sm:px-10">
          {/* Left: tagline + heading + subtext */}
          <div className="w-full lg:w-[38%] lg:sticky lg:top-28">
            <span className="inline-block text-cyan-400 text-[13px] font-semibold tracking-[0.2em] uppercase animate-[fadeInUp_0.6s_ease_forwards] opacity-0">
              Every stack has a weak point
            </span>

            <h2 className="mt-4 font-extrabold text-[30px] sm:text-[40px] leading-tight animate-[fadeInUp_0.7s_ease_forwards] opacity-0 [animation-delay:0.1s]">
              Problems <span className="text-cyan-400">We Fix</span>
            </h2>
            <p className="mt-5 text-slate-400 text-[16px] sm:text-[17px] leading-relaxed max-w-md animate-[fadeInUp_0.7s_ease_forwards] opacity-0 [animation-delay:0.25s]">
              Every product accumulates friction over time: slow pages, confusing flows, brittle infrastructure. We
              find the issues quietly costing you customers and rebuild them properly, so growth never runs into a
              wall you didn&apos;t know was there.
            </p>

            <div className="mt-8 flex items-center gap-3 animate-[fadeInUp_0.7s_ease_forwards] opacity-0 [animation-delay:0.4s]">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={isBeginning}
                aria-label="Previous problem"
                className="w-11 h-11 flex items-center justify-center rounded-full border border-cyan-600/40 text-cyan-400 transition-all duration-300 ease-out hover:border-cyan-600 hover:bg-cyan-600/10 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none disabled:hover:scale-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                disabled={isEnd}
                aria-label="Next problem"
                className="w-11 h-11 flex items-center justify-center rounded-full border border-cyan-600/40 text-cyan-400 transition-all duration-300 ease-out hover:border-cyan-600 hover:bg-cyan-600/10 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none disabled:hover:scale-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="ml-2 text-sm text-slate-500">
                {String(activeIndex + 1).padStart(2, '0')} / {String(problems.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right: single swiper card */}
          <div className="w-full lg:w-[58%] overflow-hidden">
            <Swiper
              modules={[Navigation, Pagination]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                updateNavState(swiper);
              }}
              onSlideChange={updateNavState}
              slidesPerView={1}
              spaceBetween={20}
              speed={600}
              autoplay={false}
              pagination={{ clickable: true, el: '.wwf-pagination' }}
              className="!pb-2 !overflow-hidden"
            >
              {problems.map(({ icon: Icon, title, description }, index) => (
                <SwiperSlide key={title} className="h-auto">
                  <div
                    style={{ animationDelay: `${0.15 * index}s` }}
                    className="h-full flex flex-col bg-slate-800/60 border border-slate-700 rounded-2xl p-6 sm:p-8 opacity-0 animate-[fadeInUp_0.7s_ease_forwards] transition-all duration-300 ease-out hover:border-cyan-600/60 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-950/40"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-cyan-600/10 border border-cyan-600/40 text-cyan-400 mb-5 transition-transform duration-300 ease-out group-hover:scale-110">
                      <Icon className="w-6 h-6 transition-transform duration-300 ease-out" />
                    </div>
                    <h3 className="font-semibold text-[19px] mb-2">{title}</h3>
                    <p className="text-slate-400 text-[15px] leading-relaxed">{description}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="wwf-pagination flex justify-center gap-2 mt-6" />
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .wwf-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(148, 163, 184, 0.4);
          opacity: 1;
          border-radius: 9999px;
          transition: all 0.25s ease;
        }
        .wwf-pagination .swiper-pagination-bullet-active {
          background: #22d3ee;
          width: 22px;
        }
      `}</style>
    </>
  );
};

export default WhatWeFix;