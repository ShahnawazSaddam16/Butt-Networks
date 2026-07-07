'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Inter } from 'next/font/google'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap' })

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className={`${inter.className} min-h-screen bg-slate-900 text-white py-20 overflow-hidden`}>
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <Reveal className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            About <span className="text-cyan-400">Butt Networks</span>
          </h1>
          <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
            We design and build scalable web and mobile products that empower businesses and users. Our team focuses on performance, accessibility, and clear UX.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Reveal delay={100} className="lg:col-span-2">
            <div className="h-full bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-colors duration-300">
              <h2 className="text-2xl font-semibold text-cyan-400">Mission & Values</h2>
              <p className="mt-4 text-gray-300 leading-relaxed">
                We aim to deliver production-ready software that solves real problems. Our values are quality, transparency, and continuous learning. We partner closely with customers to accelerate product-market fit and ship reliable systems.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-6">
                <div className="text-center group">
                  <div className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">2+</div>
                  <div className="text-sm text-gray-400">Projects Deliverd</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">2+</div>
                  <div className="text-sm text-gray-400">Clients</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">1 yrs</div>
                  <div className="text-sm text-gray-400">Combined Experience</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="h-full bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl"></div>
                <Image
                  src="/shahnawaz.jpeg"
                  alt="CEO Shahnawaz Saddam Butt"
                  width={180}
                  height={180}
                  className="relative rounded-full object-cover ring-2 ring-cyan-400/40"
                />
              </div>
              <h3 className="mt-5 text-xl font-semibold">Shahnawaz Saddam Butt</h3>
              <p className="text-sm text-cyan-400">Chief Executive Officer</p>
              <p className="mt-3 text-gray-300 text-sm">Leads strategy and product vision, focusing on growth and technical excellence.</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12">
          <Reveal className="text-center">
            <h2 className="text-2xl font-semibold">
              Currently <span className="text-cyan-400">Handling Everything</span>
            </h2>
          </Reveal>

          <Reveal delay={100} className="mt-6 flex justify-center">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center max-w-sm w-full">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl"></div>
                <Image
                  src="/shahnawaz.jpeg"
                  alt="Shahnawaz Saddam Butt"
                  width={160}
                  height={160}
                  className="relative rounded-full object-cover ring-2 ring-cyan-400/40"
                />
              </div>
              <h4 className="mt-5 text-xl font-semibold">Shahnawaz Saddam Butt</h4>
              <div className="text-sm text-cyan-400">Founder, Developer & Lead</div>
              <p className="mt-3 text-gray-300 text-sm">
                Single-handedly driving strategy, product, design, and engineering across every part of Butt Networks — from architecture to shipped features.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150} className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
          >
            Get in Touch
          </a>
        </Reveal>
      </div>
    </section>
  )
}