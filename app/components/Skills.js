"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  FaNodeJs,
  FaReact,
  FaPython,
  FaLinux,
  FaDocker,
  FaGithub,
} from "react-icons/fa";
import { useTheme } from "./ThemeProvider";
import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiC,
  SiCplusplus,
  SiScikitlearn,
  SiTypescript,
  SiPytorch,
  SiPostgresql,
  SiFastapi,
} from "react-icons/si";

/* ─── Mobile detection hook ─────────────────────────────── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

/* ─── Data factories ────────────────────────────────────── */
const getCoreStack = (isDark) => [
  {
    name: "TypeScript",
    icon: <SiTypescript />,
    color: "#3178C6",
    bg: isDark ? "rgba(49,120,198,0.2)" : "rgba(49,120,198,0.08)",
  },
  {
    name: "React",
    icon: <FaReact />,
    color: "#06b6d4",
    bg: isDark ? "rgba(6,182,212,0.2)" : "rgba(6,182,212,0.08)",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs />,
    color: isDark ? "#e2e8f0" : "#111111",
    bg: isDark ? "rgba(226,232,240,0.1)" : "rgba(0,0,0,0.06)",
  },
  {
    name: "Node.js",
    icon: <FaNodeJs />,
    color: "#16a34a",
    bg: isDark ? "rgba(22,163,74,0.2)" : "rgba(22,163,74,0.08)",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    color: "#38BDF8",
    bg: isDark ? "rgba(56,189,248,0.2)" : "rgba(56,189,248,0.08)",
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql />,
    color: "#4a90d9",
    bg: isDark ? "rgba(74,144,217,0.2)" : "rgba(51,103,145,0.08)",
  },
  {
    name: "Docker",
    icon: <FaDocker />,
    color: "#2496ED",
    bg: isDark ? "rgba(36,150,237,0.2)" : "rgba(36,150,237,0.08)",
  },
];

const getCapabilities = (isDark) => [
  {
    title: "Frontend",
    emoji: "🎨",
    accentFrom: "#38bdf8",
    accentTo: "#6366f1",
    desc: "Pixel-perfect, accessible UIs with modern React patterns and smooth animations.",
    tools: [
      { name: "React", icon: <FaReact />, color: "#06b6d4" },
      {
        name: "Next.js",
        icon: <SiNextdotjs />,
        color: isDark ? "#e2e8f0" : "#111111",
      },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#38BDF8" },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
    ],
  },
  {
    title: "Backend APIs",
    emoji: "⚙️",
    accentFrom: "#34d399",
    accentTo: "#059669",
    desc: "Scalable REST & GraphQL APIs with clean architecture and full type safety.",
    tools: [
      { name: "Node.js", icon: <FaNodeJs />, color: "#16a34a" },
      {
        name: "Express",
        icon: <SiExpress />,
        color: isDark ? "#d1d5db" : "#555555",
      },
      { name: "Python", icon: <FaPython />, color: "#4B8BBE" },
      { name: "FastAPI", icon: <SiFastapi />, color: "#059669" },
    ],
  },
  {
    title: "Databases",
    emoji: "🗄️",
    accentFrom: "#fb923c",
    accentTo: "#dc2626",
    desc: "Flexible and relational data models — from documents to ACID transactions.",
    tools: [
      { name: "MongoDB", icon: <SiMongodb />, color: "#4DB33D" },
      {
        name: "PostgreSQL",
        icon: <SiPostgresql />,
        color: isDark ? "#4a90d9" : "#336791",
      },
    ],
  },
  {
    title: "Mobile",
    emoji: "📱",
    accentFrom: "#a855f7",
    accentTo: "#6366f1",
    desc: "Cross-platform native-feel apps for Android and iOS from one codebase.",
    tools: [{ name: "React Native", icon: <FaReact />, color: "#06b6d4" }],
  },
  {
    title: "DevOps & CI/CD",
    emoji: "🚀",
    accentFrom: "#38bdf8",
    accentTo: "#6366f1",
    desc: "Containerised deployments, automated pipelines, and infrastructure as code.",
    tools: [
      { name: "Docker", icon: <FaDocker />, color: "#2496ED" },
      {
        name: "GitHub Actions",
        icon: <FaGithub />,
        color: isDark ? "#d1d5db" : "#1e293b",
      },
      { name: "Linux", icon: <FaLinux />, color: "#ca8a04" },
    ],
  },
  {
    title: "ML & AI",
    emoji: "🧠",
    accentFrom: "#f97316",
    accentTo: "#ef4444",
    desc: "Prototyping and production ML pipelines, from data wrangling to model serving.",
    tools: [
      { name: "Python", icon: <FaPython />, color: "#4B8BBE" },
      { name: "Scikit-Learn", icon: <SiScikitlearn />, color: "#F89939" },
      { name: "PyTorch", icon: <SiPytorch />, color: "#EE4C2C" },
    ],
  },
  {
    title: "Systems",
    emoji: "🔧",
    accentFrom: "#94a3b8",
    accentTo: "#475569",
    desc: "Performance-critical code and low-level systems programming.",
    tools: [
      { name: "C", icon: <SiC />, color: isDark ? "#7ab8e8" : "#5C8DBC" },
      {
        name: "C++",
        icon: <SiCplusplus />,
        color: isDark ? "#6a9fd8" : "#004482",
      },
    ],
  },
];

/* ─── Shared spring config ───────────────────────────────── */
const SPRING = { stiffness: 200, damping: 24, mass: 0.8 };

/* ─── Animated Heading ───────────────────────────────────── */
// FIX: shimmer uses backgroundImage + backgroundSize + backgroundPositionX
// instead of mixing shorthand `background` with `backgroundPosition`/`backgroundSize`
function AnimatedHeading({ isDark, inView, prefersReduced }) {
  const words = ["Built", "to", "Scale"];

  return (
    <h2
      className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${
        isDark ? "text-gray-100" : "text-gray-900"
      }`}
    >
      {words.map((word, wi) => {
        const isAccent = word === "Scale";
        const delay = wi * 0.12;

        return (
          <span key={word} className="inline-block mr-3">
            <motion.span
              className={`inline-block ${
                isAccent
                  ? `bg-gradient-to-r ${
                      isDark
                        ? "from-indigo-400 to-sky-400"
                        : "from-blue-500 to-indigo-600"
                    } bg-clip-text text-transparent`
                  : ""
              }`}
              style={{ position: "relative" }}
              initial={
                prefersReduced
                  ? false
                  : { opacity: 0, y: 36, filter: "blur(10px)" }
              }
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}

              {/* Shimmer — only on accent word, only on desktop, fixed shorthand conflict */}
              {isAccent && !prefersReduced && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  style={{
                    // Use separate longhand props — no conflict with backgroundSize/backgroundPosition
                    backgroundImage:
                      "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%)",
                    backgroundSize: "220% 100%",
                    backgroundRepeat: "no-repeat",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                  initial={{ backgroundPositionX: "-100%" }}
                  animate={inView ? { backgroundPositionX: "220%" } : {}}
                  transition={{
                    delay: delay + 0.8,
                    duration: 0.75,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.span>
          </span>
        );
      })}
    </h2>
  );
}

/* ─── CorePill — magnetic on desktop only ────────────────── */
function CorePill({ item, index, isDark, isMobile, prefersReduced }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const handleMouseMove = useCallback(
    (e) => {
      if (isMobile || prefersReduced) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
      y.set((e.clientY - (rect.top + rect.height / 2)) * 0.25);
    },
    [isMobile, prefersReduced, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const variants = {
    hidden: { opacity: 0, scale: 0.75, y: 16 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={prefersReduced ? {} : { scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center gap-2.5 px-5 py-2.5 rounded-full cursor-default select-none border group"
      style={{
        ...(isMobile || prefersReduced ? {} : { x: springX, y: springY }),
        background: item.bg,
        borderColor: `${item.color}40`,
        boxShadow: isDark
          ? "0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "0 1px 3px rgba(0,0,0,0.06)",
        willChange: "transform",
      }}
    >
      {/* Glow ring — desktop only */}
      {!isMobile && (
        <span
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: `0 0 16px 2px ${item.color}40` }}
        />
      )}
      <span style={{ color: item.color, fontSize: "1.1rem", display: "flex" }}>
        {item.icon}
      </span>
      <span
        className="text-sm font-semibold tracking-wide"
        style={{ color: isDark ? "#e2e8f0" : "#374151" }}
      >
        {item.name}
      </span>
    </motion.div>
  );
}

/* ─── CapabilityCard — 3D tilt on desktop, flat on mobile ── */
function CapabilityCard({ cap, index, isDark, isMobile, prefersReduced }) {
  const cardRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springRotX = useSpring(rotX, SPRING);
  const springRotY = useSpring(rotY, SPRING);

  const handleMouseMove = useCallback(
    (e) => {
      if (isMobile || prefersReduced) return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rotX.set((py - 0.5) * -12);
      rotY.set((px - 0.5) * 12);
      glowX.set(px * 100);
      glowY.set(py * 100);
    },
    [isMobile, prefersReduced, rotX, rotY, glowX, glowY],
  );

  const handleMouseLeave = useCallback(() => {
    rotX.set(0);
    rotY.set(0);
    glowX.set(50);
    glowY.set(50);
  }, [rotX, rotY, glowX, glowY]);

  const glowBg = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, ${cap.accentFrom}20, transparent 55%)`,
  );

  // Simpler entrance on mobile
  const variants = {
    hidden: isMobile
      ? { opacity: 0, y: 20 }
      : { opacity: 0, y: 32, scale: 0.95, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: isMobile ? 0.4 : 0.55,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      style={isMobile || prefersReduced ? {} : { perspective: 900 }}
    >
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={
          prefersReduced
            ? {}
            : { scale: isMobile ? 1 : 1.015, transition: { duration: 0.2 } }
        }
        className={`relative rounded-2xl overflow-hidden group border h-full ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        }`}
        style={{
          ...(isMobile || prefersReduced
            ? {}
            : {
                rotateX: springRotX,
                rotateY: springRotY,
                transformStyle: "preserve-3d",
                willChange: "transform",
              }),
          boxShadow: isDark
            ? "0 4px 24px rgba(0,0,0,0.3)"
            : "0 2px 16px rgba(0,0,0,0.07)",
        }}
      >
        {/* Accent bar with shimmer sweep on scroll reveal */}
        <div className="relative h-[3px] w-full overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, ${cap.accentFrom}, ${cap.accentTo})`,
            }}
          />
          {!isMobile && !prefersReduced && (
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                backgroundSize: "60% 100%",
                backgroundRepeat: "no-repeat",
              }}
              initial={{ backgroundPositionX: "-60%" }}
              animate={inView ? { backgroundPositionX: "160%" } : {}}
              transition={{
                delay: index * 0.07 + 0.45,
                duration: 0.65,
                ease: "easeInOut",
              }}
            />
          )}
        </div>

        {/* Cursor-tracking glow — desktop only */}
        {!isMobile && !prefersReduced && (
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: glowBg }}
          />
        )}

        <div
          className="p-6 relative"
          style={
            isMobile || prefersReduced ? {} : { transform: "translateZ(8px)" }
          }
        >
          <div className="flex items-center gap-3 mb-2.5">
            <motion.span
              className="text-xl inline-block"
              whileHover={
                prefersReduced
                  ? {}
                  : {
                      scale: 1.25,
                      rotate: 10,
                      transition: {
                        type: "spring",
                        stiffness: 380,
                        damping: 14,
                      },
                    }
              }
            >
              {cap.emoji}
            </motion.span>
            <h4
              className="text-sm font-bold tracking-tight"
              style={{
                background: `linear-gradient(120deg, ${cap.accentFrom}, ${cap.accentTo})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {cap.title}
            </h4>
          </div>

          <p
            className={`text-sm leading-relaxed mb-5 ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            {cap.desc}
          </p>

          <div className="flex flex-wrap gap-2">
            {cap.tools.map((tool, ti) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: index * 0.07 + ti * 0.06 + 0.25,
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  prefersReduced
                    ? {}
                    : {
                        scale: 1.08,
                        y: -2,
                        transition: {
                          type: "spring",
                          stiffness: 380,
                          damping: 14,
                        },
                      }
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                style={{
                  background: isDark ? `${tool.color}18` : `${tool.color}10`,
                  border: `1px solid ${tool.color}35`,
                }}
              >
                <span
                  style={{
                    color: tool.color,
                    fontSize: "0.875rem",
                    display: "flex",
                  }}
                >
                  {tool.icon}
                </span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: tool.color }}
                >
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

/* ─── Section Label ──────────────────────────────────────── */
function SectionLabel({ emoji, label, isDark, inView }) {
  return (
    <div className="flex items-center gap-3 mb-7">
      <motion.span
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {emoji} {label}
      </motion.span>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`flex-1 h-px origin-left ${isDark ? "bg-gray-700" : "bg-gray-100"}`}
      />
    </div>
  );
}

/* ─── Ambient orb — CSS animation only, no JS on scroll ─── */
// Using CSS keyframes via style tag avoids Framer re-renders during scroll
function AmbientOrbs({ isDark }) {
  return (
    <>
      <style>{`
        @keyframes orbDrift1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(20px,-28px) scale(1.05); }
          66%      { transform: translate(-14px,16px) scale(0.97); }
        }
        @keyframes orbDrift2 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(-18px,22px) scale(1.04); }
          70%      { transform: translate(12px,-14px) scale(0.98); }
        }
      `}</style>
      <div
        className="absolute top-16 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
          filter: "blur(64px)",
          animation: "orbDrift1 14s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      <div
        className="absolute bottom-16 -right-40 w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(56,189,248,0.10) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          filter: "blur(64px)",
          animation: "orbDrift2 16s ease-in-out infinite",
          animationDelay: "4s",
          willChange: "transform",
        }}
      />
    </>
  );
}

/* ─── Main ───────────────────────────────────────────────── */
export default function Skills() {
  const { isDarkMode } = useTheme?.() ?? { isDarkMode: false };
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion() ?? false;

  const CORE_STACK = getCoreStack(isDarkMode);
  const CAPABILITIES = getCapabilities(isDarkMode);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });
  const coreRef = useRef(null);
  const coreInView = useInView(coreRef, { once: true, margin: "-50px" });
  const capsRef = useRef(null);
  const capsInView = useInView(capsRef, { once: true, margin: "-50px" });

  return (
    <section
      id="skills"
      className={`relative py-24 px-5 mt-20 overflow-hidden ${
        isDarkMode ? "bg-gray-900/40" : "bg-white/60"
      }`}
    >
      {/* Pure CSS animated orbs — zero JS scroll cost */}
      {!prefersReduced && <AmbientOrbs isDark={isDarkMode} />}

      <div className="relative max-w-5xl mx-auto">
        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={
              prefersReduced ? false : { opacity: 0, y: -18, scale: 0.92 }
            }
            animate={headerInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold uppercase tracking-widest border ${
              isDarkMode
                ? "bg-gray-700 text-gray-200 border-gray-600"
                : "bg-gray-50 text-gray-700 border-gray-100"
            }`}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: isDarkMode ? "#818cf8" : "#6366f1" }}
              animate={
                prefersReduced
                  ? {}
                  : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }
              }
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            Tech Stack
          </motion.div>

          <AnimatedHeading
            isDark={isDarkMode}
            inView={headerInView}
            prefersReduced={prefersReduced || isMobile}
          />

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.55,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Modern, battle-tested technologies powering everything from
            pixel-perfect UIs to containerised CI/CD pipelines.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={headerInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{
              delay: 0.55,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-1 w-20 mx-auto mt-6 rounded-full origin-center"
            style={{
              background: isDarkMode
                ? "linear-gradient(90deg, #6366f1, #38bdf8)"
                : "linear-gradient(90deg, #3b82f6, #6366f1)",
            }}
          />
        </div>

        {/* ── Core Stack ── */}
        <div className="mb-16" ref={coreRef}>
          <SectionLabel
            emoji="⚡"
            label="Core Technologies"
            isDark={isDarkMode}
            inView={coreInView}
          />

          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            initial="hidden"
            animate={coreInView ? "show" : "hidden"}
            className="flex flex-wrap justify-center gap-3"
          >
            {CORE_STACK.map((item, i) => (
              <CorePill
                key={item.name}
                item={item}
                index={i}
                isDark={isDarkMode}
                isMobile={isMobile}
                prefersReduced={prefersReduced}
              />
            ))}
          </motion.div>
        </div>

        {/* ── Capabilities ── */}
        <div ref={capsRef}>
          <SectionLabel
            emoji="🎯"
            label="Capabilities"
            isDark={isDarkMode}
            inView={capsInView}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPABILITIES.map((cap, i) => (
              <CapabilityCard
                key={cap.title}
                cap={cap}
                index={i}
                isDark={isDarkMode}
                isMobile={isMobile}
                prefersReduced={prefersReduced}
              />
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`text-center mt-14 text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
        >
          Always learning · Always shipping
        </motion.p>
      </div>
    </section>
  );
}
