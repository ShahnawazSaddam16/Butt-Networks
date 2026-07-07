import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
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

const whatsappNumber = '923004907243';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '/#services' },
  { name: 'Contact', href: '/contact' },
];

const Footer = () => {
  return (
    <footer className={`${inter.className} bg-slate-900 border-t border-slate-800 text-slate-300`}>
      <div className='max-w-7xl mx-auto px-6 lg:px-10 py-14'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
          <div>
            <span className={`${sora.className} text-white text-xl font-extrabold tracking-wide`}>
              Butt Networks
            </span>
            <p className='mt-4 text-sm text-slate-400 max-w-xs leading-relaxed'>
              We design and build scalable web and mobile products that empower businesses and users.
            </p>

            <div className='mt-6 flex items-center gap-4'>
              <a
                href='https://instagram.com/buttnetworks'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:scale-110 transition-all duration-200'
              >
                <FaInstagram size={18} />
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:scale-110 transition-all duration-200'
              >
                <FaWhatsapp size={18} />
              </a>

              <a
                href='mailto:hello@buttnetworks.dev'
                className='w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:scale-110 transition-all duration-200'
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className={`${sora.className} text-white text-sm font-bold uppercase tracking-wider`}>
              Quick Links
            </h4>
            <div className='mt-5 flex flex-col gap-3'>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className='text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200 w-fit'
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className={`${sora.className} text-white text-sm font-bold uppercase tracking-wider`}>
              Get in Touch
            </h4>
            <div className='mt-5 flex flex-col gap-4'>
              <a
                href='mailto:hello@buttnetworks.dev'
                className='flex items-center gap-3 text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200'
              >
                <Mail size={16} className='text-cyan-400' />
                buttnetworksofficial@gmail.com
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-3 text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200'
              >
                <FaWhatsapp size={16} className='text-cyan-400' />
                +92 300 4907243
              </a>

              <a
                href='https://instagram.com/buttnetworks'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-3 text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200'
              >
                <FaInstagram size={16} className='text-cyan-400' />
                @buttnetworks
              </a>
            </div>
          </div>
        </div>

        <div className='mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <p className='text-xs text-slate-500'>
            © {new Date().getFullYear()} Butt Networks. All rights reserved.
          </p>
          <p className='text-xs text-slate-500'>
            Built and maintained by <span className='text-cyan-400'>Shahnawaz Saddam Butt</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;