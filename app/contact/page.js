"use client";

import React, { useState } from 'react';
import { Sora, Inter } from 'next/font/google';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  PhoneCall,
  ClipboardList,
  Rocket,
  ChevronDown,
} from 'lucide-react';

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

const steps = [
  {
    icon: PhoneCall,
    title: 'Discovery Call',
    description: '30-minute conversation about your challenges',
  },
  {
    icon: ClipboardList,
    title: 'Scope & Recommend',
    description: 'We map the right engagement model',
  },
  {
    icon: Rocket,
    title: 'Execute',
    description: 'Persistent pod deployed, outcomes tracked weekly',
  },
];

const faqs = [
  {
    question: 'How quickly can we get started?',
    answer:
      'Most engagements kick off within a week of the discovery call, once scope and the right team members are locked in.',
  },
  {
    question: 'Do you work with startups and enterprises?',
    answer:
      'Yes. We tailor the engagement model to your stage, from lean MVPs for startups to persistent pods for enterprise teams.',
  },
  {
    question: 'What does a typical engagement look like?',
    answer:
      'You get a dedicated pod covering product, design, and engineering, with weekly outcome tracking and direct access to the team.',
  },
  {
    question: 'Can we adjust scope after starting?',
    answer:
      'Absolutely. Scope is reviewed continuously so the engagement can flex as your priorities change.',
  },
];

function FaqItem({ faq, isOpen, onClick }) {
  return (
    <div className='border border-slate-800 rounded-xl overflow-hidden bg-slate-800/40'>
      <button
        onClick={onClick}
        className='w-full flex items-center justify-between gap-4 px-5 py-4 text-left'
      >
        <span className='text-sm sm:text-base font-medium text-white'>{faq.question}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-cyan-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className='overflow-hidden'>
          <p className='px-5 pb-4 text-sm text-slate-400 leading-relaxed'>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${formData.name || 'website visitor'}`);
    const body = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name} (${formData.email})`);
    window.location.href = `mailto:hello@buttnetworks.dev?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id='contact'
      className={`${inter.className} bg-slate-900 text-white py-24 px-6 lg:px-10`}
    >
      <div className='max-w-6xl mx-auto'>
        <div className='text-center max-w-2xl mx-auto'>
          <h2 className={`${sora.className} text-3xl sm:text-4xl font-extrabold`}>
            Let's Build Something <span className='text-cyan-400'>Great Together</span>
          </h2>
          <p className='mt-4 text-slate-400'>
            Tell us about your project and we'll get back to you within one business day.
          </p>
        </div>

        <div className='mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='bg-slate-800/60 border border-slate-800 rounded-2xl p-8'>
            <h3 className={`${sora.className} text-xl font-bold text-white`}>Send us a message</h3>

            <form onSubmit={handleSubmit} className='mt-6 flex flex-col gap-5'>
              <div>
                <label className='text-sm text-slate-400'>Full Name</label>
                <div className='mt-2 relative'>
                  <User size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-500' />
                  <input
                    type='text'
                    name='name'
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Your name'
                    className='w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors duration-200'
                  />
                </div>
              </div>

              <div>
                <label className='text-sm text-slate-400'>Email Address</label>
                <div className='mt-2 relative'>
                  <Mail size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-500' />
                  <input
                    type='email'
                    name='email'
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='you@company.com'
                    className='w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors duration-200'
                  />
                </div>
              </div>

              <div>
                <label className='text-sm text-slate-400'>Message</label>
                <div className='mt-2 relative'>
                  <MessageSquare size={18} className='absolute left-3 top-3.5 text-slate-500' />
                  <textarea
                    name='message'
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder='Tell us about your project'
                    className='w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors duration-200 resize-none'
                  />
                </div>
              </div>

              <button
                type='submit'
                className={`${sora.className} mt-2 inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-600/30`}
              >
                Send Message
                <Send size={16} />
              </button>
            </form>

            <div className='mt-8 pt-6 border-t border-slate-800 flex flex-col gap-4'>
              <a
                href='mailto:buttnetworksOfficial.com'
                className='flex items-center gap-3 text-sm text-slate-300 hover:text-cyan-400 transition-colors duration-200'
              >
                <span className='w-9 h-9 flex items-center justify-center rounded-full bg-slate-900 border border-slate-700'>
                  <Mail size={16} className='text-cyan-400' />
                </span>
                hello@buttnetworks.dev
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                className='flex items-center gap-3 text-sm text-slate-300 hover:text-cyan-400 transition-colors duration-200'
              >
                <span className='w-9 h-9 flex items-center justify-center rounded-full bg-slate-900 border border-slate-700'>
                  <Phone size={16} className='text-cyan-400' />
                </span>
                +92 300 4907243
              </a>

              <div className='flex items-center gap-3 text-sm text-slate-300'>
                <span className='w-9 h-9 flex items-center justify-center rounded-full bg-slate-900 border border-slate-700'>
                  <MapPin size={16} className='text-cyan-400' />
                </span>
                Lahore, Pakistan
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-10'>
            <div className='bg-slate-800/60 border border-slate-800 rounded-2xl p-8'>
              <h3 className={`${sora.className} text-xl font-bold text-white`}>What Happens Next</h3>

              <div className='mt-8 flex flex-col gap-8 relative'>
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isLast = index === steps.length - 1;

                  return (
                    <div key={step.title} className='flex gap-5 relative'>
                      {!isLast && (
                        <span className='absolute left-[19px] top-11 w-px h-full bg-slate-700' />
                      )}
                      <span className='shrink-0 w-10 h-10 rounded-full bg-cyan-600/10 border border-cyan-600/40 flex items-center justify-center'>
                        <Icon size={18} className='text-cyan-400' />
                      </span>
                      <div>
                        <h4 className='text-white font-semibold'>{step.title}</h4>
                        <p className='mt-1 text-sm text-slate-400'>{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className='bg-slate-800/60 border border-slate-800 rounded-2xl p-8'>
              <h3 className={`${sora.className} text-xl font-bold text-white`}>Frequently Asked Questions</h3>

              <div className='mt-6 flex flex-col gap-3'>
                {faqs.map((faq, index) => (
                  <FaqItem
                    key={faq.question}
                    faq={faq}
                    isOpen={openFaq === index}
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}