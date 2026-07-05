"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code2,
  Server,
  ChevronUp,
  CheckCircle2,
  Zap,
  TrendingUp,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { projects } from "../../../Data/projectsData";

const statusConfig = {
  Completed: { dot: "#22c55e", bg: "rgba(34,197,94,0.12)", color: "#86efac" },
  "In Progress": { dot: "#f59e0b", bg: "rgba(245,158,11,0.12)", color: "#fcd34d" },
  default: { dot: "#60a5fa", bg: "rgba(96,165,250,0.12)", color: "#93c5fd" },
};

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function RepoButtons({ frontendRepo, backendRepo }) {
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);
  const btnRef = useRef(null);
  const hasBackend = backendRepo && backendRepo.trim() !== "";

  useEffect(() => {
    if (!open) return;
    function h(e) {
      if (popupRef.current && !popupRef.current.contains(e.target) && btnRef.current && !btnRef.current.contains(e.target))
        setOpen(false);
    }
    document.addEventListener("mousedown", h);
    document.addEventListener("touchstart", h);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("touchstart", h); };
  }, [open]);

  if (!hasBackend) {
    return (
      <a
        href={frontendRepo}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-cyan-200 border border-cyan-500/30 bg-white/[0.02] hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-300"
      >
        <Github size={16} />
        View Repo
      </a>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-cyan-200 border border-cyan-500/30 bg-white/[0.02] hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer outline-none"
      >
        <Github size={16} />
        View Repo
        <ChevronUp
          size={13}
          style={{ transform: open ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.25s ease" }}
        />
      </button>

      {open && (
        <div
          ref={popupRef}
          className="absolute bottom-[calc(100%+10px)] left-0 z-50 flex flex-col gap-2 p-2.5 min-w-[160px] rounded-2xl border border-cyan-500/25"
          style={{
            background: "linear-gradient(135deg, rgba(7,21,27,0.98) 0%, rgba(8,38,47,0.98) 100%)",
            boxShadow: "0 -8px 32px rgba(0,0,0,0.55), 0 0 20px rgba(34,211,238,0.08)",
            backdropFilter: "blur(16px)",
            animation: "popupFadeIn 0.2s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div
            className="absolute -bottom-1.5 left-5 w-2.5 h-2.5 border-b border-r border-cyan-500/25"
            style={{ background: "rgba(8,38,47,0.98)", transform: "rotate(45deg)" }}
          />
          <a
            href={frontendRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-[13px] font-bold text-cyan-200 border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/12 transition-colors no-underline"
          >
            <Code2 size={14} />
            Frontend
          </a>
          <a
            href={backendRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-[13px] font-bold text-indigo-200 border border-indigo-400/30 bg-indigo-500/5 hover:bg-indigo-500/12 transition-colors no-underline"
          >
            <Server size={14} />
            Backend
          </a>
        </div>
      )}
    </div>
  );
}

function SectionList({ title, items, icon: Icon, accentColor }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)",
        background: "linear-gradient(135deg, rgba(7,21,27,0.95) 0%, rgba(8,38,47,0.95) 100%)",
        border: "1px solid rgba(34,211,238,0.1)",
        borderRadius: "20px",
        padding: "28px",
      }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            background: `${accentColor}18`,
            border: `1px solid ${accentColor}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={18} style={{ color: accentColor }} />
        </div>
        <h3 style={{ color: accentColor, fontSize: "16px", fontWeight: 800, letterSpacing: "0.03em" }}>{title}</h3>
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: accentColor,
                boxShadow: `0 0 10px ${accentColor}`,
                marginTop: 9,
                flexShrink: 0,
              }}
            />
            <span style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: 1.75 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectDetailPage({ params }) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const status = statusConfig[project.status] || statusConfig.default;
  const images = project.gallery?.length ? project.gallery : [project.image];
  const isSpotify = project.slug === "spotifyclone-app";
  const isFitPath = project.slug === "fitpath-app";
  const useContainImage = isSpotify || isFitPath;

  return (
    <>
      <style>{`
        .detail-swiper .swiper-button-next,
        .detail-swiper .swiper-button-prev {
          width: 44px; height: 44px;
          background: rgba(7,21,27,0.88);
          border: 1px solid rgba(34,211,238,0.25);
          border-radius: 999px;
          color: #67e8f9;
          backdrop-filter: blur(10px);
          transition: 0.3s ease;
        }
        .detail-swiper .swiper-button-next:hover,
        .detail-swiper .swiper-button-prev:hover {
          background: rgba(34,211,238,0.12);
          border-color: rgba(34,211,238,0.5);
          transform: scale(1.08);
        }
        .detail-swiper .swiper-button-next::after,
        .detail-swiper .swiper-button-prev::after { font-size: 13px; font-weight: 900; }
        .detail-swiper .swiper-pagination-bullet { background: rgba(103,232,249,0.4); opacity: 1; }
        .detail-swiper .swiper-pagination-bullet-active { background: #67e8f9; transform: scale(1.3); }
        @keyframes popupFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 8px currentColor; }
          50% { box-shadow: 0 0 18px currentColor; }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(34,211,238,0.07), transparent)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", padding: "0 24px 80px" }}>

          <FadeIn delay={0}>
            <div className="flex items-center justify-between pt-8 pb-2">
              <Link
                href="/#Projects"
                className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300/80 hover:text-cyan-300 transition-colors no-underline group"
              >
                <ArrowLeft
                  size={16}
                  style={{ transition: "transform 0.25s ease" }}
                  className="group-hover:-translate-x-1"
                />
                Back to Projects
              </Link>

              <div
                style={{
                  background: status.bg,
                  border: `1px solid ${status.dot}50`,
                  padding: "6px 14px",
                  borderRadius: "999px",
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: status.dot,
                    animation: "pulseDot 2s ease-in-out infinite",
                    color: status.dot,
                  }}
                />
                <span style={{ color: status.color, fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {project.status}
                </span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="mt-10 mb-3">
              <p style={{ color: "#22d3ee", fontSize: "12px", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "10px" }}>
                {project.category}
              </p>
              <h1
                style={{
                  fontSize: "clamp(32px,5.5vw,62px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.08,
                  background: "linear-gradient(135deg, #f8fafc 0%, #67e8f9 45%, #818cf8 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gradientShift 6s ease infinite",
                  marginBottom: "12px",
                }}
              >
                {project.Heading}
              </h1>
              <p style={{ color: "rgba(226,232,240,0.75)", fontSize: "clamp(15px,2vw,18px)", lineHeight: 1.7, maxWidth: "700px" }}>
                {project.Text}
              </p>
            </div>
          </FadeIn>

          <div className="flex flex-col lg:flex-row gap-10 mt-10">

            <FadeIn delay={0.1} className="w-full lg:w-[55%] xl:w-[58%] flex-shrink-0">
              <div
                style={{
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: "1px solid rgba(34,211,238,0.18)",
                  boxShadow: "0 24px 80px rgba(0,0,0,0.55), 0 0 60px rgba(34,211,238,0.06)",
                  background: "#000",
                }}
              >
                <Swiper
                  className="detail-swiper"
                  modules={[Navigation, Pagination, EffectFade, Autoplay]}
                  slidesPerView={1}
                  effect="fade"
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3500, disableOnInteraction: true }}
                  loop={images.length > 1}
                  style={{ width: "100%", aspectRatio: "16/9" }}
                >
                  {images.map((img, i) => (
                    <SwiperSlide key={i}>
                      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: isSpotify ? "#000" : "rgba(7,21,27,1)" }}>
                        <Image
                          src={img}
                          alt={`${project.Heading} screenshot ${i + 1}`}
                          fill
                          style={{ objectFit: useContainImage ? "contain" : "cover" }}
                          priority={i === 0}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <FadeIn delay={0.2}>
                <div
                  style={{
                    marginTop: "24px",
                    background: "linear-gradient(135deg, rgba(7,21,27,0.95), rgba(8,38,47,0.95))",
                    border: "1px solid rgba(34,211,238,0.1)",
                    borderRadius: "20px",
                    padding: "24px 28px",
                  }}
                >
                  <p style={{ color: "#94a3b8", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
                    About this project
                  </p>
                  <p style={{ color: "#cbd5e1", fontSize: "14.5px", lineHeight: 1.85 }}>
                    {project.description}
                  </p>
                </div>
              </FadeIn>
            </FadeIn>

            <div className="w-full lg:flex-1 flex flex-col gap-6">

              <FadeIn delay={0.15}>
                <div
                  style={{
                    background: "linear-gradient(135deg, rgba(7,21,27,0.95), rgba(8,38,47,0.95))",
                    border: "1px solid rgba(34,211,238,0.12)",
                    borderRadius: "20px",
                    padding: "24px 26px",
                  }}
                >
                  <p style={{ color: "#94a3b8", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "18px" }}>
                    Project Info
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Author", val: project.author },
                      { label: "Role", val: project.role },
                      { label: "Start Date", val: project.startDate },
                      { label: "End Date", val: project.endDate },
                    ].map(({ label, val }) => (
                      <div key={label}>
                        <div style={{ fontSize: "10px", color: "rgba(148,163,184,0.65)", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
                          {label}
                        </div>
                        <div style={{ color: "#f1f5f9", fontSize: "13.5px", fontWeight: 700, lineHeight: 1.5 }}>
                          {val}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div
                  style={{
                    background: "linear-gradient(135deg, rgba(7,21,27,0.95), rgba(8,38,47,0.95))",
                    border: "1px solid rgba(34,211,238,0.12)",
                    borderRadius: "20px",
                    padding: "24px 26px",
                  }}
                >
                  <p style={{ color: "#94a3b8", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          background: "rgba(34,211,238,0.08)",
                          border: "1px solid rgba(34,211,238,0.2)",
                          color: "#a5f3fc",
                          padding: "7px 14px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: 700,
                          letterSpacing: "0.03em",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.25}>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white no-underline transition-all duration-300 hover:opacity-90 hover:scale-[1.03]"
                    style={{ background: "linear-gradient(135deg,#06b6d4,#6366f1)" }}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <RepoButtons frontendRepo={project.frontendRepo} backendRepo={project.backendRepo} />
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            <SectionList
              title="Features"
              items={project.features}
              icon={Zap}
              accentColor="#22d3ee"
            />
            <SectionList
              title="Challenges"
              items={project.challenges}
              icon={CheckCircle2}
              accentColor="#818cf8"
            />
            <SectionList
              title="Outcomes"
              items={project.outcomes}
              icon={TrendingUp}
              accentColor="#34d399"
            />
          </div>

          <FadeIn delay={0.1}>
            <div className="mt-14 flex justify-center">
              <Link
                href="/#Projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-cyan-200 border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/12 hover:border-cyan-400/50 transition-all duration-300 no-underline"
              >
                <ArrowLeft size={16} />
                Back to All Projects
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
}