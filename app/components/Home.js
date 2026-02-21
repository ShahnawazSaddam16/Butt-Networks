"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useTheme } from "./ThemeProvider";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Hero() {
  // projects now include both light and dark image variants
  const projects = [
    { src: "/projects/Ecom/light-shop.png", title: "(E-commerce)" },
    { src: "/projects/Platform/Dashboard.png", title: "Admin Dashboard" },
    { src: "/projects/Digital/Near-footer.png", title: "Marketing Landing" },
    { src: "/projects/Portfolio/home.png", title: "Custom Portfolio" },
  ];

  const scrollerRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const { isDarkMode } = useTheme();

  // pointer / drag refs
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const userDraggingRef = useRef(false);
  const resumeTimeoutRef = useRef(null);

  // auto-scroll speed (px/sec) — tweak as needed
  const SPEED = 30;

  // RAF-driven auto-scroll (time-corrected)
  useEffect(() => {
    let rafId = 0;
    let lastTime = 0;

    function step(time) {
      if (!lastTime) lastTime = time;
      const deltaSec = (time - lastTime) / 1000;
      lastTime = time;

      const el = scrollerRef.current;
      if (el && !paused && !userDraggingRef.current) {
        el.scrollLeft += SPEED * deltaSec;
        // continuous-loop trick (we rendered items twice)
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }

      rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [paused]);

  // pointer/touch handlers
  const handlePointerDown = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    isPointerDownRef.current = true;
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    startXRef.current = clientX;
    startScrollLeftRef.current = el.scrollLeft;
    userDraggingRef.current = false;
    setPaused(true);

    if (e.pointerId && el.setPointerCapture) {
      try {
        el.setPointerCapture(e.pointerId);
      } catch (err) {}
    }

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  const handlePointerMove = (e) => {
    if (!isPointerDownRef.current) return;
    const el = scrollerRef.current;
    if (!el) return;

    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;
    const dx = clientX - startXRef.current;

    if (!userDraggingRef.current && Math.abs(dx) > 6)
      userDraggingRef.current = true;

    if (userDraggingRef.current) {
      el.scrollLeft = startScrollLeftRef.current - dx;

      // attempt to prevent vertical scroll when horizontal drag is dominant
      if (
        Math.abs(dx) > Math.abs((e.clientY ?? 0) - clientY) &&
        e.preventDefault
      ) {
        try {
          e.preventDefault();
        } catch (err) {}
      }
    }
  };

  const handlePointerUp = (e) => {
    const el = scrollerRef.current;
    isPointerDownRef.current = false;
    userDraggingRef.current = false;

    if (e?.pointerId && el?.releasePointerCapture) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }

    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setPaused(false);
      resumeTimeoutRef.current = null;
    }, 900);
  };

  // hover/focus handlers
  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setPaused(false), 350);
  };
  const handleTouchStart = (e) => handlePointerDown(e);
  const handleTouchMove = (e) => handlePointerMove(e);
  const handleTouchEnd = (e) => handlePointerUp(e);
  const handleFocus = () => setPaused(true);
  const handleBlur = () => setPaused(false);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  // helper: pick right classes depending on theme
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-gray-100";
  const cardInnerBg = isDarkMode ? "bg-gray-900" : "bg-white";
  const titleText = isDarkMode ? "text-gray-200" : "text-gray-700";
  const subtitleText = isDarkMode ? "text-gray-400" : "text-gray-700";
  const sectionBg = isDarkMode ? "bg-gray-900/60" : "bg-white/60";
  const gradientText = isDarkMode ? "from-blue-400 to-cyan-400" : "from-blue-600 to-indigo-600";

  return (
    <section
      id="home"
      aria-label="Home — Hero"
      className={`relative overflow-hidden ${sectionBg} py-16 sm:py-20 mt-18 md:mt-22 lg:mt-24 xl:mt-24`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        <div className="m-auto w-[1200px] max-w-full">
          <div
            aria-hidden
            className="absolute -right-20 top-0 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 opacity-18 blur-3xl transform-gpu"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* LEFT */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="text-center lg:text-left"
          >
            <motion.h1
              variants={fadeUp}
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <span className="block">
                Digital Solutions
              </span>
              <span
                className={`block mt-2 bg-gradient-to-r ${gradientText} bg-clip-text text-transparent`}
              >
                Built to Scale
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className={`mt-6 text-base sm:text-lg ${subtitleText} max-w-xl mx-auto lg:mx-0 leading-relaxed`}
            >
              Full-stack software development for modern businesses. Expert design, architecture, and deployment with proven technologies.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className={`mt-6 text-base sm:text-lg ${subtitleText} max-w-xl mx-auto lg:mx-0`}
            >
              <Typewriter
                words={[
                  "React & Next.js applications",
                  "Scalable backend architectures",
                  "Cloud deployment & DevOps",
                  "Mobile-first responsive design",
                  "Production-ready code quality",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={45}
                deleteSpeed={30}
                delaySpeed={1200}
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Link
                href="#services"
                aria-label="See our services"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                Explore Services
                <svg
                  className="ml-3 -mr-1 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </Link>

              <Link
                href="/Contact"
                className={`inline-flex items-center justify-center px-5 py-3 rounded-xl border ${
                  isDarkMode
                    ? "border-gray-700 text-white"
                    : "border-gray-300 text-gray-700"
                } font-semibold hover:bg-gray-100 transition`}
              >
                Contact Us
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-4 flex gap-4 justify-center lg:justify-start text-sm"
            >
              <a href="/#projects" className={`underline ${subtitleText}`}>
                See our work
              </a>
              <span aria-hidden className={subtitleText}>
                ·
              </span>
              <a href="/#founder" className={`underline ${subtitleText}`}>
                About the team
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="flex justify-center lg:justify-end lg:pt-2 xl:pt-4"
          >
            <div className="w-full max-w-md">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div
                    className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full ring-4 ${
                      isDarkMode ? "ring-gray-900" : "ring-white"
                    } overflow-hidden shadow-lg`}
                  >
                    <Image
                      src="/butt.png"
                      alt="Avatar"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Wahb & Shahnawaz
                  </div>
                  <div className={`text-xs ${subtitleText}`}>
                    Design + Frontend Engineering
                  </div>
                  <div
                    className={`mt-2 inline-flex items-center gap-2 text-xs ${subtitleText}`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M12 2v20M2 12h20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span>Based in — Asia</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:grid mt-6 grid-cols-2 gap-3">
                {projects.map((p, idx) => (
                  <a
                    key={idx}
                    className={`group relative block overflow-hidden rounded-lg ${cardBg} shadow-sm`}
                    href="/#projects"
                    aria-label={`Open project ${p.title}`}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    <div className={`relative aspect-[4/3] ${cardInnerBg}`}>
                      <Image
                        src={p.src}
                        alt={p.title}
                        fill
                        className="object-contain p-3"
                        sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/32 via-transparent opacity-0 group-hover:opacity-60 transition-opacity pointer-events-none" />
                    </div>

                    <div className={`p-2 text-xs ${titleText}`}>{p.title}</div>
                  </a>
                ))}
              </div>

              {/* MOBILE / SMALL: continuous loop scroller */}
              <div className="sm:hidden mt-6">
                <div
                  ref={scrollerRef}
                  className="flex gap-3 overflow-x-auto whitespace-nowrap"
                  style={{
                    WebkitOverflowScrolling: "touch",
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                >
                  {[...projects, ...projects].map((p, idx) => (
                    <a
                      key={idx}
                      className={`group relative block overflow-hidden rounded-lg ${cardBg} shadow-sm min-w-[220px] flex-shrink-0`}
                      href="/#projects"
                      aria-label={`Open project ${p.title}`}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    >
                      <div className={`relative aspect-[4/3] ${cardInnerBg}`}>
                        <Image
                          src={p.src}
                          alt={p.title}
                          fill
                          className="object-contain p-3"
                          sizes="200px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/32 via-transparent opacity-0 group-hover:opacity-60 transition-opacity pointer-events-none" />
                      </div>

                      <div className={`p-2 text-xs ${titleText}`}>
                        {p.title}
                      </div>
                    </a>
                  ))}
                </div>

                <div
                  className={`mt-2 flex items-center justify-between text-xs ${subtitleText}`}
                >
                  <div>{paused ? "Paused" : "Auto-scrolling"}</div>
                  <div className="text-right">
                    Swipe to interact • Tap to open
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
