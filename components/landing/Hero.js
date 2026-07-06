"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Globe, Layers, Smartphone, Server, BrainCircuit, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
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

const messages = ["Websites", "Web Apps", "Mobile Apps", "Backends", "APIs"];

const services = [
  {
    icon: Globe,
    title: 'Websites',
    desc: 'Fast, modern, and responsive websites built to represent your brand properly.',
  },
  {
    icon: Layers,
    title: 'Web Apps',
    desc: 'Full-featured web applications with clean architecture and scalable logic.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    desc: 'Cross-platform mobile apps for iOS and Android from a single codebase.',
  },
  {
    icon: Server,
    title: 'Backend & APIs',
    desc: 'Secure, well-structured backends and APIs that power your product end to end.',
  },
  {
    icon: BrainCircuit,
    title: 'AI Integration',
    desc: 'AI-powered features built with Supabase for data and Groq for fast, real-time inference.',
  },
];

const ChooseUs = [
  {
    id: 1,
    Heading: "75% AI Architects and Engineers.",
    Desc: "The experts of the experts, we know the complex systems that keep your business running."
  },

  {
    id: 2,
    Heading: "Enterprise-Class. Operationalized.",
    Desc: "We get your tech and how it connects — then we deliver together enterprise-quality reality.",
  },

  {
    id: 3,
    Heading: "Outcome-Based. Human First.",
    Desc: "You come first. We listen, we start with you, then we deliver aligned to your needs.",
  }
];

const Hero = () => {
  const [keywords, setKeywords] = useState(messages[0]);
  const indexRef = useRef(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % messages.length;
      setKeywords(messages[indexRef.current]);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const getLineColor = (id) => {
  if (id === 1) return 'bg-cyan-400';
  if (id === 2) return 'bg-sky-400';
  if (id === 3) return 'bg-teal-400';
  return 'bg-cyan-400';
};

  return (
    <section id='home' className={`${inter.className} relative pt-20 bg-slate-900 text-white overflow-hidden`}>
      <div className='pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl' />
      <div className='pointer-events-none absolute top-40 -right-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl' />

      <div className='relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 flex flex-col items-center text-center gap-8'>
        <span className='inline-flex items-center gap-2 border border-cyan-600/40 bg-cyan-600/10 text-cyan-400 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase'>
          <Sparkles size={14} />
         {keywords}
        </span>

        <h1 className={`${sora.className} font-extrabold tracking-tight text-4xl sm:text-5xl md:text-7xl leading-[1.1] max-w-4xl`}>
          We build software that
          <span className='text-cyan-400'> actually works.</span>
        </h1>

        <p className='text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed'>
          Butt Networks designs and ships websites, web apps, mobile apps, backends,
          and APIs for businesses that need reliable software, not just a demo.
        </p>

        <p className='text-slate-500 text-sm italic'>
          Founded and personally engineered end-to-end by Shahnawaz Saddam Butt.
        </p>

        <div className='flex flex-col sm:flex-row items-center gap-4 pt-2'>
          <Link
            href='#contact'
            className={`${sora.className} group inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold px-6 py-3 rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-cyan-600/30`}
          >
            Start a Project
            <ArrowRight size={16} className='transition-transform duration-200 group-hover:translate-x-1' />
          </Link>

          <Link
            href='#projects'
            className='inline-flex items-center gap-2 border border-slate-700 hover:border-cyan-600/60 text-slate-300 hover:text-cyan-400 text-sm font-semibold px-6 py-3 rounded-md transition-all duration-200'
          >
            View Our Work
          </Link>
        </div>

        <div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 border-t border-slate-800 mt-8'>
          <div className='flex flex-col items-center gap-1'>
            <span className={`${sora.className} text-2xl font-bold text-cyan-400`}>1</span>
            <span className='text-slate-400 text-sm'>Founder, Full Control</span>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <span className={`${sora.className} text-2xl font-bold text-cyan-400`}>5+</span>
            <span className='text-slate-400 text-sm'>Core Service Lines</span>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <span className={`${sora.className} text-2xl font-bold text-cyan-400`}>100%</span>
            <span className='text-slate-400 text-sm'>End-to-End Delivery</span>
          </div>
        </div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-24'>
        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className='!pb-2'
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <SwiperSlide key={service.title}>
                <div className='group bg-slate-800/40 border border-slate-800 hover:border-cyan-600/50 rounded-xl p-6 flex flex-col gap-4 h-full transition-all duration-300 hover:-translate-y-1'>
                  <div className='w-11 h-11 rounded-lg bg-cyan-600/10 border border-cyan-600/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-600/20 transition-colors duration-300'>
                    <Icon size={20} />
                  </div>
                  <h3 className={`${sora.className} text-white text-lg font-bold`}>{service.title}</h3>
                  <p className='text-slate-400 text-sm leading-relaxed'>{service.desc}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className='flex items-center justify-center gap-4 mt-8'>
          <button
            ref={prevRef}
            aria-label='Previous services'
            className='w-11 h-11 rounded-full border border-slate-700 hover:border-cyan-600/60 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all duration-200 hover:bg-cyan-600/10'
          >
            <ArrowLeft size={18} />
          </button>
          <button
            ref={nextRef}
            aria-label='Next services'
            className='w-11 h-11 rounded-full border border-slate-700 hover:border-cyan-600/60 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all duration-200 hover:bg-cyan-600/10'
          >
            <ArrowRight size={18} />
          </button>
        </div>

        <div className='pt-20'>
          <h1 className={`${sora.className} text-center font-extrabold text-[30px] sm:text-[45px]`}>
            Why <span className='text-cyan-400'>ButtNetworks</span>
          </h1>

          <div className='mt-12 flex flex-col sm:flex-row justify-center items-stretch gap-6'>
            {ChooseUs.map((item) => (
              <div
                key={item.Heading}
                className='w-full sm:w-1/3 flex flex-col gap-3 text-center'
              >
                <h3 className={`${sora.className} text-white text-lg font-bold`}>{item.Heading}</h3>
                <div className={`${getLineColor(item.id)} w-[200px] h-[2px] block m-auto`}></div>
                <p className='text-slate-400 text-sm leading-relaxed'>{item.Desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;