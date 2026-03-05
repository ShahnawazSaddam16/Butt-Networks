"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { ArrowRight, MapPin, Sparkles, Zap } from "lucide-react";
import { useTheme } from "./ThemeProvider";

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────────────────────── */

const PROJECTS = [
  { src: "/projects/Ecom/light-shop.png",       title: "E-commerce Store"      },
  { src: "/projects/Platform/Dashboard.png",     title: "Admin Dashboard"       },
  { src: "/projects/Digital/Near-footer.png",    title: "Marketing Landing"     },
  { src: "/projects/Portfolio/home.png",         title: "Custom Portfolio"      },
];

const TYPEWRITER_WORDS = [
  "React & Next.js applications",
  "Scalable backend architectures",
  "Cloud deployment & DevOps",
  "Mobile-first responsive design",
  "Production-ready code quality",
];

const SCROLL_SPEED = 30; // px/sec

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────────────────────── */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ─────────────────────────────────────────────────────────────
   CSS-ONLY BACKGROUND EFFECTS  (zero JS scroll cost)
   ───────────────────────────────────────────────────────────── */

function HeroBackground({ isDark }) {
  return (
    <>
      <style>{`
        @keyframes heroOrb1 {
          0%,100%{transform:translate(0,0) scale(1)}
          45%{transform:translate(28px,-36px) scale(1.07)}
          70%{transform:translate(-18px,20px) scale(0.95)}
        }
        @keyframes heroOrb2 {
          0%,100%{transform:translate(0,0) scale(1)}
          40%{transform:translate(-24px,28px) scale(1.05)}
          65%{transform:translate(16px,-20px) scale(0.97)}
        }
        @keyframes heroOrb3 {
          0%,100%{transform:translate(0,0)}
          50%{transform:translate(12px,-14px)}
        }
      `}</style>

      {/* Primary glow — top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
        style={{
          background: isDark
            ? "radial-gradient(circle,rgba(99,102,241,.18) 0%,transparent 65%)"
            : "radial-gradient(circle,rgba(59,130,246,.1) 0%,transparent 65%)",
          filter: "blur(72px)",
          animation: "heroOrb1 16s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Secondary glow — bottom left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 w-[480px] h-[480px] rounded-full"
        style={{
          background: isDark
            ? "radial-gradient(circle,rgba(56,189,248,.12) 0%,transparent 65%)"
            : "radial-gradient(circle,rgba(99,102,241,.07) 0%,transparent 65%)",
          filter: "blur(64px)",
          animation: "heroOrb2 19s ease-in-out infinite",
          animationDelay: "5s",
          willChange: "transform",
        }}
      />
      {/* Accent — center */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full"
        style={{
          background: isDark
            ? "radial-gradient(circle,rgba(168,85,247,.07) 0%,transparent 70%)"
            : "radial-gradient(circle,rgba(168,85,247,.04) 0%,transparent 70%)",
          filter: "blur(48px)",
          animation: "heroOrb3 12s ease-in-out infinite",
          animationDelay: "2s",
          willChange: "transform",
        }}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   STATUS BADGE  ("Available for projects")
   ───────────────────────────────────────────────────────────── */

function StatusBadge({ isDark, prefersReduced }) {
  return (
    <motion.div
      variants={fadeIn}
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border mb-6 ${
        isDark
          ? "bg-gray-700/80 text-gray-200 border-gray-600"
          : "bg-gray-50 text-gray-700 border-gray-200"
      }`}
    >
      {/* Pulsing green dot */}
      <span className="relative flex h-2 w-2">
        <span
          className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
          style={
            prefersReduced
              ? {}
              : { animation: "ping 1.4s cubic-bezier(0,0,.2,1) infinite" }
          }
        />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      Available for new projects
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN HEADING
   ───────────────────────────────────────────────────────────── */

function HeroHeading({ isDark }) {
  return (
    <motion.h1
      variants={fadeUp}
      className={`text-4xl sm:text-5xl md:text-6xl font-black leading-[1.08] tracking-tight ${
        isDark ? "text-white" : "text-gray-900"
      }`}
    >
      <span className="block">Digital Solutions</span>
      <span
        className="block mt-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 bg-clip-text text-transparent"
        style={{ WebkitTextFillColor: "transparent" }}
      >
        Built to Scale
      </span>
    </motion.h1>
  );
}

/* ─────────────────────────────────────────────────────────────
   CTA BUTTONS
   ───────────────────────────────────────────────────────────── */

function CtaButtons({ isDark, prefersReduced }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start"
    >
      {/* Primary */}
      <motion.div
        whileHover={prefersReduced ? {} : { scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        <Link
          href="#services"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
        >
          <Zap size={16} aria-hidden />
          Explore Services
          <motion.span
            animate={prefersReduced ? {} : { x: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight size={16} aria-hidden />
          </motion.span>
        </Link>
      </motion.div>

      {/* Secondary */}
      <motion.div
        whileHover={prefersReduced ? {} : { scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Link
          href="/Contact"
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-semibold transition-colors ${
            isDark
              ? "border-gray-600 text-gray-200 hover:bg-gray-700/60"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Sparkles size={15} aria-hidden />
          Contact Us
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROJECT CARD  (small grid card)
   ───────────────────────────────────────────────────────────── */

function ProjectCard({ project, index, isDark, prefersReduced }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.a
      ref={ref}
      href="/#projects"
      aria-label={`View project: ${project.title}`}
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 + 0.3, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReduced ? {} : { y: -4, scale: 1.02, transition: { duration: 0.2 } }}
      className={`group relative block overflow-hidden rounded-xl border ${
        isDark
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-100"
      }`}
      style={{
        boxShadow: isDark
          ? "0 4px 20px rgba(0,0,0,.35)"
          : "0 2px 14px rgba(0,0,0,.08)",
      }}
    >
      {/* Image */}
      <div
        className={`relative aspect-[4/3] ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <Image
          src={project.src}
          alt={project.title}
          fill
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) 45vw, 20vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Label */}
      <div
        className={`px-3 py-2 text-xs font-medium ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {project.title}
      </div>

      {/* Accent line on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}

/* ─────────────────────────────────────────────────────────────
   MOBILE SCROLL STRIP
   ───────────────────────────────────────────────────────────── */

function MobileScrollStrip({ isDark }) {
  const scrollerRef     = useRef(null);
  const isPressedRef    = useRef(false);
  const startXRef       = useRef(0);
  const startScrollRef  = useRef(0);
  const isDraggingRef   = useRef(false);
  const pausedRef       = useRef(false);   // use ref, not state — no re-render
  const resumeTimer     = useRef(null);
  const rafRef          = useRef(null);

  // RAF auto-scroll — reads pausedRef, no state subscription
  useEffect(() => {
    let last = 0;
    function step(t) {
      if (!last) last = t;
      const dt = (t - last) / 1000;
      last = t;
      const el = scrollerRef.current;
      if (el && !pausedRef.current && !isDraggingRef.current) {
        el.scrollLeft += SCROLL_SPEED * dt;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resumeTimer.current);
    };
  }, []);

  const pause  = useCallback(() => { pausedRef.current = true; }, []);
  const resume = useCallback((delay = 800) => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { pausedRef.current = false; }, delay);
  }, []);

  const onPointerDown = useCallback((e) => {
    const el = scrollerRef.current;
    if (!el) return;
    isPressedRef.current   = true;
    isDraggingRef.current  = false;
    startXRef.current      = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    startScrollRef.current = el.scrollLeft;
    pause();
    try { el.setPointerCapture?.(e.pointerId); } catch {}
    clearTimeout(resumeTimer.current);
  }, [pause]);

  const onPointerMove = useCallback((e) => {
    if (!isPressedRef.current) return;
    const el = scrollerRef.current;
    if (!el) return;
    const dx = (e.clientX ?? e.touches?.[0]?.clientX ?? 0) - startXRef.current;
    if (!isDraggingRef.current && Math.abs(dx) > 5) isDraggingRef.current = true;
    if (isDraggingRef.current) el.scrollLeft = startScrollRef.current - dx;
  }, []);

  const onPointerUp = useCallback((e) => {
    isPressedRef.current  = false;
    isDraggingRef.current = false;
    try { scrollerRef.current?.releasePointerCapture?.(e.pointerId); } catch {}
    resume(900);
  }, [resume]);

  const doubled = [...PROJECTS, ...PROJECTS];

  return (
    <div>
      <div
        ref={scrollerRef}
        className="flex gap-3 overflow-x-auto"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
        onMouseEnter={pause}
        onMouseLeave={() => resume(350)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      >
        {doubled.map((p, i) => (
          <a
            key={i}
            href="/#projects"
            aria-label={`View project: ${p.title}`}
            className={`group relative block overflow-hidden rounded-xl border flex-shrink-0 min-w-[210px] ${
              isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
            }`}
            style={{ boxShadow: isDark ? "0 4px 16px rgba(0,0,0,.3)" : "0 2px 12px rgba(0,0,0,.07)" }}
          >
            <div className={`relative aspect-[4/3] ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
              <Image
                src={p.src}
                alt={p.title}
                fill
                className="object-contain p-3"
                sizes="210px"
              />
            </div>
            <div className={`px-3 py-2 text-xs font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {p.title}
            </div>
          </a>
        ))}
      </div>
      <p className={`mt-2 text-[11px] text-right ${isDark ? "text-gray-500" : "text-gray-400"}`}>
        Swipe to browse · Tap to open
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   AUTHOR CARD
   ───────────────────────────────────────────────────────────── */

function AuthorCard({ isDark }) {
  return (
    <motion.div
      variants={fadeIn}
      className={`flex items-center gap-4 p-4 rounded-2xl border ${
        isDark ? "bg-gray-800/70 border-gray-700" : "bg-gray-50 border-gray-100"
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-14 h-14 sm:w-16 sm:h-16 flex-none rounded-full ring-2 overflow-hidden ${
          isDark ? "ring-gray-700" : "ring-gray-200"
        }`}
      >
        <Image
          src="/butt.png"
          alt="Wahb & Shahnawaz"
          width={64}
          height={64}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          Wahb &amp; Shahnawaz
        </p>
        <p className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Design + Full-Stack Engineering
        </p>
        <span
          className={`inline-flex items-center gap-1.5 mt-1.5 text-[11px] font-medium ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <MapPin size={11} aria-hidden />
          Based in Asia
        </span>
      </div>

      {/* Live indicator */}
      <div className={`flex-none flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
        isDark ? "bg-emerald-900/40 text-emerald-400" : "bg-emerald-50 text-emerald-600"
      }`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Open
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DIVIDER WITH LABEL
   ───────────────────────────────────────────────────────────── */

function DividerLabel({ label, isDark }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className={`flex-1 h-px ${isDark ? "bg-gray-700" : "bg-gray-100"}`} />
      <span className={`text-[11px] font-bold uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}>
        {label}
      </span>
      <div className={`flex-1 h-px ${isDark ? "bg-gray-700" : "bg-gray-100"}`} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────────────────────── */

export default function Hero() {
  const { isDarkMode }   = useTheme();
  const prefersReduced   = useReducedMotion() ?? false;
  const headerRef        = useRef(null);

  return (
    <section
      id="home"
      aria-label="Hero — Digital Solutions Built to Scale"
      className={`relative overflow-hidden py-20 sm:py-24 mt-16 md:mt-20 lg:mt-24 ${
        isDarkMode ? "bg-gray-900/60" : "bg-white/60"
      }`}
    >
      {/* Background orbs (CSS-only, no scroll cost) */}
      {!prefersReduced && <HeroBackground isDark={isDarkMode} />}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            ref={headerRef}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Status badge */}
            <StatusBadge isDark={isDarkMode} prefersReduced={prefersReduced} />

            {/* H1 */}
            <HeroHeading isDark={isDarkMode} />

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className={`mt-5 text-base sm:text-lg max-w-xl leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Full-stack software development for modern businesses — expert
              design, architecture, and deployment with proven technologies.
            </motion.p>

            {/* Typewriter */}
            <motion.div
              variants={fadeUp}
              className={`mt-3 text-sm sm:text-base font-medium min-h-[1.5rem] ${
                isDarkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              <Typewriter
                words={TYPEWRITER_WORDS}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={45}
                deleteSpeed={28}
                delaySpeed={1400}
              />
            </motion.div>

            {/* CTAs */}
            <div className="mt-8 w-full">
              <CtaButtons isDark={isDarkMode} prefersReduced={prefersReduced} />
            </div>

            {/* Sub-links */}
            <motion.div
              variants={fadeUp}
              className={`mt-4 flex gap-5 text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <a href="/#projects" className="underline underline-offset-2 hover:text-indigo-500 transition-colors">
                See our work
              </a>
              <span aria-hidden>·</span>
              <a href="/#founder" className="underline underline-offset-2 hover:text-indigo-500 transition-colors">
                About the team
              </a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-0"
          >
            {/* Author card */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              <AuthorCard isDark={isDarkMode} />
            </motion.div>

            <DividerLabel label="Recent Work" isDark={isDarkMode} />

            {/* Desktop: 2×2 project grid */}
            <div className="hidden sm:grid grid-cols-2 gap-3">
              {PROJECTS.map((p, i) => (
                <ProjectCard
                  key={p.title}
                  project={p}
                  index={i}
                  isDark={isDarkMode}
                  prefersReduced={prefersReduced}
                />
              ))}
            </div>

            {/* Mobile: auto-scroll strip */}
            <div className="sm:hidden">
              <MobileScrollStrip isDark={isDarkMode} />
            </div>

            {/* "View all projects" link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-4 text-center"
            >
              <a
                href="/#projects"
                className={`inline-flex items-center gap-1.5 text-xs font-semibold underline underline-offset-2 ${
                  isDarkMode ? "text-gray-400 hover:text-indigo-400" : "text-gray-500 hover:text-indigo-600"
                } transition-colors`}
              >
                View all projects <ArrowRight size={12} />
              </a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}