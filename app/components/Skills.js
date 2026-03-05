"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaNodeJs, FaReact, FaPython,
  FaLinux, FaDocker, FaGithub,
} from "react-icons/fa";
import { useTheme } from "./ThemeProvider";
import {
  SiTailwindcss, SiExpress, SiMongodb, SiNextdotjs,
  SiC, SiCplusplus, SiScikitlearn, SiTypescript,
  SiPytorch, SiPostgresql, SiFastapi,
} from "react-icons/si";

/* ─── Data factories (theme-aware) ──────────────────────── */
const getCoreStack = (isDark) => [
  { name: "TypeScript",   icon: <SiTypescript />,  color: "#3178C6", bg: isDark ? "rgba(49,120,198,0.2)"   : "rgba(49,120,198,0.08)"  },
  { name: "React",        icon: <FaReact />,        color: "#06b6d4", bg: isDark ? "rgba(6,182,212,0.2)"    : "rgba(6,182,212,0.08)"   },
  { name: "Next.js",      icon: <SiNextdotjs />,    color: isDark ? "#e2e8f0" : "#111111", bg: isDark ? "rgba(226,232,240,0.1)" : "rgba(0,0,0,0.06)" },
  { name: "Node.js",      icon: <FaNodeJs />,       color: "#16a34a", bg: isDark ? "rgba(22,163,74,0.2)"    : "rgba(22,163,74,0.08)"   },
  { name: "Tailwind CSS", icon: <SiTailwindcss />,  color: "#38BDF8", bg: isDark ? "rgba(56,189,248,0.2)"   : "rgba(56,189,248,0.08)"  },
  { name: "PostgreSQL",   icon: <SiPostgresql />,   color: "#4a90d9", bg: isDark ? "rgba(74,144,217,0.2)"   : "rgba(51,103,145,0.08)"  },
  { name: "Docker",       icon: <FaDocker />,       color: "#2496ED", bg: isDark ? "rgba(36,150,237,0.2)"   : "rgba(36,150,237,0.08)"  },
];

const getCapabilities = (isDark) => [
  {
    title: "Frontend",
    emoji: "🎨",
    accentFrom: "#38bdf8",
    accentTo: "#6366f1",
    desc: "Pixel-perfect, accessible UIs with modern React patterns and smooth animations.",
    tools: [
      { name: "React",        icon: <FaReact />,       color: "#06b6d4" },
      { name: "Next.js",      icon: <SiNextdotjs />,   color: isDark ? "#e2e8f0" : "#111111" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#38BDF8" },
      { name: "TypeScript",   icon: <SiTypescript />,  color: "#3178C6" },
    ],
  },
  {
    title: "Backend APIs",
    emoji: "⚙️",
    accentFrom: "#34d399",
    accentTo: "#059669",
    desc: "Scalable REST & GraphQL APIs with clean architecture and full type safety.",
    tools: [
      { name: "Node.js",  icon: <FaNodeJs />,   color: "#16a34a" },
      { name: "Express",  icon: <SiExpress />,  color: isDark ? "#d1d5db" : "#555555" },
      { name: "Python",   icon: <FaPython />,   color: "#4B8BBE" },
      { name: "FastAPI",  icon: <SiFastapi />,  color: "#059669" },
    ],
  },
  {
    title: "Databases",
    emoji: "🗄️",
    accentFrom: "#fb923c",
    accentTo: "#dc2626",
    desc: "Flexible and relational data models — from documents to ACID transactions.",
    tools: [
      { name: "MongoDB",    icon: <SiMongodb />,    color: "#4DB33D" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: isDark ? "#4a90d9" : "#336791" },
    ],
  },
  {
    title: "Mobile",
    emoji: "📱",
    accentFrom: "#a855f7",
    accentTo: "#6366f1",
    desc: "Cross-platform native-feel apps for Android and iOS from one codebase.",
    tools: [
      { name: "React Native", icon: <FaReact />, color: "#06b6d4" },
    ],
  },
  {
    title: "DevOps & CI/CD",
    emoji: "🚀",
    accentFrom: "#38bdf8",
    accentTo: "#6366f1",
    desc: "Containerised deployments, automated pipelines, and infrastructure as code.",
    tools: [
      { name: "Docker",         icon: <FaDocker />, color: "#2496ED" },
      { name: "GitHub Actions", icon: <FaGithub />, color: isDark ? "#d1d5db" : "#1e293b" },
      { name: "Linux",          icon: <FaLinux />,  color: "#ca8a04" },
    ],
  },
  {
    title: "ML & AI",
    emoji: "🧠",
    accentFrom: "#f97316",
    accentTo: "#ef4444",
    desc: "Prototyping and production ML pipelines, from data wrangling to model serving.",
    tools: [
      { name: "Python",       icon: <FaPython />,      color: "#4B8BBE" },
      { name: "Scikit-Learn", icon: <SiScikitlearn />, color: "#F89939" },
      { name: "PyTorch",      icon: <SiPytorch />,     color: "#EE4C2C" },
    ],
  },
  {
    title: "Systems",
    emoji: "🔧",
    accentFrom: "#94a3b8",
    accentTo: "#475569",
    desc: "Performance-critical code and low-level systems programming.",
    tools: [
      { name: "C",   icon: <SiC />,         color: isDark ? "#7ab8e8" : "#5C8DBC" },
      { name: "C++", icon: <SiCplusplus />, color: isDark ? "#6a9fd8" : "#004482" },
    ],
  },
];

/* ─── Animation Variants ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── CorePill ───────────────────────────────────────────── */
function CorePill({ item, index, isDark }) {
  return (
    <motion.div
      custom={index}
      variants={scaleIn}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="relative flex items-center gap-2.5 px-5 py-2.5 rounded-full cursor-default select-none border"
      style={{
        background: item.bg,
        borderColor: `${item.color}40`,
        // Match app's card border style
        boxShadow: isDark
          ? `0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`
          : `0 1px 3px rgba(0,0,0,0.06)`,
      }}
    >
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

/* ─── CapabilityCard ─────────────────────────────────────── */
function CapabilityCard({ cap, index, isDark }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      whileHover={{ y: -4, transition: { duration: 0.22 } }}
      className={`relative rounded-2xl overflow-hidden group border ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
      }`}
      style={{
        boxShadow: isDark
          ? "0 4px 24px rgba(0,0,0,0.35)"
          : "0 2px 16px rgba(0,0,0,0.07)",
      }}
    >
      {/* Coloured top accent bar */}
      <div
        className="h-[3px] w-full"
        style={{ background: `linear-gradient(90deg, ${cap.accentFrom}, ${cap.accentTo})` }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${cap.accentFrom}15 0%, transparent 60%)`,
        }}
      />

      <div className="p-6 relative">
        {/* Title row */}
        <div className="flex items-center gap-3 mb-2.5">
          <span className="text-xl">{cap.emoji}</span>
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

        {/* Description — uses app's cardSubtle colour */}
        <p
          className={`text-sm leading-relaxed mb-5 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {cap.desc}
        </p>

        {/* Tool chips */}
        <div className="flex flex-wrap gap-2">
          {cap.tools.map((tool) => (
            <motion.div
              key={tool.name}
              whileHover={{ scale: 1.06, y: -1 }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
                isDark ? "border-gray-600" : "border-gray-100"
              }`}
              style={{
                background: isDark
                  ? `${tool.color}18`
                  : `${tool.color}10`,
                borderColor: `${tool.color}35`,
              }}
            >
              <span style={{ color: tool.color, fontSize: "0.875rem", display: "flex" }}>
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
  );
}

/* ─── Section Divider Label ──────────────────────────────── */
function SectionLabel({ emoji, label, isDark }) {
  return (
    <div className="flex items-center gap-3 mb-7">
      <span
        className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {emoji} {label}
      </span>
      <div
        className={`flex-1 h-px ${isDark ? "bg-gray-700" : "bg-gray-100"}`}
      />
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function Skills() {
  const { isDarkMode } = useTheme?.() ?? { isDarkMode: false };

  const CORE_STACK   = getCoreStack(isDarkMode);
  const CAPABILITIES = getCapabilities(isDarkMode);

  const headerRef    = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const coreRef      = useRef(null);
  const coreInView   = useInView(coreRef, { once: true, margin: "-50px" });

  return (
    <section
      id="skills"
      className={`relative py-24 px-5 mt-20 overflow-hidden ${
        isDarkMode ? "bg-gray-900/40" : "bg-white/60"
      }`}
    >
      {/* Ambient orbs — match app's indigo/sky accent palette */}
      <div
        className="absolute top-24 -left-48 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: isDarkMode
            ? "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
          filter: "blur(72px)",
        }}
      />
      <div
        className="absolute bottom-24 -right-48 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: isDarkMode
            ? "radial-gradient(circle, rgba(56,189,248,0.10) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          filter: "blur(72px)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          {/* Badge — matches app's badgeBg / badgeText */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.45 }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold uppercase tracking-widest border ${
              isDarkMode
                ? "bg-gray-700 text-gray-200 border-gray-600"
                : "bg-gray-50 text-gray-700 border-gray-100"
            }`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{
                background: isDarkMode ? "#818cf8" : "#6366f1",
              }}
            />
            Tech Stack
          </motion.div>

          {/* Heading — uses headingText colours, always readable */}
          <h2
            className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Built to{" "}
            <span
              className={`bg-gradient-to-r ${
                isDarkMode
                  ? "from-indigo-400 to-sky-400"
                  : "from-blue-500 to-indigo-600"
              } bg-clip-text text-transparent`}
            >
              Scale
            </span>
          </h2>

          {/* Subtitle — matches app's subtitleText */}
          <p
            className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Modern, battle-tested technologies powering everything from
            pixel-perfect UIs to containerised CI/CD pipelines.
          </p>

          {/* Animated rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-1 w-20 mx-auto mt-6 rounded-full origin-left"
            style={{
              background: isDarkMode
                ? "linear-gradient(90deg, #6366f1, #38bdf8)"
                : "linear-gradient(90deg, #3b82f6, #6366f1)",
            }}
          />
        </motion.div>

        {/* ── Core Stack ── */}
        <div className="mb-16">
          <motion.div
            ref={coreRef}
            initial={{ opacity: 0, y: 14 }}
            animate={coreInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
          >
            <SectionLabel emoji="⚡" label="Core Technologies" isDark={isDarkMode} />
          </motion.div>

          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
            initial="hidden"
            animate={coreInView ? "show" : "hidden"}
            className="flex flex-wrap justify-center gap-3"
          >
            {CORE_STACK.map((item, i) => (
              <CorePill key={item.name} item={item} index={i} isDark={isDarkMode} />
            ))}
          </motion.div>
        </div>

        {/* ── Capabilities ── */}
        <div>
          <SectionLabel emoji="🎯" label="Capabilities" isDark={isDarkMode} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPABILITIES.map((cap, i) => (
              <CapabilityCard
                key={cap.title}
                cap={cap}
                index={i}
                isDark={isDarkMode}
              />
            ))}
          </div>
        </div>

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={`text-center mt-14 text-xs ${
            isDarkMode ? "text-gray-500" : "text-gray-400"
          }`}
        >
          Always learning · Always shipping
        </motion.p>
      </div>
    </section>
  );
}