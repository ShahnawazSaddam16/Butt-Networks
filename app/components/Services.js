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
  Laptop,
  Code,
  Database,
  Smartphone,
  Globe,
  Palette,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    Icon: Laptop,
    name: "Web Development",
    desc: "Modern, responsive websites with pixel-perfect, accessible UIs built for performance.",
    badges: ["Frontend", "Responsive", "Accessible"],
    accentFrom: "#38bdf8",
    accentTo: "#6366f1",
  },
  {
    Icon: Code,
    name: "Software Development",
    desc: "Custom applications and workflow automation crafted in TypeScript, JS & Python.",
    badges: ["Backend", "Automation", "TypeScript"],
    accentFrom: "#34d399",
    accentTo: "#059669",
  },
  {
    Icon: Smartphone,
    name: "React Native",
    desc: "Cross-platform mobile experiences for Android & iOS from a single, maintainable codebase.",
    badges: ["Mobile", "iOS & Android", "Expo"],
    accentFrom: "#a855f7",
    accentTo: "#6366f1",
  },
  {
    Icon: Database,
    name: "Backend & APIs",
    desc: "Secure, testable REST & GraphQL APIs backed by PostgreSQL, MongoDB and Node.js.",
    badges: ["API", "PostgreSQL", "Node.js"],
    accentFrom: "#fb923c",
    accentTo: "#dc2626",
  },
  {
    Icon: Globe,
    name: "Deployment & DevOps",
    desc: "Cloud deployments, Docker containers, GitHub Actions CI/CD pipelines and SEO foundations.",
    badges: ["Docker", "CI/CD", "Cloud"],
    accentFrom: "#2496ED",
    accentTo: "#6366f1",
  },
  {
    Icon: Palette,
    name: "UI / UX Design",
    desc: "Polished interfaces, intuitive user flows and design systems that delight at every interaction.",
    badges: ["Design", "UX", "Systems"],
    accentFrom: "#f97316",
    accentTo: "#ef4444",
  },
];

// Shared spring for tilt & magnetic effects
const TILT_SPRING = { stiffness: 200, damping: 22, mass: 0.8 };

// Entrance animation variants — desktop vs mobile
const makeEntrance = (isMobile) => ({
  hidden: isMobile
    ? { opacity: 0, y: 20 }
    : { opacity: 0, y: 36, scale: 0.94, filter: "blur(4px)" },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: isMobile ? 0.38 : 0.55,
      delay: i * 0.07,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
});

/* ─────────────────────────────────────────────────────────────
   HOOKS
   ───────────────────────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────────────────────
   PURE COMPONENTS (no animation state)
   ───────────────────────────────────────────────────────────── */

function SectionLabel({ emoji, label, isDark, inView }) {
  return (
    <div className="flex items-center gap-3 mb-7">
      <motion.span
        initial={{ opacity: 0, x: -14 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
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

// CSS-only ambient orbs — zero JS during scroll
function AmbientOrbs({ isDark }) {
  return (
    <>
      <style>{`
        @keyframes svcOrb1{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(20px,-28px) scale(1.05)}70%{transform:translate(-14px,16px) scale(0.97)}}
        @keyframes svcOrb2{0%,100%{transform:translate(0,0) scale(1)}35%{transform:translate(-18px,22px) scale(1.04)}65%{transform:translate(12px,-14px) scale(0.97)}}
      `}</style>
      <div
        aria-hidden
        className="absolute -top-20 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle,rgba(99,102,241,.13) 0%,transparent 70%)"
            : "radial-gradient(circle,rgba(59,130,246,.07) 0%,transparent 70%)",
          filter: "blur(64px)",
          animation: "svcOrb1 14s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-20 -right-40 w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle,rgba(56,189,248,.10) 0%,transparent 70%)"
            : "radial-gradient(circle,rgba(168,85,247,.05) 0%,transparent 70%)",
          filter: "blur(64px)",
          animation: "svcOrb2 17s ease-in-out infinite",
          animationDelay: "5s",
          willChange: "transform",
        }}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   SERVICE CARD  (3-D tilt + cursor glow on desktop)
   ───────────────────────────────────────────────────────────── */

function ServiceCard({
  service,
  index,
  isDark,
  isMobile,
  prefersReduced,
  entrance,
}) {
  const cardRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-55px" });
  const [hovered, setHovered] = useState(false);

  /* Motion values for tilt */
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const springRotX = useSpring(rotX, TILT_SPRING);
  const springRotY = useSpring(rotY, TILT_SPRING);

  const glowBg = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, ${service.accentFrom}20, transparent 55%)`,
  );

  const onMouseMove = useCallback(
    (e) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rotX.set((py - 0.5) * -10);
      rotY.set((px - 0.5) * 10);
      glowX.set(px * 100);
      glowY.set(py * 100);
    },
    [rotX, rotY, glowX, glowY],
  );

  const onMouseLeave = useCallback(() => {
    rotX.set(0);
    rotY.set(0);
    glowX.set(50);
    glowY.set(50);
    setHovered(false);
  }, [rotX, rotY, glowX, glowY]);

  const desktop = !isMobile && !prefersReduced;

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={entrance}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      style={desktop ? { perspective: 900 } : {}}
    >
      <motion.article
        ref={cardRef}
        onMouseMove={desktop ? onMouseMove : undefined}
        onMouseEnter={desktop ? () => setHovered(true) : undefined}
        onMouseLeave={desktop ? onMouseLeave : undefined}
        whileHover={
          desktop ? { scale: 1.016, transition: { duration: 0.2 } } : {}
        }
        className={`relative flex flex-col rounded-2xl overflow-hidden border h-full ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        }`}
        style={{
          boxShadow: isDark
            ? "0 4px 28px rgba(0,0,0,0.3)"
            : "0 2px 18px rgba(0,0,0,0.07)",
          ...(desktop
            ? {
                rotateX: springRotX,
                rotateY: springRotY,
                transformStyle: "preserve-3d",
                willChange: "transform",
              }
            : {}),
        }}
      >
        {/* Accent bar + shimmer */}
        <div className="relative h-[3px] flex-none overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg,${service.accentFrom},${service.accentTo})`,
            }}
          />
          {desktop && (
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent)",
                backgroundSize: "60% 100%",
                backgroundRepeat: "no-repeat",
              }}
              initial={{ backgroundPositionX: "-60%" }}
              animate={inView ? { backgroundPositionX: "160%" } : {}}
              transition={{
                delay: index * 0.07 + 0.45,
                duration: 0.6,
                ease: "easeInOut",
              }}
            />
          )}
        </div>

        {/* Cursor glow */}
        {desktop && (
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: glowBg }}
          />
        )}

        {/* Body */}
        <div
          className="flex flex-col flex-1 p-6 gap-4 group"
          style={desktop ? { transform: "translateZ(8px)" } : {}}
        >
          {/* Icon + text */}
          <div className="flex items-start gap-4">
            {/* Icon with spinning ring on hover */}
            <div className="relative flex-none w-14 h-14">
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: `conic-gradient(${service.accentFrom},${service.accentTo},${service.accentFrom})`,
                  padding: "2px",
                }}
                animate={hovered ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  hovered
                    ? { duration: 2, repeat: Infinity, ease: "linear" }
                    : { duration: 0.4 }
                }
              >
                <div
                  className={`w-full h-full rounded-[10px] ${isDark ? "bg-gray-800" : "bg-white"}`}
                />
              </motion.div>
              <div
                className="absolute inset-[2px] rounded-[10px] flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg,${service.accentFrom}22,${service.accentTo}22)`,
                }}
              >
                <motion.div
                  animate={
                    hovered
                      ? { scale: 1.2, rotate: -8 }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={{ type: "spring", stiffness: 360, damping: 14 }}
                  style={{ color: service.accentFrom }}
                >
                  <service.Icon size={24} aria-hidden />
                </motion.div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3
                className={`text-base font-bold leading-snug ${isDark ? "text-gray-100" : "text-gray-900"}`}
              >
                {service.name}
              </h3>
              <p
                className={`mt-1.5 text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                {service.desc}
              </p>
            </div>
          </div>

          {/* Badges with staggered reveal */}
          <div className="flex flex-wrap gap-2">
            {service.badges.map((b, bi) => (
              <motion.span
                key={b}
                initial={{ opacity: 0, scale: 0.78 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: index * 0.07 + bi * 0.06 + 0.22,
                  duration: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                  isDark
                    ? "bg-gray-700 text-gray-200 border-gray-600"
                    : "bg-gray-50 text-gray-700 border-gray-100"
                }`}
              >
                {b}
              </motion.span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-auto pt-1">
            <motion.div
              whileHover={desktop ? { x: 2 } : {}}
              transition={{ type: "spring", stiffness: 380 }}
            >
              <Link
                href="/Contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg text-white transition-shadow hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg,${service.accentFrom},${service.accentTo})`,
                }}
              >
                Get Started
                <motion.span
                  animate={hovered && desktop ? { x: [0, 4, 0] } : {}}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight size={13} />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MOBILE CAROUSEL  (CSS scroll-snap, no external dep)
   ───────────────────────────────────────────────────────────── */

function MobileCarousel({ isDark, prefersReduced }) {
  const [active, setActive] = useState(0);

  const onScroll = useCallback((e) => {
    const idx = Math.round(
      e.currentTarget.scrollLeft / e.currentTarget.offsetWidth,
    );
    setActive(Math.min(idx, SERVICES.length - 1));
  }, []);

  return (
    <div className="md:hidden">
      <div
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-5 px-5"
        style={{ scrollbarWidth: "none" }}
        onScroll={onScroll}
      >
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.name}
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.38, delay: i * 0.05 }}
            className="snap-center flex-none w-[85vw] max-w-sm"
          >
            <article
              className={`rounded-2xl border overflow-hidden h-full ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-100"
              }`}
              style={{
                boxShadow: isDark
                  ? "0 4px 20px rgba(0,0,0,.3)"
                  : "0 2px 14px rgba(0,0,0,.07)",
              }}
            >
              <div
                className="h-[3px]"
                style={{
                  background: `linear-gradient(90deg,${s.accentFrom},${s.accentTo})`,
                }}
              />

              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className="w-11 h-11 flex-none rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg,${s.accentFrom}22,${s.accentTo}22)`,
                      border: `1.5px solid ${s.accentFrom}40`,
                      color: s.accentFrom,
                    }}
                  >
                    <s.Icon size={20} aria-hidden />
                  </div>
                  <div>
                    <h3
                      className={`text-sm font-bold ${isDark ? "text-gray-100" : "text-gray-900"}`}
                    >
                      {s.name}
                    </h3>
                    <p
                      className={`text-xs mt-1 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}
                    >
                      {s.desc}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {s.badges.map((b) => (
                    <span
                      key={b}
                      className={`text-[11px] px-2 py-0.5 rounded-full font-medium border ${
                        isDark
                          ? "bg-gray-700 text-gray-200 border-gray-600"
                          : "bg-gray-50 text-gray-700 border-gray-100"
                      }`}
                    >
                      {b}
                    </span>
                  ))}
                </div>

                <Link
                  href="/Contact"
                  className="self-start inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-lg text-white"
                  style={{
                    background: `linear-gradient(135deg,${s.accentFrom},${s.accentTo})`,
                  }}
                >
                  Get Started <ArrowRight size={11} />
                </Link>
              </div>
            </article>
          </motion.div>
        ))}
      </div>

      {/* Pill indicators */}
      <div className="flex justify-center gap-2 mt-3">
        {SERVICES.map((_, i) => (
          <motion.span
            key={i}
            animate={{
              width: i === active ? 20 : 6,
              opacity: i === active ? 1 : 0.3,
            }}
            transition={{ duration: 0.25 }}
            className={`h-1.5 rounded-full block ${isDark ? "bg-indigo-400" : "bg-indigo-500"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────────────────────── */

export default function Services() {
  const { isDarkMode } = useTheme?.() ?? { isDarkMode: false };
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion() ?? false;

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-50px" });

  // Memoised so cards don't recalculate on every render
  const entrance = React.useMemo(() => makeEntrance(isMobile), [isMobile]);

  return (
    <section
      id="services"
      className={`relative py-24 px-5 mt-20 overflow-hidden ${
        isDarkMode ? "bg-gray-900/40" : "bg-white/60"
      }`}
    >
      {!prefersReduced && <AmbientOrbs isDark={isDarkMode} />}

      <div className="relative max-w-6xl mx-auto">
        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-16">
          {/* Badge */}
          <motion.div
            initial={
              prefersReduced ? false : { opacity: 0, y: -14, scale: 0.9 }
            }
            animate={headerInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
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
            <Sparkles size={11} className="opacity-60" />
            Our Services
          </motion.div>

          {/* Heading */}
          <h2
            className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
          >
            {["What", "We", "Build"].map((word, i) => (
              <span key={word} className="inline-block mr-3">
                <motion.span
                  className={`inline-block ${
                    word === "Build"
                      ? `bg-gradient-to-r ${isDarkMode ? "from-indigo-400 to-sky-400" : "from-blue-500 to-indigo-600"} bg-clip-text text-transparent`
                      : ""
                  }`}
                  initial={
                    prefersReduced || isMobile
                      ? false
                      : { opacity: 0, y: 32, filter: "blur(10px)" }
                  }
                  animate={
                    headerInView
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : {}
                  }
                  transition={{
                    duration: 0.62,
                    delay: i * 0.11,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Subtitle */}
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.52,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Comprehensive software solutions from concept to deployment — expert
            services tailored for modern businesses.
          </motion.p>

          {/* Rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={headerInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{
              delay: 0.52,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-1 w-20 mx-auto mt-6 rounded-full origin-center"
            style={{
              background: isDarkMode
                ? "linear-gradient(90deg,#6366f1,#38bdf8)"
                : "linear-gradient(90deg,#3b82f6,#6366f1)",
            }}
          />
        </div>

        {/* ── Mobile carousel ── */}
        <MobileCarousel isDark={isDarkMode} prefersReduced={prefersReduced} />

        {/* ── Desktop grid ── */}
        <div ref={gridRef} className="hidden md:block">
          <SectionLabel
            emoji="✦"
            label="What we offer"
            isDark={isDarkMode}
            inView={gridInView}
          />

          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
            initial="hidden"
            animate={gridInView ? "show" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {SERVICES.map((s, i) => (
              <ServiceCard
                key={s.name}
                service={s}
                index={i}
                isDark={isDarkMode}
                isMobile={false}
                prefersReduced={prefersReduced}
                entrance={entrance}
              />
            ))}
          </motion.div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={`mt-16 rounded-2xl p-8 text-center border ${
            isDarkMode
              ? "bg-gray-800/60 border-gray-700"
              : "bg-gray-50 border-gray-100"
          }`}
        >
          <p
            className={`text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Not sure where to start?
          </p>
          <h3
            className={`text-xl font-extrabold mb-5 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
          >
            Let&apos;s talk about your project
          </h3>
          <motion.div
            whileHover={prefersReduced ? {} : { scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/Contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg hover:shadow-xl transition-shadow"
              style={{ background: "linear-gradient(135deg,#6366f1,#38bdf8)" }}
            >
              Book a free consultation
              <motion.span
                animate={prefersReduced ? {} : { x: [0, 5, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
