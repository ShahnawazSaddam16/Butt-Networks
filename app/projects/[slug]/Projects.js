"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Github,
  ExternalLink,
  ChevronUp,
  Code2,
  Server,
  ArrowUpRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { Sora, Inter } from "next/font/google";

import { projects } from "../../../Data/projectsData";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const statusConfig = {
  Completed: {
    dot: "#22d3ee",
    bg: "rgba(34,211,238,0.12)",
    color: "#67e8f9",
  },
  "In Progress": {
    dot: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    color: "#fcd34d",
  },
  default: {
    dot: "#22d3ee",
    bg: "rgba(34,211,238,0.12)",
    color: "#67e8f9",
  },
};

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsMobile(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function RepoPopup({ frontendRepo, backendRepo }) {
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);
  const btnRef = useRef(null);
  const hasBackend = backendRepo && backendRepo.trim() !== "";

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (
        popupRef.current && !popupRef.current.contains(e.target) &&
        btnRef.current && !btnRef.current.contains(e.target)
      ) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [open]);

  if (!hasBackend) {
    return (
      <a
        href={frontendRepo}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-2xl border border-cyan-600/30 bg-white/[0.02] px-[18px] py-3 text-[13px] font-bold text-cyan-200 no-underline"
      >
        <Github size={15} />
        Repo
      </a>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-2xl border border-cyan-600/30 bg-white/[0.02] px-[18px] py-3 text-[13px] font-bold text-cyan-200 outline-none"
      >
        <Github size={15} />
        Repo
        <ChevronUp
          size={13}
          className={`transition-transform duration-300 ${open ? "rotate-0" : "rotate-180"}`}
        />
      </button>

      {open && (
        <div
          ref={popupRef}
          className="absolute bottom-[calc(100%+10px)] left-0 z-[100] flex min-w-[160px] flex-col gap-2 rounded-2xl border border-cyan-600/25 bg-slate-900/95 p-2.5 shadow-[0_-8px_32px_rgba(0,0,0,0.55),0_0_20px_rgba(34,211,238,0.08)] backdrop-blur-2xl"
        >
          <div className="absolute -bottom-1.5 left-5 h-2.5 w-2.5 rotate-45 border-b-0 border-l-0 border border-cyan-600/25 bg-slate-900/95" />
          <a
            href={frontendRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-[10px] border border-cyan-600/30 bg-cyan-600/5 px-3.5 py-2.5 text-[13px] font-bold text-cyan-200 no-underline transition-colors duration-200 hover:bg-cyan-600/10"
          >
            <Code2 size={14} />
            Frontend
          </a>
          <a
            href={backendRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-[10px] border border-cyan-600/30 bg-cyan-600/5 px-3.5 py-2.5 text-[13px] font-bold text-cyan-200 no-underline transition-colors duration-200 hover:bg-cyan-600/10"
          >
            <Server size={14} />
            Backend
          </a>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState(false);

  const status = statusConfig[project.status] || statusConfig.default;
  const images = project.gallery?.length ? project.gallery : [project.image];
  const isActive = isMobile ? false : hovered;
  const isSpotify = project.slug === "spotifyclone-app";
  const isFitPath = project.slug === "fitpath-app";
  const useContainImage = isSpotify || isFitPath;

  return (
    <div
      ref={ref}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(48px) scale(0.97)",
        transitionDelay: `${index * 0.1}s`,
      }}
      className={`relative flex h-[840px] w-full flex-col self-start overflow-hidden rounded-3xl bg-slate-800/40 backdrop-blur-md transition-all duration-700 ease-out ${
        isActive
          ? "border border-cyan-600/40 shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_35px_90px_rgba(0,0,0,0.65),0_0_55px_rgba(34,211,238,0.12)]"
          : "border border-slate-800 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ${
          isActive ? "bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_65%)]" : ""
        }`}
      />

      <div className="relative z-10 flex flex-col">
        <div className="relative">
          <Swiper
            modules={[Pagination, EffectFade]}
            slidesPerView={1}
            effect="fade"
            pagination={{ clickable: true }}
            loop={images.length > 1}
            style={{ width: "100%", height: "240px" }}
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <div className={`relative h-[240px] w-full ${useContainImage ? "bg-black" : "bg-transparent"}`}>
                  <Image src={img} alt={project.Heading} fill style={{ objectFit: useContainImage ? "contain" : "cover" }} />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-slate-900/95" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            style={{ background: status.bg, border: `1px solid ${status.dot}50` }}
            className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full px-3.5 py-[7px] backdrop-blur-md"
          >
            <span style={{ background: status.dot, boxShadow: `0 0 12px ${status.dot}` }} className="h-2 w-2 rounded-full" />
            <span style={{ color: status.color }} className="text-[11px] font-bold uppercase tracking-[0.08em]">
              {project.status}
            </span>
          </div>
        </div>

        <div className="flex flex-col p-[26px]">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 className={`${sora.className} bg-gradient-to-br from-cyan-300 to-cyan-500 bg-clip-text text-2xl font-black leading-tight text-transparent`}>
                {project.Heading}
              </h2>
              <div className="mt-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-slate-400">
                {project.category}
              </div>
            </div>
          </div>

          <p className={`${inter.className} mb-[18px] text-sm leading-[1.8] text-slate-300/80`}>
            {project.Text}
          </p>

          <div className="mb-5 flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="rounded-full border border-cyan-600/20 bg-cyan-600/10 px-3 py-1.5 text-[11px] font-bold tracking-[0.04em] text-cyan-200"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mb-[22px] grid grid-cols-2 gap-4 rounded-2xl border border-slate-800 bg-white/[0.03] p-[18px]">
            {[
              { label: "Author", val: project.author },
              { label: "Role", val: project.role },
              { label: "Start", val: project.startDate },
              { label: "End", val: project.endDate },
            ].map(({ label, val }) => (
              <div key={label}>
                <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400/70">
                  {label}
                </div>
                <div className="text-[13px] font-bold leading-relaxed text-slate-100">
                  {val}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-1 flex flex-wrap gap-3">
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-2xl bg-cyan-600 px-[18px] py-3 text-[13px] font-bold text-white no-underline transition-all duration-300 hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-600/30"
            >
              <ExternalLink size={15} />
              Live Demo
            </a>

            <RepoPopup frontendRepo={project.frontendRepo} backendRepo={project.backendRepo} />

            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/40 px-[18px] py-3 text-[13px] font-bold text-slate-300 no-underline transition-all duration-200 hover:border-cyan-600/60 hover:text-cyan-400"
            >
              Read More
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ limit = 10, single = false }) {
  const displayedProjects = single ? projects.slice(0, 1) : projects.slice(0, limit);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef);

  return (
    <>
      <style>{`
        .projects-swiper .swiper-button-next,
        .projects-swiper .swiper-button-prev {
          width: 48px; height: 48px;
          background: rgba(15,23,42,0.88);
          border: 1px solid rgba(34,211,238,0.2);
          border-radius: 999px;
          color: #22d3ee;
          backdrop-filter: blur(10px);
          transition: 0.3s ease;
        }
        .projects-swiper .swiper-button-next:hover,
        .projects-swiper .swiper-button-prev:hover {
          background: rgba(34,211,238,0.12);
          transform: scale(1.08);
          border-color: rgba(34,211,238,0.4);
        }
        .projects-swiper .swiper-button-next::after,
        .projects-swiper .swiper-button-prev::after { font-size: 14px; font-weight: 900; }
        .projects-swiper .swiper-pagination-bullet { background: rgba(34,211,238,0.4); opacity: 1; }
        .projects-swiper .swiper-pagination-bullet-active { background: #22d3ee; transform: scale(1.3); }
        .projects-swiper .swiper-wrapper { align-items: flex-start !important; }
        .projects-swiper .swiper-slide { height: auto !important; align-self: flex-start !important; display: block !important; }
        @keyframes pulseLine {
          0%, 100% { opacity: .5; transform: scaleX(.9); }
          50% { opacity: 1; transform: scaleX(1); }
        }
        @keyframes popupFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section id="Projects" className={`${inter.className} relative overflow-hidden bg-slate-900 px-6 pb-[90px] pt-[110px]`}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_50%)]" />

        <div
          ref={headingRef}
          style={{
            opacity: headingInView ? 1 : 0,
            transform: headingInView ? "translateY(0)" : "translateY(24px)",
          }}
          className="relative z-10 mb-[70px] text-center transition-all duration-700 ease-out"
        >
          <p className="mb-3.5 text-xs font-extrabold uppercase tracking-[0.25em] text-cyan-400">
            Selected Work
          </p>
          <h1 className={`${sora.className} mb-6 bg-gradient-to-br from-slate-50 via-cyan-300 to-cyan-500 bg-clip-text text-[clamp(38px,6vw,58px)] font-black leading-[1.1] tracking-[-0.04em] text-transparent`}>
            Featured Projects
          </h1>
          <div className="flex items-center justify-center gap-3.5">
            <div className="h-px w-[70px] bg-gradient-to-l from-cyan-600/80 to-transparent [animation:pulseLine_2.8s_ease-in-out_infinite]" />
            <div className="h-[7px] w-[7px] rounded-full bg-cyan-400 shadow-[0_0_16px_#22d3ee]" />
            <div className="h-px w-[70px] bg-gradient-to-r from-cyan-600/80 to-transparent [animation:pulseLine_2.8s_ease-in-out_infinite]" />
          </div>
        </div>

        <div className="relative z-10">
          <Swiper
            className="projects-swiper"
            modules={[Navigation, Pagination]}
            spaceBetween={28}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            style={{ paddingBottom: "60px" }}
          >
            {displayedProjects.map((project, index) => (
              <SwiperSlide key={index}>
                <ProjectCard project={project} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}