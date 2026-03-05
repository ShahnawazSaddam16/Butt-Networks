"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Cpu, Lightbulb, Rocket,
  Code2, Users, ArrowRight, Sparkles,
  ExternalLink, X, Globe, Github, Twitter,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────────────────────── */

const VALUE_PROPS = [
  {
    emoji: "⚡", headline: "We ship fast.",
    body: "From idea to deployed product — no bloat, no bureaucracy.",
    accentFrom: "#38bdf8", accentTo: "#6366f1",
  },
  {
    emoji: "🔒", headline: "We build right.",
    body: "Clean code, tested APIs, and secure infrastructure by default.",
    accentFrom: "#34d399", accentTo: "#059669",
  },
  {
    emoji: "🌍", headline: "We scale up.",
    body: "Architected for growth — from MVP to thousands of users.",
    accentFrom: "#f97316", accentTo: "#ef4444",
  },
];

const FEATURES = [
  { Icon: ShieldCheck, label: "Secure by default",   color: "#34d399" },
  { Icon: Cpu,         label: "High performance",    color: "#a855f7" },
  { Icon: Lightbulb,   label: "Innovative thinking", color: "#fbbf24" },
  { Icon: Rocket,      label: "Fast deployment",     color: "#38bdf8" },
  { Icon: Code2,       label: "Clean architecture",  color: "#6366f1" },
  { Icon: Users,       label: "Team collaboration",  color: "#fb923c" },
];

const STACK_TAGS = [
  "Next.js", "React", "TypeScript", "Node.js",
  "PostgreSQL", "Docker", "GitHub Actions", "Tailwind CSS",
];

const STATS = [
  { value: 5,  suffix: "+",   label: "Projects shipped"   },
  { value: 2,  suffix: "",    label: "Team members"        },
  { value: 10, suffix: "+",   label: "Technologies used"  },
  { value: 1,  suffix: " yr", label: "Building together"  },
];

// ← Replace URLs with real portfolio links
const TEAM = [
  {
    name: "Shahnawaz Saddam",
    role: "Frontend · Full-Stack",
    accentFrom: "#38bdf8",
    accentTo: "#6366f1",
    portfolioUrl: "https://shahnawaz.buttnetworks.com",
    githubUrl: "https://github.com/ShahanwazSaddam144",
    bio: "Specialises in pixel-perfect React UIs, Next.js architecture, and bringing designs to life with smooth animations.",
  },
  {
    name: "Wahb Amir",
    role: "Full-Stack · Architecture",
    accentFrom: "#a855f7",
    accentTo: "#6366f1",
    portfolioUrl: "http://wahb.space",
    githubUrl: "https://github.com/wahb-amir",
    bio: "Focuses on scalable backend systems, API design, DevOps pipelines, and full-stack product delivery.",
  },
];

/* ─────────────────────────────────────────────────────────────
   ANIMATION
   ───────────────────────────────────────────────────────────── */

const SPRING = { stiffness: 200, damping: 22, mass: 0.8 };

const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)",
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.38, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─────────────────────────────────────────────────────────────
   COUNT-UP HOOK
   ───────────────────────────────────────────────────────────── */

function useCountUp(active, target, duration = 1000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const isInt = target % 1 === 0;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - (1 - p) * (1 - p); // ease-out quad
      setCount(isInt ? Math.round(target * eased) : +(target * eased).toFixed(1));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

/* ─────────────────────────────────────────────────────────────
   CSS-ONLY AMBIENT ORBS
   ───────────────────────────────────────────────────────────── */

function AmbientOrbs({ isDark }) {
  return (
    <>
      <style>{`
        @keyframes abtOrb1{0%,100%{transform:translate(0,0) scale(1)}45%{transform:translate(24px,-30px) scale(1.06)}70%{transform:translate(-16px,18px) scale(0.96)}}
        @keyframes abtOrb2{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(-20px,25px) scale(1.04)}65%{transform:translate(14px,-16px) scale(0.97)}}
      `}</style>
      <div aria-hidden className="absolute -top-24 -left-32 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: isDark ? "radial-gradient(circle,rgba(99,102,241,.13) 0%,transparent 68%)" : "radial-gradient(circle,rgba(59,130,246,.07) 0%,transparent 68%)", filter: "blur(64px)", animation: "abtOrb1 15s ease-in-out infinite", willChange: "transform" }} />
      <div aria-hidden className="absolute -bottom-24 -right-32 w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: isDark ? "radial-gradient(circle,rgba(56,189,248,.10) 0%,transparent 68%)" : "radial-gradient(circle,rgba(168,85,247,.05) 0%,transparent 68%)", filter: "blur(64px)", animation: "abtOrb2 18s ease-in-out infinite", animationDelay: "5s", willChange: "transform" }} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION LABEL
   ───────────────────────────────────────────────────────────── */

function SectionLabel({ emoji, label, isDark, inView }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <motion.span
        initial={{ opacity: 0, x: -14 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap ${isDark ? "text-gray-400" : "text-gray-500"}`}
      >
        {emoji} {label}
      </motion.span>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`flex-1 h-px origin-left ${isDark ? "bg-gray-700" : "bg-gray-100"}`}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PORTFOLIO POPUP MODAL
   ───────────────────────────────────────────────────────────── */

function PortfolioModal({ member, isDark, onClose }) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const initials = member.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    /* Backdrop */
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ backdropFilter: "blur(12px)", background: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.93 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-sm rounded-3xl overflow-hidden border ${
          isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-100"
        }`}
        style={{
          boxShadow: isDark
            ? "0 24px 80px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.05)"
            : "0 24px 80px rgba(0,0,0,.18)",
        }}
      >
        {/* Gradient header band */}
        <div
          className="h-28 relative flex items-end px-6 pb-4"
          style={{ background: `linear-gradient(135deg,${member.accentFrom},${member.accentTo})` }}
        >
          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,.25) 50%,transparent 65%)",
              backgroundSize: "220% 100%",
              backgroundRepeat: "no-repeat",
            }}
            initial={{ backgroundPositionX: "-100%" }}
            animate={{ backgroundPositionX: "220%" }}
            transition={{ delay: 0.35, duration: 0.8, ease: "easeInOut" }}
          />

          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-white text-xl font-black shadow-lg"
          >
            {initials}
          </motion.div>

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {/* Name + role */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className={`text-lg font-black ${isDark ? "text-gray-100" : "text-gray-900"}`}>
              {member.name}
            </h3>
            <p
              className="text-xs font-semibold mt-0.5"
              style={{
                background: `linear-gradient(90deg,${member.accentFrom},${member.accentTo})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}
            >
              {member.role}
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.27, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-3 text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            {member.bio}
          </motion.p>

          {/* Skill chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.33, duration: 0.4 }}
            className="flex flex-wrap gap-2 mt-4"
          >
            
          </motion.div>

          {/* Divider */}
          <div className={`my-5 h-px ${isDark ? "bg-gray-700" : "bg-gray-100"}`} />

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3"
          >
            {/* Primary: Portfolio */}
            <motion.a
              href={member.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl text-sm font-bold text-white shadow-lg hover:shadow-xl transition-shadow"
              style={{ background: `linear-gradient(135deg,${member.accentFrom},${member.accentTo})` }}
            >
              <Globe size={15} />
              Explore Portfolio
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              >
                <ExternalLink size={13} />
              </motion.span>
            </motion.a>

            {/* Secondary: GitHub */}
            <motion.a
              href={member.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                isDark
                  ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Github size={15} />
              View GitHub
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TEAM CARD  (clickable → opens modal)
   ───────────────────────────────────────────────────────────── */

function TeamCard({ member, index, isDark, inView, prefersReduced, onOpen }) {
  const initials = member.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      type="button"
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      whileHover={prefersReduced ? {} : { y: -5, scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(member)}
      aria-label={`View ${member.name}'s portfolio`}
      className={`relative w-full text-left flex items-center gap-4 p-4 rounded-2xl border cursor-pointer group transition-shadow ${
        isDark ? "bg-gray-800 border-gray-700 hover:border-gray-500" : "bg-white border-gray-100 hover:border-gray-300"
      }`}
      style={{
        boxShadow: hovered
          ? isDark ? "0 8px 32px rgba(0,0,0,.45)" : "0 8px 32px rgba(0,0,0,.12)"
          : isDark ? "0 4px 20px rgba(0,0,0,.25)" : "0 2px 14px rgba(0,0,0,.06)",
      }}
    >
      {/* Hover glow from accent */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${member.accentFrom}15 0%, transparent 65%)` }}
      />

      {/* Gradient avatar */}
      <div className="relative flex-none w-12 h-12">
        <div
          className="absolute inset-0 rounded-full p-[2px]"
          style={{ background: `linear-gradient(135deg,${member.accentFrom},${member.accentTo})` }}
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center text-sm font-black text-white"
            style={{ background: `linear-gradient(135deg,${member.accentFrom},${member.accentTo})` }}
          >
            {initials}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 text-left">
        <p className={`text-sm font-bold ${isDark ? "text-gray-100" : "text-gray-900"}`}>{member.name}</p>
        <p className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{member.role}</p>
      </div>

      {/* Right side: "View" hint + online dot */}
      <div className="flex-none flex flex-col items-end gap-2">
        {/* Animated "View profile" label */}
        <motion.span
          initial={{ opacity: 0, x: 6 }}
          animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 6 }}
          transition={{ duration: 0.2 }}
          className="text-[10px] font-semibold flex items-center gap-1"
          style={{ color: member.accentFrom }}
        >
          View profile <ExternalLink size={9} />
        </motion.span>

        {/* Online dot */}
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
      </div>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────
   VALUE CARD
   ───────────────────────────────────────────────────────────── */

function ValueCard({ vp, index, isDark, prefersReduced }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delay: index * 0.1 }}
      whileHover={prefersReduced ? {} : { y: -5, transition: { duration: 0.22 } }}
      className={`relative rounded-2xl overflow-hidden border flex flex-col gap-3 p-6 group ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
      }`}
      style={{ boxShadow: isDark ? "0 4px 24px rgba(0,0,0,.3)" : "0 2px 16px rgba(0,0,0,.07)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: `linear-gradient(90deg,${vp.accentFrom},${vp.accentTo})` }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse at top left, ${vp.accentFrom}18 0%, transparent 60%)` }} />

      <span className="text-3xl leading-none">{vp.emoji}</span>
      <h3 className="text-lg font-black"
        style={{ background: `linear-gradient(120deg,${vp.accentFrom},${vp.accentTo})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {vp.headline}
      </h3>
      <p className={`text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>{vp.body}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STATS STRIP
   ───────────────────────────────────────────────────────────── */

function StatsStrip({ isDark, prefersReduced }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const active = inView && !prefersReduced;

  const c0 = useCountUp(active, STATS[0].value, 900);
  const c1 = useCountUp(active, STATS[1].value, 700);
  const c2 = useCountUp(active, STATS[2].value, 1100);
  const c3 = useCountUp(active, STATS[3].value, 800);
  const counts = [c0, c1, c2, c3];

  return (
    <div ref={ref}
      className={`grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border ${
        isDark ? "border-gray-700 bg-gray-700" : "border-gray-100 bg-gray-100"
      }`}
    >
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          custom={i}
          variants={scaleIn}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className={`flex flex-col items-center justify-center py-6 px-4 gap-1 ${isDark ? "bg-gray-800" : "bg-white"}`}
        >
          <span className="text-3xl font-black tabular-nums bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent"
            style={{ WebkitTextFillColor: "transparent" }}>
            {prefersReduced ? s.value : counts[i]}{s.suffix}
          </span>
          <span className={`text-xs font-medium text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {s.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────────────────────── */

export default function About() {
  const { isDarkMode }  = useTheme?.() ?? { isDarkMode: false };
  const prefersReduced  = useReducedMotion() ?? false;
  const [activeModal, setActiveModal] = useState(null);

  const headerRef    = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });
  const featRef      = useRef(null);
  const featInView   = useInView(featRef, { once: true, margin: "-40px" });
  const stackRef     = useRef(null);
  const stackInView  = useInView(stackRef, { once: true, margin: "-40px" });
  const teamRef      = useRef(null);
  const teamInView   = useInView(teamRef, { once: true, margin: "-40px" });

  const openModal  = useCallback((member) => setActiveModal(member), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  return (
    <>
      <section
        id="about"
        aria-labelledby="about-heading"
        className={`relative py-24 px-5 overflow-hidden ${
          isDarkMode ? "bg-gray-900/40" : "bg-white/60"
        }`}
      >
        {!prefersReduced && <AmbientOrbs isDark={isDarkMode} />}

        <div className="relative max-w-5xl mx-auto">

          {/* ── Header ── */}
          <div ref={headerRef} className="text-center mb-16">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: -14, scale: 0.9 }}
              animate={headerInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold uppercase tracking-widest border ${
                isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-gray-50 text-gray-700 border-gray-100"
              }`}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: isDarkMode ? "#818cf8" : "#6366f1" }}
                animate={prefersReduced ? {} : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <Sparkles size={11} className="opacity-60" />
              Who We Are
            </motion.div>

            <motion.h2
              id="about-heading"
              initial={prefersReduced ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`text-4xl md:text-5xl font-black tracking-tight mb-4 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
            >
              A small team.{" "}
              <span className={`bg-gradient-to-r ${isDarkMode ? "from-indigo-400 to-sky-400" : "from-blue-500 to-indigo-600"} bg-clip-text text-transparent`}>
                Big output.
              </span>
            </motion.h2>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 14 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.52, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Butt Networks builds reliable, scalable web products — from landing pages to full-stack platforms.
              Strong engineering. Thoughtful design.
            </motion.p>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={headerInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ delay: 0.45, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="h-1 w-20 mx-auto mt-6 rounded-full origin-center"
              style={{ background: isDarkMode ? "linear-gradient(90deg,#6366f1,#38bdf8)" : "linear-gradient(90deg,#3b82f6,#6366f1)" }}
            />
          </div>

          {/* Stats */}
          <div className="mb-14">
            <StatsStrip isDark={isDarkMode} prefersReduced={prefersReduced} />
          </div>

          {/* Value props */}
          <div className="mb-14">
            <SectionLabel emoji="💡" label="Why us" isDark={isDarkMode} inView={headerInView} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {VALUE_PROPS.map((vp, i) => (
                <ValueCard key={vp.headline} vp={vp} index={i} isDark={isDarkMode} prefersReduced={prefersReduced} />
              ))}
            </div>
          </div>

          {/* Feature pills */}
          <div ref={featRef} className="mb-14">
            <SectionLabel emoji="✦" label="What we bring" isDark={isDarkMode} inView={featInView} />
            <div className="flex flex-wrap gap-2 justify-center">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.label}
                  custom={i}
                  variants={scaleIn}
                  initial="hidden"
                  animate={featInView ? "show" : "hidden"}
                  whileHover={prefersReduced ? {} : { scale: 1.07, y: -2, transition: { type: "spring", stiffness: 380 } }}
                  className="flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-semibold cursor-default"
                  style={{ borderColor: `${f.color}35`, background: isDarkMode ? `${f.color}12` : `${f.color}08` }}
                >
                  <f.Icon size={13} style={{ color: f.color }} aria-hidden />
                  <span style={{ color: f.color }}>{f.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stack tags */}
          <div ref={stackRef} className="mb-14">
            <SectionLabel emoji="🛠" label="Our stack" isDark={isDarkMode} inView={stackInView} />
            <div className="flex flex-wrap gap-2 justify-center">
              {STACK_TAGS.map((tag, i) => (
                <motion.span
                  key={tag}
                  custom={i}
                  variants={scaleIn}
                  initial="hidden"
                  animate={stackInView ? "show" : "hidden"}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-gray-50 text-gray-700 border-gray-100"
                  }`}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Team */}
          <div ref={teamRef}>
            <SectionLabel emoji="👥" label="The team" isDark={isDarkMode} inView={teamInView} />

            {/* Hint text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={teamInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`text-xs mb-4 text-center ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
            >
              Click a card to explore their portfolio
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {TEAM.map((m, i) => (
                <TeamCard
                  key={m.name}
                  member={m}
                  index={i}
                  isDark={isDarkMode}
                  inView={teamInView}
                  prefersReduced={prefersReduced}
                  onOpen={openModal}
                />
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-2xl p-8 text-center border ${
                isDarkMode ? "bg-gray-800/60 border-gray-700" : "bg-gray-50 border-gray-100"
              }`}
            >
              <p className={`text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Want to know the full story?
              </p>
              <h3 className={`text-xl font-extrabold mb-5 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
                Read our blog &amp; meet the founders
              </h3>
              <motion.div whileHover={prefersReduced ? {} : { scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/About"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg hover:shadow-xl transition-shadow"
                  style={{ background: "linear-gradient(135deg,#6366f1,#38bdf8)" }}
                >
                  Explore Our Blog
                  <motion.span
                    animate={prefersReduced ? {} : { x: [0, 5, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Portfolio Modal (portal-style, outside section) ── */}
      <AnimatePresence>
        {activeModal && (
          <PortfolioModal
            member={activeModal}
            isDark={isDarkMode}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}