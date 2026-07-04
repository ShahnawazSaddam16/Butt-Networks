"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 w-full'>
      <div className='max-w-7xl mx-auto flex items-center justify-between h-20 px-6 lg:px-10'>
        <div className='flex items-center gap-3'>
          <img src='/butt.png' alt='Butt Networks logo' className='h-9 w-9 rounded-full' />
          <span className='text-white text-xl font-serif font-semibold tracking-wide'>
            Butt Networks
          </span>
        </div>

        <div className='hidden lg:flex items-center gap-10'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className='text-slate-300 hover:text-blue-400 text-sm font-medium tracking-wide transition-colors duration-200'
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className='hidden lg:flex items-center gap-5'>
          <a
            href='https://wa.me/1234567890'
            target='_blank'
            rel='noopener noreferrer'
            className='text-slate-300 hover:text-blue-400 transition-colors duration-200'
          >
            <FaWhatsapp size={22} />
          </a>

          <a
            href='mailto:hello@buttnetworks.dev'
            className='text-slate-300 hover:text-blue-400 transition-colors duration-200'
          >
            <Mail size={20} />
          </a>

          <Link
            href='#contact'
            className='bg-blue-500 hover:bg-blue-400 text-slate-900 text-sm font-semibold px-5 py-2.5 rounded-md transition-colors duration-200'
          >
            Get in Touch
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className='lg:hidden text-slate-200 relative w-7 h-7 flex items-center justify-center'
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
              className={`text-slate-300 hover:text-blue-400 text-base font-medium transition-all duration-300 ${
                isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className='flex items-center gap-6 pt-4 border-t border-slate-800'>
            <a
              href='https://wa.me/1234567890'
              target='_blank'
              rel='noopener noreferrer'
              className='text-slate-300 hover:text-blue-400'
            >
              <FaWhatsapp size={22} />
            </a>

            <a
              href='mailto:hello@buttnetworks.dev'
              className='text-slate-300 hover:text-blue-400'
            >
              <Mail size={20} />
            </a>
          </div>

          <Link
            href='#contact'
            onClick={() => setIsOpen(false)}
            className='bg-blue-500 hover:bg-blue-400 text-slate-900 text-sm font-semibold px-5 py-2.5 rounded-md text-center transition-colors duration-200'
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;