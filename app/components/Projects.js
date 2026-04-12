"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  FolderOpen,
  Download,
} from "lucide-react";
import { projects as defaultProjects } from "../data/projects";
import { useTheme } from "./ThemeProvider";

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────── */

const normalizeUrl = (raw) =>
  raw && String(raw).startsWith("http") ? raw : `https://${raw}`;

const getRepoLabel = (raw) => {
  try {
    const url = new URL(normalizeUrl(raw));
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length >= 2)
      return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
    if (parts.length === 1) return parts[0];
    return url.hostname;
  } catch {
    return String(raw).replace(/^https?:\/\//, "");
  }
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/* ─────────────────────────────────────────────────────────────
   CSS-ONLY AMBIENT ORBS
   ───────────────────────────────────────────────────────────── */

function AmbientOrbs({ isDark }) {
  return (
    <>
      <style>{`
        @keyframes prjOrb1{0%,100%{transform:translate(0,0) scale(1)}45%{transform:translate(24px,-32px) scale(1.06)}70%{transform:translate(-16px,18px) scale(0.96)}}
        @keyframes prjOrb2{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(-20px,24px) scale(1.04)}65%{transform:translate(14px,-14px) scale(0.97)}}
      `}</style>
      <div
        aria-hidden
        className="absolute -top-24 -left-32 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle,rgba(99,102,241,.12) 0%,transparent 68%)"
            : "radial-gradient(circle,rgba(59,130,246,.07) 0%,transparent 68%)",
          filter: "blur(64px)",
          animation: "prjOrb1 16s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -right-32 w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle,rgba(56,189,248,.09) 0%,transparent 68%)"
            : "radial-gradient(circle,rgba(168,85,247,.05) 0%,transparent 68%)",
          filter: "blur(64px)",
          animation: "prjOrb2 19s ease-in-out infinite",
          animationDelay: "6s",
          willChange: "transform",
        }}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION LABEL  (matches global design system)
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
   IMAGE CAROUSEL  (shared by card + single view)
   ───────────────────────────────────────────────────────────── */

function ImageCarousel({
  images = [],
  projectId,
  isDark,
  heightClass = "h-52",
}) {
  const [idx, setIdx] = useState(0);
  const total = images.length;

  const go = useCallback(
    (dir) => {
      setIdx((p) => (p + dir + total) % total);
    },
    [total],
  );

  if (total === 0) {
    return (
      <div
        className={`relative ${heightClass} flex items-center justify-center ${isDark ? "bg-gray-700" : "bg-gray-100"}`}
      >
        <FolderOpen
          size={32}
          className={isDark ? "text-gray-500" : "text-gray-300"}
        />
      </div>
    );
  }

  return (
    <div className={`relative ${heightClass} overflow-hidden group`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[idx]}
            alt={`Screenshot ${idx + 1}`}
            fill
            className="object-contain p-3"
            sizes="(max-width:768px) 90vw, (max-width:1200px) 50vw, 35vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Nav buttons — visible on hover */}
      {total > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Previous image"
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isDark ? "bg-gray-900/80 text-gray-200" : "bg-white/90 text-gray-700"} shadow-md backdrop-blur-sm`}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => go(+1)}
            aria-label="Next image"
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isDark ? "bg-gray-900/80 text-gray-200" : "bg-white/90 text-gray-700"} shadow-md backdrop-blur-sm`}
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {total > 1 && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to image ${i + 1}`}
              className="transition-all duration-200"
              style={{
                width: i === idx ? 16 : 6,
                height: 6,
                borderRadius: 99,
                background:
                  i === idx
                    ? "#6366f1"
                    : isDark
                      ? "rgba(255,255,255,0.3)"
                      : "rgba(0,0,0,0.2)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   REPO CHOOSER MODAL
   ───────────────────────────────────────────────────────────── */

function RepoModal({ links, title, isDark, onClose }) {
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(10px)", background: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-sm rounded-2xl overflow-hidden border ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-100"}`}
        style={{
          boxShadow: isDark
            ? "0 24px 64px rgba(0,0,0,.7)"
            : "0 24px 64px rgba(0,0,0,.15)",
        }}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-3">
          <div>
            <h3
              className={`text-base font-bold ${isDark ? "text-gray-100" : "text-gray-900"}`}
            >
              Choose a repository
            </h3>
            <p
              className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              {title}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-none transition-colors ${isDark ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}
          >
            <X size={15} />
          </button>
        </div>

        <div
          className={`h-px mx-6 ${isDark ? "bg-gray-700" : "bg-gray-100"}`}
        />

        {/* Repo list */}
        <ul className="px-6 py-4 space-y-2 max-h-64 overflow-auto">
          {links.map((link, i) => {
            const url = typeof link === "string" ? link : link?.url;
            if (!url) return null;
            const label = link?.name || getRepoLabel(url);
            return (
              <li key={i}>
                <motion.button
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 380 }}
                  onClick={() => {
                    window.open(
                      normalizeUrl(url),
                      "_blank",
                      "noopener,noreferrer",
                    );
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                    isDark
                      ? "hover:bg-gray-800 text-gray-200"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Github
                      size={15}
                      className={isDark ? "text-gray-400" : "text-gray-500"}
                    />
                    {label}
                  </span>
                  <ExternalLink
                    size={13}
                    className={isDark ? "text-gray-500" : "text-gray-400"}
                  />
                </motion.button>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   AUTHOR CHIP
   ───────────────────────────────────────────────────────────── */

function AuthorChip({ author, isDark }) {
  const href = normalizeUrl(author.portfolio || "#");
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2.5 group"
      aria-label={`${author.name}'s portfolio`}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-none"
        style={{ background: "linear-gradient(135deg,#6366f1,#38bdf8)" }}
      >
        {getInitials(author.name)}
      </div>
      <div>
        <p
          className={`text-xs font-semibold leading-none group-hover:underline ${isDark ? "text-gray-200" : "text-gray-800"}`}
        >
          {author.name}
        </p>
        <p
          className={`text-[10px] mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
        >
          {author.role}
        </p>
      </div>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROJECT CARD  (grid view)
   ───────────────────────────────────────────────────────────── */

function ProjectCard({ project, index, isDark, prefersReduced, onOpenRepo }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-55px" });

  const accentFrom = "#6366f1";
  const accentTo = "#38bdf8";

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      style={prefersReduced ? {} : { perspective: 800 }}
    >
      <motion.article
        whileHover={
          prefersReduced
            ? {}
            : { y: -6, scale: 1.012, transition: { duration: 0.22 } }
        }
        className={`relative rounded-2xl overflow-hidden border flex flex-col h-full group ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        }`}
        style={{
          boxShadow: isDark
            ? "0 4px 28px rgba(0,0,0,.32)"
            : "0 2px 18px rgba(0,0,0,.08)",
        }}
      >
        {/* Accent top bar */}
        <div className="relative h-[3px] flex-none overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg,${accentFrom},${accentTo})`,
            }}
          />
          {!prefersReduced && (
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)",
                backgroundSize: "60% 100%",
                backgroundRepeat: "no-repeat",
              }}
              initial={{ backgroundPositionX: "-60%" }}
              animate={inView ? { backgroundPositionX: "160%" } : {}}
              transition={{
                delay: index * 0.1 + 0.4,
                duration: 0.6,
                ease: "easeInOut",
              }}
            />
          )}
        </div>

        {/* Hover glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at top left,${accentFrom}18 0%,transparent 60%)`,
          }}
        />

        {/* Image carousel */}
        <div className={`${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
          <ImageCarousel
            images={project.images}
            projectId={project.id}
            isDark={isDark}
            heightClass="h-44 sm:h-52"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 gap-4">
          {/* Title + action buttons */}
          <div className="flex items-start justify-between gap-3">
            <h3
              className={`text-base font-bold leading-snug ${isDark ? "text-gray-100" : "text-gray-900"}`}
            >
              {project.heading}
            </h3>
            <div className="flex items-center gap-2 flex-none">
              {project.githubLink && (
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    onOpenRepo(project.githubLink, project.heading)
                  }
                  aria-label="View repository"
                  className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
                    isDark
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Github size={15} />
                </motion.button>
              )}
              {project.demoLink && (
                <motion.a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    project.type === "non-web" ? "Download" : "Live demo"
                  }
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                  style={{
                    background: `linear-gradient(135deg,${accentFrom},${accentTo})`,
                  }}
                >
                  {project.type === "non-web" ? (
                    <Download size={14} />
                  ) : (
                    <ExternalLink size={14} />
                  )}
                </motion.a>
              )}
            </div>
          </div>

          {/* Description */}
          <p
            className={`text-sm leading-relaxed flex-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech?.map((t, ti) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: index * 0.08 + ti * 0.05 + 0.3,
                  duration: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${
                  isDark
                    ? "bg-gray-700 text-gray-300 border-gray-600"
                    : "bg-gray-50 text-gray-600 border-gray-100"
                }`}
              >
                {t}
              </motion.span>
            ))}
          </div>

          {/* Authors + case study link */}
          <div
            className={`flex items-center justify-between pt-3 border-t ${isDark ? "border-gray-700" : "border-gray-100"}`}
          >
            <div className="flex items-center gap-3 flex-wrap">
              {project.authors?.slice(0, 2).map((a) => (
                <AuthorChip key={a.name} author={a} isDark={isDark} />
              ))}
            </div>
            <motion.div
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 380 }}
            >
              <Link
                href={`/projects/${project.id}`}
                className={`flex items-center gap-1 text-xs font-semibold ${isDark ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-500"} transition-colors`}
              >
                Case study <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SINGLE PROJECT / CASE STUDY VIEW
   ───────────────────────────────────────────────────────────── */

function SingleProjectView({ project, isDark, prefersReduced, onOpenRepo }) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  if (!project)
    return <div className="p-10 text-center">Project not found.</div>;

  return (
    <main
      className={`min-h-screen py-12 px-4 md:px-8 lg:px-16 ${isDark ? "text-gray-100" : "text-gray-900"}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/projects"
            className={`inline-flex items-center gap-1.5 text-sm font-medium mb-8 ${isDark ? "text-gray-400 hover:text-indigo-400" : "text-gray-500 hover:text-indigo-600"} transition-colors`}
          >
            <ChevronLeft size={15} /> Back to projects
          </Link>
        </motion.div>

        <div
          ref={headerRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12"
        >
          {/* LEFT: image carousel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`rounded-2xl overflow-hidden border sticky top-24 ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-gray-50"}`}
            style={{
              boxShadow: isDark
                ? "0 4px 32px rgba(0,0,0,.35)"
                : "0 4px 24px rgba(0,0,0,.1)",
            }}
          >
            <ImageCarousel
              images={project.images}
              projectId={project.id}
              isDark={isDark}
              heightClass="h-64 sm:h-80 md:h-96"
            />
          </motion.div>

          {/* RIGHT: meta */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Title */}
            <div>
              <h1
                className={`text-3xl sm:text-4xl font-black tracking-tight mb-2 ${isDark ? "text-gray-100" : "text-gray-900"}`}
              >
                {project.heading}
              </h1>
              <p
                className={`text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                {project.description}
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              {project.githubLink && (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    onOpenRepo(project.githubLink, project.heading)
                  }
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                    isDark
                      ? "border-gray-600 text-gray-200 hover:bg-gray-700"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Github size={16} /> View Repository
                </motion.button>
              )}
              {project.demoLink && (
                <motion.a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg hover:shadow-xl transition-shadow"
                  style={{
                    background: "linear-gradient(135deg,#6366f1,#38bdf8)",
                  }}
                >
                  {project.type === "non-web" ? (
                    <Download size={15} />
                  ) : (
                    <ExternalLink size={15} />
                  )}
                  {project.type === "non-web" ? "Download" : "Live Demo"}
                </motion.a>
              )}
            </div>

            {/* Tech chips */}
            {project.tech?.length > 0 && (
              <div>
                <p
                  className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                >
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-semibold ${isDark ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-gray-50 text-gray-700 border-gray-100"}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            <div
              className={`rounded-xl p-4 border ${isDark ? "bg-gray-800/60 border-gray-700" : "bg-gray-50 border-gray-100"}`}
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { label: "Started", value: project.startDate ?? "—" },
                  { label: "Ended", value: project.endDate ?? "—" },
                  { label: "Status", value: project.status ?? "—" },
                ].map((item) => (
                  <div key={item.label}>
                    <p
                      className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                    >
                      {item.label}
                    </p>
                    <p
                      className={`text-sm font-semibold ${isDark ? "text-gray-200" : "text-gray-800"}`}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Authors */}
            {project.authors?.length > 0 && (
              <div>
                <p
                  className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                >
                  Authors
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.authors.map((a) => (
                    <AuthorChip key={a.name} author={a} isDark={isDark} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Case study body */}
        {(project.description || project.highlights?.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={`rounded-2xl border p-8 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
            style={{
              boxShadow: isDark
                ? "0 4px 24px rgba(0,0,0,.25)"
                : "0 2px 16px rgba(0,0,0,.07)",
            }}
          >
            <h2
              className={`text-2xl font-black mb-4 ${isDark ? "text-gray-100" : "text-gray-900"}`}
            >
              Case Study
            </h2>
            <p
              className={`text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}
            >
              {project.description}
            </p>

            {project.highlights?.length > 0 && (
              <div className="mt-6">
                <h3
                  className={`text-sm font-bold uppercase tracking-widest mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Highlights
                </h3>
                <ul className="space-y-3">
                  {project.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.4 }}
                      className={`flex items-start gap-3 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-none"
                        style={{
                          background: "linear-gradient(135deg,#6366f1,#38bdf8)",
                        }}
                      />
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────────────────────── */

export default function Projects({
  limit = 3,
  projects: projectsData = defaultProjects,
  heading = "Our Work",
  subHeading = "Modern, fast and built for real users",
  single = false,
}) {
  const { isDarkMode } = useTheme();
  const prefersReduced = useReducedMotion() ?? false;

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-50px" });

  // Repo modal state
  const [repoModal, setRepoModal] = useState(null); // { links, title }

  const openRepo = useCallback((githubLink, title = "Repository") => {
    if (!githubLink) return;
    const links = Array.isArray(githubLink)
      ? githubLink
          .map((l) => (typeof l === "string" ? { url: l } : l))
          .filter(Boolean)
      : [{ url: githubLink }];
    if (links.length === 0) return;
    if (links.length === 1) {
      window.open(normalizeUrl(links[0].url), "_blank", "noopener,noreferrer");
      return;
    }
    setRepoModal({ links, title });
  }, []);

  const closeRepo = useCallback(() => setRepoModal(null), []);

  // Sort projects
  const sorted = [...(projectsData ?? [])].sort(
    (a, b) => (b.priority ?? 0) - (a.priority ?? 0),
  );
  const isSingle = single || sorted.length === 1;

  // Single / case-study view
  if (isSingle) {
    return (
      <>
        <SingleProjectView
          project={sorted[0]}
          isDark={isDarkMode}
          prefersReduced={prefersReduced}
          onOpenRepo={openRepo}
        />
        <AnimatePresence>
          {repoModal && (
            <RepoModal
              links={repoModal.links}
              title={repoModal.title}
              isDark={isDarkMode}
              onClose={closeRepo}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  // Grid view
  const displayed = limit === "all" ? sorted : sorted.slice(0, limit);

  return (
    <>
      <section
        id="projects"
        className={`relative mt-20 py-24 px-5 overflow-hidden ${isDarkMode ? "bg-gray-900/40" : "bg-white/60"}`}
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
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <FolderOpen size={11} className="opacity-60" />
              Selected Work
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={
                prefersReduced
                  ? false
                  : { opacity: 0, y: 28, filter: "blur(8px)" }
              }
              animate={
                headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
              }
              transition={{
                duration: 0.6,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`text-4xl md:text-5xl font-black tracking-tight mb-4 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
            >
              {heading.split(" ").map((word, i) => (
                <span key={word} className="inline-block mr-3">
                  <motion.span
                    className={`inline-block ${
                      i === heading.split(" ").length - 1
                        ? `bg-gradient-to-r ${isDarkMode ? "from-indigo-400 to-sky-400" : "from-blue-500 to-indigo-600"} bg-clip-text text-transparent`
                        : ""
                    }`}
                    initial={
                      prefersReduced
                        ? false
                        : { opacity: 0, y: 28, filter: "blur(8px)" }
                    }
                    animate={
                      headerInView
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : {}
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.08 + i * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              {subHeading}
            </motion.p>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={headerInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{
                delay: 0.45,
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

          {/* ── Grid ── */}
          <div ref={gridRef}>
            <SectionLabel
              emoji="🗂"
              label="Projects"
              isDark={isDarkMode}
              inView={gridInView}
            />

            <motion.div
              variants={{ show: { transition: { staggerChildren: 0.09 } } }}
              initial="hidden"
              animate={gridInView ? "show" : "hidden"}
              className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {displayed.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  isDark={isDarkMode}
                  prefersReduced={prefersReduced}
                  onOpenRepo={openRepo}
                />
              ))}
            </motion.div>
          </div>

          {/* ── View all CTA ── */}
          {limit !== "all" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-12 text-center"
            >
              <motion.div
                whileHover={prefersReduced ? {} : { scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg hover:shadow-xl transition-shadow"
                  style={{
                    background: "linear-gradient(135deg,#6366f1,#38bdf8)",
                  }}
                >
                  View all projects
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
          )}
        </div>
      </section>

      {/* Repo modal */}
      <AnimatePresence>
        {repoModal && (
          <RepoModal
            links={repoModal.links}
            title={repoModal.title}
            isDark={isDarkMode}
            onClose={closeRepo}
          />
        )}
      </AnimatePresence>
    </>
  );
}
