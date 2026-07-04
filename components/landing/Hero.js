import React from 'react';
import Link from 'next/link';
import { Globe, Layers, Smartphone, Server, ArrowRight, Sparkles } from 'lucide-react';
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
];

const Hero = () => {
  return (
    <section id='home' className={`${inter.className} relative pt-20 bg-slate-900 text-white overflow-hidden`}>
      <div className='pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl' />
      <div className='pointer-events-none absolute top-40 -right-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl' />

      <div className='relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 flex flex-col items-center text-center gap-8'>
        <span className='inline-flex items-center gap-2 border border-cyan-600/40 bg-cyan-600/10 text-cyan-400 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase'>
          <Sparkles size={14} />
          Websites · Web Apps · Mobile Apps · Backends · APIs
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
            <span className={`${sora.className} text-2xl font-bold text-cyan-400`}>4+</span>
            <span className='text-slate-400 text-sm'>Core Service Lines</span>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <span className={`${sora.className} text-2xl font-bold text-cyan-400`}>100%</span>
            <span className='text-slate-400 text-sm'>End-to-End Delivery</span>
          </div>
        </div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-24'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className='group bg-slate-800/40 border border-slate-800 hover:border-cyan-600/50 rounded-xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1'
              >
                <div className='w-11 h-11 rounded-lg bg-cyan-600/10 border border-cyan-600/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-600/20 transition-colors duration-300'>
                  <Icon size={20} />
                </div>
                <h3 className={`${sora.className} text-white text-lg font-bold`}>{service.title}</h3>
                <p className='text-slate-400 text-sm leading-relaxed'>{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;