"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '/#services' },
  { name: 'Contact', href: '/contact' },
];

const whatsappNumber = '923004907243';

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);


  return (
    <nav className={`${inter.className} bg-slate-900/95 backdrop-blur-md border-b border-slate-800 fixed top-0 left-0 z-50 w-full`}>
      <div className='max-w-7xl mx-auto flex items-center justify-between h-20 px-6 lg:px-10'>
        <div className='flex items-center gap-3 cursor-pointer' onClick={()=>{router.push("/")}}>
          <Image
            src='/favicon.png'
            width={130}
            height={130}
            alt='Butt Networks logo'
            className='h-10 w-10 rounded-full border-2 border-cyan-600'
          />
          <span className={`${sora.className} text-white text-xl font-extrabold tracking-wide`}>
            Butt Networks
          </span>
        </div>

        <div className='hidden lg:flex items-center gap-10'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className='group relative text-slate-300 hover:text-cyan-400 text-sm font-medium tracking-wide transition-colors duration-200'
            >
              {link.name}
              <span className='absolute -bottom-1 left-0 h-[1.5px] w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full' />
            </Link>
          ))}
        </div>

        <div className='hidden lg:flex items-center gap-5'>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target='_blank'
            rel='noopener noreferrer'
            className='text-slate-300 hover:text-cyan-400 hover:scale-110 transition-all duration-200'
          >
            <FaWhatsapp size={22} />
          </a>

          <a
            href='mailto:buttnetworksOfficial.com'
            className='text-slate-300 hover:text-cyan-400 hover:scale-110 transition-all duration-200'
          >
            <Mail size={20} />
          </a>

          <Link
            href='/contact'
            className={`${sora.className} bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-cyan-600/30`}
          >
            Get in Touch
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className='lg:hidden text-slate-200 hover:text-cyan-400 relative w-7 h-7 flex items-center justify-center transition-colors duration-200'
        >
          <Menu
            size={26}
            className={`absolute transition-all duration-300 ${
              isOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
            }`}
          />
          <X
            size={26}
            className={`absolute transition-all duration-300 ${
              isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
            }`}
          />
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className={`bg-slate-900 border-t border-slate-800 px-6 py-6 flex flex-col gap-5 transition-all duration-500 ease-in-out ${
            isOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: isOpen ? `${index * 60}ms` : '0ms' }}
              className={`text-slate-300 hover:text-cyan-400 text-base font-medium transition-all duration-300 ${
                isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className='flex items-center gap-6 pt-4 border-t border-slate-800'>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-slate-300 hover:text-cyan-400 transition-colors duration-200'
            >
              <FaWhatsapp size={22} />
            </a>

            <a
              href='mailto:buttnetworksOfficial.com'
              className='text-slate-300 hover:text-cyan-400 transition-colors duration-200'
            >
              <Mail size={20} />
            </a>
          </div>

          <Link
            href='/contact'
            onClick={() => setIsOpen(false)}
            className={`${sora.className} bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold px-5 py-2.5 rounded-md text-center transition-all duration-200`}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;