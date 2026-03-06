"use client";

import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { ArrowRight, MapPin, Sparkles, Zap } from "lucide-react";
import { useTheme } from "./ThemeProvider";

/* ─────────────────────────────────────────────────────────────
   STATIC DATA  (module-level — never re-created)
   ───────────────────────────────────────────────────────────── */

const PROJECTS = [
  { src: "/projects/Ecom/light-shop.png", title: "E-commerce Store" },
  { src: "/projects/Platform/Dashboard.png", title: "Admin Dashboard" },
  { src: "/projects/Digital/Near-footer.png", title: "Marketing Landing" },
  { src: "/projects/Portfolio/home.png", title: "Custom Portfolio" },
];

const WORDS = [
  "React & Next.js applications",
  "Scalable backend architectures",
  "Cloud deployment & DevOps",
  "Mobile-first responsive design",
  "Production-ready code quality",
];

// Module-level so the string is never re-allocated on renders
const KEYFRAMES = `
  @keyframes hOrb1{0%,100%{transform:translate(0,0) scale(1)}45%{transform:translate(28px,-36px) scale(1.07)}70%{transform:translate(-18px,20px) scale(0.95)}}
  @keyframes hOrb2{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(-24px,28px) scale(1.05)}65%{transform:translate(16px,-20px) scale(0.97)}}
  @keyframes hOrb3{0%,100%{transform:translate(0,0)}50%{transform:translate(12px,-14px)}}
  @keyframes cF1{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-8px) rotate(1deg)}}
  @keyframes cF2{0%,100%{transform:translateY(0) rotate(2deg)}50%{transform:translateY(-6px) rotate(-0.5deg)}}
  @keyframes cF3{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-10px) rotate(0.5deg)}}
  @keyframes pRing{0%{transform:scale(0.9);opacity:.7}70%,100%{transform:scale(1.3);opacity:0}}
`;

const SPEED = 32; // scroll px/sec

// Shared animation variants (module-level)
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

/* ─────────────────────────────────────────────────────────────
   THEME TOKENS  (computed once per render in main, passed down)
   ───────────────────────────────────────────────────────────── */

const tok = (d) => ({
  card: d ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100",
  cardBg: d ? "bg-gray-900" : "bg-gray-50",
  text: d ? "text-gray-300" : "text-gray-600",
  badge: d
    ? "bg-gray-700 text-gray-200 border-gray-600"
    : "bg-gray-50 text-gray-700 border-gray-100",
  divider: d ? "bg-gray-700" : "bg-gray-100",
  sub: d ? "text-gray-400" : "text-gray-500",
  twColor: d ? "text-indigo-400" : "text-indigo-600",
  author: d ? "bg-gray-800/70 border-gray-700" : "bg-gray-50 border-gray-100",
  openBg: d
    ? "bg-emerald-900/40 text-emerald-400"
    : "bg-emerald-50 text-emerald-600",
  heading: d ? "text-white" : "text-gray-900",
  orbA: d
    ? "radial-gradient(circle,rgba(99,102,241,.18) 0%,transparent 65%)"
    : "radial-gradient(circle,rgba(59,130,246,.10) 0%,transparent 65%)",
  orbB: d
    ? "radial-gradient(circle,rgba(56,189,248,.12) 0%,transparent 65%)"
    : "radial-gradient(circle,rgba(99,102,241,.07) 0%,transparent 65%)",
  orbC: d
    ? "radial-gradient(circle,rgba(168,85,247,.07) 0%,transparent 70%)"
    : "radial-gradient(circle,rgba(168,85,247,.04) 0%,transparent 70%)",
  shadow: d ? "0 16px 48px rgba(0,0,0,.55)" : "0 16px 48px rgba(0,0,0,.18)",
  floatBadge: d
    ? "bg-gray-900 border-gray-700 text-gray-200"
    : "bg-white border-gray-100 text-gray-700",
  techBadge: d
    ? "bg-gray-900 border-gray-700 text-indigo-400"
    : "bg-white border-gray-100 text-indigo-600",
  border: d
    ? "border-gray-600 text-gray-200 hover:bg-gray-700/60"
    : "border-gray-300 text-gray-700 hover:bg-gray-50",
  subLink: d ? "text-gray-400" : "text-gray-500",
});

/* ─────────────────────────────────────────────────────────────
   SHARED SMALL ATOMS
   ───────────────────────────────────────────────────────────── */

// Reused in both mobile + desktop status badges
const PulseDot = () => (
  <span className="relative flex h-2 w-2">
    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
  </span>
);

// Divider with centred label
const Divider = ({ label, t }) => (
  <div className="flex items-center gap-3">
    <div className={`flex-1 h-px ${t.divider}`} />
    <span
      className={`text-[11px] font-bold uppercase tracking-widest ${t.sub}`}
    >
      {label}
    </span>
    <div className={`flex-1 h-px ${t.divider}`} />
  </div>
);

// Sub-links (See our work · About the team) — used in both layouts
const SubLinks = ({ t }) => (
  <div className={`flex gap-5 text-sm ${t.subLink}`}>
    <a
      href="/#projects"
      className="underline underline-offset-2 hover:text-indigo-500 transition-colors"
    >
      See our work
    </a>
    <span aria-hidden>·</span>
    <a
      href="/#founder"
      className="underline underline-offset-2 hover:text-indigo-500 transition-colors"
    >
      About the team
    </a>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   BACKGROUND ORBS  (CSS-only, zero JS on scroll)
   ───────────────────────────────────────────────────────────── */

const HeroBackground = memo(({ t }) => (
  <>
    <style>{KEYFRAMES}</style>
    <div
      aria-hidden
      className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
      style={{
        background: t.orbA,
        filter: "blur(72px)",
        animation: "hOrb1 16s ease-in-out infinite",
        willChange: "transform",
      }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full"
      style={{
        background: t.orbB,
        filter: "blur(64px)",
        animation: "hOrb2 19s ease-in-out infinite",
        animationDelay: "5s",
        willChange: "transform",
      }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full"
      style={{
        background: t.orbC,
        filter: "blur(48px)",
        animation: "hOrb3 12s ease-in-out infinite",
        animationDelay: "2s",
        willChange: "transform",
      }}
    />
  </>
));
HeroBackground.displayName = "HeroBackground";

/* ─────────────────────────────────────────────────────────────
   MOBILE VISUAL STACK
   ───────────────────────────────────────────────────────────── */

const MobileVisualStack = memo(({ t, prefersReduced }) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % PROJECTS.length),
      2500,
    );
    return () => clearInterval(id);
  }, [prefersReduced]);

  return (
    <div
      className="relative w-full flex justify-center items-center"
      style={{ height: 220 }}
    >
      {/* Ghost stack — 2 cards behind */}
      {[2, 1].map((offset) => (
        <div
          key={offset}
          aria-hidden
          className={`absolute rounded-2xl overflow-hidden border shadow-lg ${t.card}`}
          style={{
            width: 200,
            height: 140,
            top: offset * 14,
            opacity: offset === 1 ? 0.5 : 0.25,
            transform: `scale(${1 - offset * 0.07}) rotate(${offset === 1 ? 4 : 8}deg)`,
            zIndex: 3 - offset,
            animation: `cF${offset + 1} ${7 + offset}s ease-in-out infinite`,
            animationDelay: `${offset * 0.8}s`,
            willChange: "transform",
          }}
        >
          <Image
            src={PROJECTS[(idx + offset) % PROJECTS.length].src}
            alt=""
            fill
            className="object-contain p-2"
            sizes="200px"
          />
        </div>
      ))}

      {/* Front card */}
      <div
        className="relative z-10"
        style={{
          animation: prefersReduced ? "none" : "cF1 6s ease-in-out infinite",
          willChange: "transform",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.93, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.04, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`relative rounded-2xl overflow-hidden border shadow-2xl ${t.card}`}
            style={{ width: 220, height: 155, boxShadow: t.shadow }}
          >
            <Image
              src={PROJECTS[idx].src}
              alt={PROJECTS[idx].title}
              fill
              className="object-contain p-3"
              sizes="220px"
              priority
            />
            <div
              className="absolute bottom-0 inset-x-0 px-3 py-2 text-[11px] font-semibold text-white"
              style={{
                background:
                  "linear-gradient(to top,rgba(0,0,0,.65),transparent)",
              }}
            >
              {PROJECTS[idx].title}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`View ${PROJECTS[i].title}`}
            style={{
              width: i === idx ? 18 : 5,
              height: 5,
              borderRadius: 99,
              background: i === idx ? "#6366f1" : "rgba(255,255,255,.25)",
              transition: "width .3s ease",
            }}
          />
        ))}
      </div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, x: 12, y: -6 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute top-2 right-6 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold shadow-lg border ${t.floatBadge}`}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span
            className="absolute inset-0 rounded-full bg-emerald-400 opacity-75"
            style={{ animation: "pRing 1.4s ease infinite" }}
          />
          <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500 inline-flex" />
        </span>
        Live projects
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -12, y: 6 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute bottom-8 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold shadow-lg border ${t.techBadge}`}
      >
        <Zap size={10} />
        Next.js + React
      </motion.div>
    </div>
  );
});
MobileVisualStack.displayName = "MobileVisualStack";

/* ─────────────────────────────────────────────────────────────
   MOBILE SCROLL STRIP
   ───────────────────────────────────────────────────────────── */

const MobileScrollStrip = memo(({ t }) => {
  const elRef = useRef(null);
  const pressed = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const dragging = useRef(false);
  const paused = useRef(false); // ref = no re-render on pause/resume
  const timer = useRef(null);
  const raf = useRef(null);

  useEffect(() => {
    let last = 0;
    const step = (t) => {
      const dt = last ? (t - last) / 1000 : 0;
      last = t;
      const el = elRef.current;
      if (el && !paused.current && !dragging.current) {
        el.scrollLeft += SPEED * dt;
        if (el.scrollLeft >= el.scrollWidth / 2)
          el.scrollLeft -= el.scrollWidth / 2;
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf.current);
      clearTimeout(timer.current);
    };
  }, []);

  const pause = useCallback(() => {
    paused.current = true;
  }, []);
  const resume = useCallback((d = 800) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      paused.current = false;
    }, d);
  }, []);

  // Unified pointer/touch handlers
  const onDown = useCallback(
    (e) => {
      pressed.current = true;
      dragging.current = false;
      startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      startScroll.current = elRef.current?.scrollLeft ?? 0;
      pause();
      clearTimeout(timer.current);
      try {
        elRef.current?.setPointerCapture?.(e.pointerId);
      } catch {}
    },
    [pause],
  );

  const onMove = useCallback((e) => {
    if (!pressed.current) return;
    const dx = (e.clientX ?? e.touches?.[0]?.clientX ?? 0) - startX.current;
    if (!dragging.current && Math.abs(dx) > 5) dragging.current = true;
    if (dragging.current && elRef.current)
      elRef.current.scrollLeft = startScroll.current - dx;
  }, []);

  const onUp = useCallback(
    (e) => {
      pressed.current = false;
      dragging.current = false;
      try {
        elRef.current?.releasePointerCapture?.(e.pointerId);
      } catch {}
      resume(900);
    },
    [resume],
  );

  const doubled = [...PROJECTS, ...PROJECTS];

  return (
    <div>
      <div
        ref={elRef}
        className="flex gap-3 overflow-x-auto"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
        onMouseEnter={pause}
        onMouseLeave={() => resume(350)}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onTouchStart={onDown}
        onTouchMove={onMove}
        onTouchEnd={onUp}
      >
        {doubled.map((p, i) => (
          <a
            key={i}
            href="/#projects"
            aria-label={`View ${p.title}`}
            className={`flex-shrink-0 min-w-[180px] rounded-xl overflow-hidden border block ${t.card}`}
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,.07)" }}
          >
            <div className={`relative aspect-[4/3] ${t.cardBg}`}>
              <Image
                src={p.src}
                alt={p.title}
                fill
                className="object-contain p-2.5"
                sizes="180px"
              />
            </div>
            <p className={`px-3 py-2 text-[11px] font-medium ${t.text}`}>
              {p.title}
            </p>
          </a>
        ))}
      </div>
      <p className={`mt-2 text-[11px] text-right ${t.sub}`}>
        Swipe · Tap to open
      </p>
    </div>
  );
});
MobileScrollStrip.displayName = "MobileScrollStrip";

/* ─────────────────────────────────────────────────────────────
   AUTHOR CARD  — one component, size via prop
   ───────────────────────────────────────────────────────────── */

const AuthorCard = memo(({ t, compact = false }) => (
  <motion.div
    variants={compact ? fadeUp : fadeIn}
    className={`flex items-center gap-${compact ? 3 : 4} p-${compact ? 0 : 4} rounded-2xl ${compact ? "" : `border ${t.author}`}`}
  >
    <div
      className={`w-${compact ? 10 : 14} h-${compact ? 10 : 14} sm:w-${compact ? 10 : 16} sm:h-${compact ? 10 : 16} flex-none rounded-full ring-2 overflow-hidden ring-gray-200 dark:ring-gray-700`}
    >
      <Image
        src="/butt.png"
        alt="Wahb & Shahnawaz"
        width={compact ? 40 : 64}
        height={compact ? 40 : 64}
        className="object-cover w-full h-full"
      />
    </div>
    <div className="flex-1 min-w-0">
      <p className={`text-sm font-bold ${t.heading}`}>Wahb &amp; Shahnawaz</p>
      <p className={`text-xs mt-0.5 ${t.sub}`}>
        {compact
          ? "Design · Full-Stack · Asia"
          : "Design + Full-Stack Engineering"}
      </p>
      {!compact && (
        <span
          className={`inline-flex items-center gap-1.5 mt-1.5 text-[11px] font-medium ${t.sub}`}
        >
          <MapPin size={11} aria-hidden />
          Based in Asia
        </span>
      )}
    </div>
    <div
      className={`flex-none flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${t.openBg}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      Open
    </div>
  </motion.div>
));
AuthorCard.displayName = "AuthorCard";

/* ─────────────────────────────────────────────────────────────
   CTA BUTTONS  — shared by both layouts, size via prop
   ───────────────────────────────────────────────────────────── */

const CtaButtons = memo(({ t, prefersReduced, block = false }) => (
  <div
    className={`flex ${block ? "flex-col sm:flex-row w-full max-w-xs" : "flex-row"} items-center gap-3`}
  >
    <motion.div
      className={block ? "w-full" : ""}
      whileHover={prefersReduced ? {} : { scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link
        href="#services"
        className={`inline-flex items-center justify-center gap-2 ${block ? "w-full" : ""} px-${block ? 5 : 6} py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:shadow-xl transition-shadow text-sm`}
      >
        <Zap size={15} aria-hidden />
        Explore Services
        <motion.span
          animate={prefersReduced ? {} : { x: [0, 4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowRight size={15} />
        </motion.span>
      </Link>
    </motion.div>
    <motion.div
      className={block ? "w-full" : ""}
      whileHover={prefersReduced ? {} : { scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link
        href="/Contact"
        className={`inline-flex items-center justify-center gap-2 ${block ? "w-full" : ""} px-5 py-3 rounded-xl border font-semibold text-sm transition-colors ${t.border}`}
      >
        <Sparkles size={14} />
        Contact Us
      </Link>
    </motion.div>
  </div>
));
CtaButtons.displayName = "CtaButtons";

/* ─────────────────────────────────────────────────────────────
   DESKTOP PROJECT GRID
   ───────────────────────────────────────────────────────────── */

const DesktopGrid = memo(({ t, prefersReduced }) => (
  <div className="grid grid-cols-2 gap-3">
    {PROJECTS.map((p, i) => (
      <motion.a
        key={p.title}
        href="/#projects"
        aria-label={`View project: ${p.title}`}
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.45,
          delay: i * 0.08 + 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={
          prefersReduced
            ? {}
            : { y: -4, scale: 1.02, transition: { duration: 0.2 } }
        }
        className={`group relative block overflow-hidden rounded-xl border ${t.card}`}
        style={{ boxShadow: "0 2px 14px rgba(0,0,0,.08)" }}
      >
        <div className={`relative aspect-[4/3] ${t.cardBg}`}>
          <Image
            src={p.src}
            alt={p.title}
            fill
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.04]"
            sizes="(max-width:1024px) 45vw,20vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
        <div className={`px-3 py-2 text-xs font-medium ${t.text}`}>
          {p.title}
        </div>
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.28 }}
        />
      </motion.a>
    ))}
  </div>
));
DesktopGrid.displayName = "DesktopGrid";

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────────────────────── */

export default function Hero() {
  const { isDarkMode } = useTheme();
  const prefersReduced = useReducedMotion() ?? false;
  const t = tok(isDarkMode); // compute tokens once

  return (
    <section
      id="home"
      aria-label="Hero — Digital Solutions Built to Scale"
      className={`relative overflow-hidden py-10 sm:py-20 mt-16 md:mt-20 lg:mt-24 ${isDarkMode ? "bg-gray-900/60" : "bg-white/60"}`}
    >
      {!prefersReduced && <HeroBackground t={t} />}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── MOBILE  (< lg) ── */}
        <div className="lg:hidden">
          {/* 1 — Visual hook first */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <MobileVisualStack t={t} prefersReduced={prefersReduced} />
          </motion.div>

          {/* 2 — Text stagger */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="text-center flex flex-col items-center gap-4"
          >
            <motion.div
              variants={fadeUp}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border ${t.badge}`}
            >
              <PulseDot />
              Available for new projects
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className={`text-3xl sm:text-4xl font-black leading-[1.1] tracking-tight ${t.heading}`}
            >
              Digital Solutions
              <span
                className="block mt-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 bg-clip-text text-transparent"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                Built to Scale
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className={`text-sm leading-relaxed max-w-sm ${t.text}`}
            >
              Full-stack software for modern businesses — expert design,
              architecture, and deployment.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className={`text-sm font-medium min-h-[1.4rem] ${t.twColor}`}
            >
              <Typewriter
                words={WORDS}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={40}
                deleteSpeed={25}
                delaySpeed={1400}
              />
            </motion.div>

            <AuthorCard t={t} compact />

            <motion.div variants={fadeUp}>
              <CtaButtons t={t} prefersReduced={prefersReduced} block />
            </motion.div>

            <motion.div variants={fadeUp}>
              <SubLinks t={t} />
            </motion.div>
          </motion.div>

          {/* 3 — Scroll strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8"
          >
            <Divider label="Recent Work" t={t} />
            <div className="mt-3">
              <MobileScrollStrip t={t} />
            </div>
          </motion.div>
        </div>

        {/* ── DESKTOP  (≥ lg) ── */}
        <div className="hidden lg:grid grid-cols-2 gap-12 xl:gap-16 items-start">
          {/* Left */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start text-left"
          >
            <motion.div
              variants={fadeIn}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold uppercase tracking-widest border ${t.badge}`}
            >
              <PulseDot />
              Available for new projects
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className={`text-5xl xl:text-6xl font-black leading-[1.08] tracking-tight mb-5 ${t.heading}`}
            >
              <span className="block">Digital Solutions</span>
              <span
                className="block mt-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 bg-clip-text text-transparent"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                Built to Scale
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className={`text-lg max-w-xl leading-relaxed mb-3 ${t.text}`}
            >
              Full-stack software development for modern businesses — expert
              design, architecture, and deployment with proven technologies.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className={`text-base font-medium min-h-[1.5rem] mb-8 ${t.twColor}`}
            >
              <Typewriter
                words={WORDS}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={45}
                deleteSpeed={28}
                delaySpeed={1400}
              />
            </motion.div>

            <motion.div variants={fadeUp} className="mb-5">
              <CtaButtons t={t} prefersReduced={prefersReduced} />
            </motion.div>

            <motion.div variants={fadeUp}>
              <SubLinks t={t} />
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col gap-5 pt-14"
          >
            <motion.div variants={stagger} initial="hidden" animate="show">
              <AuthorCard t={t} />
            </motion.div>

            <Divider label="Recent Work" t={t} />
            <DesktopGrid t={t} prefersReduced={prefersReduced} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <a
                href="/#projects"
                className={`inline-flex items-center gap-1.5 text-xs font-semibold underline underline-offset-2 ${t.subLink} hover:text-indigo-500 transition-colors`}
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
