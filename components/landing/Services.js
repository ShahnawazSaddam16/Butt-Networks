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
  Rocket,
  ShoppingCart,
  Briefcase,
  Layers,
  Bell,
  Store,
  ShieldCheck,
  Database,
  Cloud,
  Bot,
  Workflow,
  TrendingUp,
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

const categories = [
  {
    name: 'Web',
    icon: Globe,
    items: [
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
        icon: Rocket,
        title: 'Landing Pages',
        desc: 'High-converting, SEO-friendly landing pages that load instantly and look sharp.',
      },
      {
        icon: ShoppingCart,
        title: 'E-commerce',
        desc: 'Online stores with secure checkout, product management, and smooth user journeys.',
      },
      {
        icon: Briefcase,
        title: 'Portfolio Sites',
        desc: 'Personal and business portfolios that showcase your work with a polished identity.',
      },
    ],
  },
  {
    name: 'Mobile',
    icon: Smartphone,
    items: [
      {
        icon: Smartphone,
        title: 'Mobile Apps',
        desc: 'Cross-platform mobile apps with smooth performance and native-like feel.',
      },
      {
        icon: Layers,
        title: 'Cross-Platform',
        desc: 'One codebase shipping to both iOS and Android without compromising quality.',
      },
      {
        icon: Bell,
        title: 'Push Notifications',
        desc: 'Real-time notification systems that keep your users engaged and informed.',
      },
      {
        icon: Store,
        title: 'Store Release',
        desc: 'Build, sign, and publish your app to the Play Store and App Store.',
      },
    ],
  },
  {
    name: 'Backend',
    icon: Server,
    items: [
      {
        icon: Server,
        title: 'Backend & APIs',
        desc: 'Robust backend systems and RESTful APIs built for performance and reliability.',
      },
      {
        icon: ShieldCheck,
        title: 'Authentication',
        desc: 'Secure login, sessions, and role-based access using proven, modern practices.',
      },
      {
        icon: Database,
        title: 'Database Design',
        desc: 'Well-structured schemas and queries on SQL or NoSQL that stay fast as data grows.',
      },
      {
        icon: Cloud,
        title: 'Cloud & VPS',
        desc: 'Deployment, hosting, and server setup with full control over your environment.',
      },
    ],
  },
  {
    name: 'AI',
    icon: BrainCircuit,
    items: [
      {
        icon: BrainCircuit,
        title: 'AI Integration',
        desc: 'Seamless integration of AI models and intelligent features into your products.',
      },
      {
        icon: Bot,
        title: 'AI Chatbots',
        desc: 'Conversational assistants trained around your product, data, and customers.',
      },
      {
        icon: Workflow,
        title: 'Automation',
        desc: 'Smart workflows that remove repetitive tasks and save your team hours every week.',
      },
    ],
  },
  {
    name: 'Architecture',
    icon: Network,
    items: [
      {
        icon: Network,
        title: 'System Design',
        desc: 'Scalable, well-architected systems designed to grow with your business.',
      },
      {
        icon: TrendingUp,
        title: 'Scalability',
        desc: 'Performance tuning and structure that keeps your product stable under heavy traffic.',
      },
    ],
  },
];

const Services = () => {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = categories[active];

  return (
    <>
      <section
        className={`${inter.className} relative pt-20 pb-10 bg-slate-900 text-white overflow-hidden`}
      id='services'>
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

        <div className="mt-10 px-6 flex flex-wrap items-center justify-center gap-3">
          {categories.map(({ name, icon: TabIcon }, i) => {
            const isActive = i === active;
            return (
              <button
                key={name}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-cyan-600 border-cyan-500 text-white shadow-lg shadow-cyan-600/30'
                    : 'bg-slate-800/40 border-slate-700 text-slate-300 hover:border-cyan-600/60 hover:text-cyan-400'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {name}
              </button>
            );
          })}
        </div>

        <div
          className={`relative mt-10 px-6 md:px-12 pb-10 transition-all duration-700 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Swiper
            key={current.name}
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
            className="pt-2 pb-4"
          >
            {current.items.map(({ icon: Icon, title, desc }, i) => (
              <SwiperSlide key={`${current.name}-${i}`}>
                <div className="group relative bg-slate-800/40 border border-cyan-600/20 rounded-2xl p-6 h-56 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/50  hover:shadow-[0_0_30px_rgba(8,145,178,0.15)]">
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