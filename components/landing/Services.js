'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Inter } from 'next/font/google';
import {
  Sparkles,
  Globe,
  LayoutTemplate,
  Server,
  BrainCircuit,
  Network,
  Smartphone,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    desc: 'Fast, responsive websites built with modern frameworks and clean, maintainable code.',
  },
  {
    icon: LayoutTemplate,
    title: 'Web Apps',
    desc: 'Interactive, scalable web applications tailored to your business workflows.',
  },
  {
    icon: Server,
    title: 'Backend & APIs',
    desc: 'Robust backend systems and RESTful APIs built for performance and reliability.',
  },
  {
    icon: BrainCircuit,
    title: 'AI Integration',
    desc: 'Seamless integration of AI models and intelligent features into your products.',
  },
  {
    icon: Network,
    title: 'System Design',
    desc: 'Scalable, well-architected systems designed to grow with your business.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    desc: 'Cross-platform mobile apps with smooth performance and native-like feel.',
  },
];

const Services = () => {
  const [mounted, setMounted] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <section
        className={`${inter.className} relative pt-20 pb-10 bg-slate-900 text-white overflow-hidden`}
      >
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-40 -right-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />

        <header className="flex justify-center items-center bg-cyan-600/10 border border-cyan-600/40 w-40 h-8 mx-auto gap-2 text-cyan-400 rounded-[10px] hover:border-cyan-400/40 transition-colors duration-300">
          <Sparkles className="w-4 h-4" />
          <h1 className="text-[16px]">SERVICES</h1>
        </header>

        <h2 className="text-center text-3xl md:text-4xl font-semibold mt-6">
          What I Build
        </h2>
        <p className="text-center text-slate-400 mt-3 max-w-xl mx-auto px-4">
          End-to-end solutions across web, mobile, and backend, powered by clean architecture and modern tooling.
        </p>

        <div
          className={`relative mt-14 px-6 md:px-12 pb-10 transition-all duration-700 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="pb-4"
          >
            {services.map(({ icon: Icon, title, desc }, i) => (
              <SwiperSlide key={i}>
                <div className="group relative bg-slate-800/40 border border-cyan-600/20 rounded-2xl p-6 h-56 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(8,145,178,0.15)]">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-600/10 border border-cyan-600/30 text-cyan-400 transition-all duration-300 group-hover:bg-cyan-600/20 group-hover:border-cyan-400/50 group-hover:scale-110">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">{title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              ref={prevRef}
              aria-label="Previous services"
              className="w-11 h-11 rounded-full border border-slate-700 hover:border-cyan-600/60 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all duration-200 hover:bg-cyan-600/10"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              ref={nextRef}
              aria-label="Next services"
              className="w-11 h-11 rounded-full border border-slate-700 hover:border-cyan-600/60 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all duration-200 hover:bg-cyan-600/10"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;