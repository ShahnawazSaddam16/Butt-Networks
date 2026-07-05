"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Award, TrendingUp, Users, BadgeCheck, Sparkles, Download } from 'lucide-react';
import { Sora, Inter } from 'next/font/google';

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

const stats = [
  { icon: Award, value: 40, suffix: '+', label: 'Projects Delivered' },
  { icon: Users, value: 98, suffix: '%', label: 'Client Satisfaction' },
  { icon: TrendingUp, value: 100, suffix: '%', label: 'On-Time Delivery' },
  { icon: BadgeCheck, value: 5, suffix: '+', label: 'Service Lines Mastered' },
];

// Eased count-up hook, only runs once the section scrolls into view
const useCountUp = (end, inView, duration = 1600) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime = null;
    let frame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration]);

  return value;
};

const StatCard = ({ stat, inView, delay }) => {
  const Icon = stat.icon;
  const count = useCountUp(stat.value, inView);

  return (
    <div
      className={`group bg-slate-800/40 border border-slate-800 hover:border-cyan-600/50 rounded-xl p-6 flex items-center gap-5 transition-all duration-700 ease-out hover:-translate-y-1 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className='w-12 h-12 shrink-0 rounded-lg bg-cyan-600/10 border border-cyan-600/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-600/20 transition-colors duration-300'>
        <Icon size={22} />
      </div>
      <div className='flex flex-col'>
        <span className={`${sora.className} text-3xl font-extrabold text-white`}>
          {count}
          {stat.suffix}
        </span>
        <span className='text-slate-400 text-sm'>{stat.label}</span>
      </div>
    </div>
  );
};

const Achievements = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id='achievements'
      ref={sectionRef}
      className={`${inter.className} relative bg-slate-900 text-white overflow-hidden py-24`}
    >
      <div className='pointer-events-none absolute -top-32 -right-32 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl' />
      <div className='pointer-events-none absolute bottom-0 -left-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl' />

      <div className='relative z-10 max-w-7xl mx-auto px-6 lg:px-10'>
        <div
          className={`flex flex-col items-center text-center gap-4 mb-16 transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className='inline-flex items-center gap-2 border border-cyan-600/40 bg-cyan-600/10 text-cyan-400 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase'>
            <Sparkles size={14} />
            Achievements
          </span>

          <h2 className={`${sora.className} font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl leading-tight max-w-2xl`}>
            Numbers that <span className='text-cyan-400'>back the work.</span>
          </h2>

          <p className='text-slate-400 text-base max-w-xl leading-relaxed'>
            Every project ships end-to-end, personally engineered, and backed by
            real client outcomes, not vanity metrics.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left: stats */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} inView={inView} delay={i * 120} />
            ))}
          </div>

          {/* Right: certificate */}
          <div
            className={`flex justify-center transition-all duration-1000 ease-out ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className='relative group w-full max-w-md'>
              <div className='absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-600/40 via-cyan-600/0 to-cyan-600/40 blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500' />

              <div className='relative bg-slate-800/40 border border-slate-800 group-hover:border-cyan-600/50 rounded-2xl p-4 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:[transform:perspective(1000px)_rotateX(2deg)_rotateY(-2deg)]'>
                <div className='absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-500/60 rounded-tl-md' />
                <div className='absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-500/60 rounded-tr-md' />
                <div className='absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-cyan-500/60 rounded-bl-md' />
                <div className='absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-500/60 rounded-br-md' />

                <img
                  src='/certificate.jpeg'
                  alt='Certificate awarded to Shahnawaz Saddam Butt'
                  className='w-full h-auto rounded-lg object-cover'
                />
              </div>

              <p className='text-slate-500 text-xs italic text-center mt-4'>
                Certified &amp; personally earned by Shahnawaz Saddam Butt.
              </p>

                <a href='/certificate.jpeg' download="/certificate.jpeg">
              <button className='mt-2 block m-auto bg-slate-800/40 border-slate-800
                border px-6 py-1 hover:border-cyan-600'><Download /></button>
                </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;