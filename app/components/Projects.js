"use client";
import React, { useEffect, useRef, useState } from "react";
import { projects as defaultProjects } from "../data/projects"; // adjust path
import { useTheme } from "./ThemeProvider";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Projects({
  limit = 3,
  projects: projectsData = defaultProjects,
  heading = "Our Work",
  subHeading = "Modern, fast and built for real users",
  single = false,
}) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // indexMap keeps track of visible image index per project id
  const [indexMap, setIndexMap] = useState(() => {
    const initial = {};
    (projectsData || []).forEach((p) => (initial[p.id] = 0));
    return initial;
  });

  // Keep indexMap in sync if projectsData changes (e.g., loaded async)
  useEffect(() => {
    setIndexMap((prev) => {
      const next = { ...prev };
      (projectsData || []).forEach((p) => {
        if (next[p.id] === undefined) next[p.id] = 0;
      });
      // remove keys for projects that no longer exist (optional)
      Object.keys(next).forEach((key) => {
        if (!(projectsData || []).some((p) => p.id === key)) delete next[key];
      });
      return next;
    });
  }, [projectsData]);

  const { isDarkMode } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      try {
        if (sectionRef.current) observer.unobserve(sectionRef.current);
      } catch (e) {
        // ignore if observer already disconnected
      }
    };
  }, []);

  function go(projectId, dir) {
    setIndexMap((prev) => {
      const project = (projectsData || []).find((p) => p.id === projectId);
      const max = project?.images?.length || 1;
      const current = prev[projectId] ?? 0;
      const next = (current + dir + max) % max;
      return { ...prev, [projectId]: next };
    });
  }

  const singleProjectMode =
    single || (Array.isArray(projectsData) && projectsData.length === 1);

  let sortedProjects = [...(projectsData || [])].sort(
    (a, b) => (b.priority || 0) - (a.priority || 0)
  );
  if (!singleProjectMode && limit !== "all") {
    sortedProjects = sortedProjects.slice(0, limit);
  }

  // helper classes
  const rootText = isDarkMode ? "text-white" : "text-black";
  const subText = isDarkMode ? "text-gray-300" : "text-gray-600";
  const headingClass = isDarkMode ? "text-white" : "text-gray-900";

  const cardBase = isDarkMode
    ? "bg-gray-900 text-gray-100 shadow-lg"
    : "bg-white text-gray-900 shadow-lg";

  const cardHeaderBg = isDarkMode ? "bg-gray-800" : "bg-gray-50";
  const controlBtnBg = isDarkMode ? "bg-gray-800/80" : "bg-white/80";
  const dotActive = "bg-blue-500";
  const dotInactive = isDarkMode ? "bg-gray-700" : "bg-white/80";

  const repoBtn = isDarkMode
    ? "inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 transition"
    : "inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition";

  const liveBtn =
    "inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition";

  const tagBase = isDarkMode
    ? "text-xs px-3 py-1 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
    : "text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition";

  const authorAvatar = isDarkMode
    ? "w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-semibold text-gray-200"
    : "w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700";

  const caseStudyLink = isDarkMode
    ? "inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:underline"
    : "inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline";

  const borderClass = isDarkMode
    ? "border border-gray-700"
    : "border border-gray-200";

  // modal state for repo chooser
  const [repoModalOpen, setRepoModalOpen] = useState(false);
  const [repoModalLinks, setRepoModalLinks] = useState([]);
  const [repoModalTitle, setRepoModalTitle] = useState("");

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
    } catch (e) {
      return String(raw).replace(/^https?:\/\//, "");
    }
  };

  const openRepoHandler = (githubLink, title = "Repository") => {
    if (!githubLink) return;

    const links = Array.isArray(githubLink)
      ? githubLink
          .map((l) =>
            typeof l === "string" ? { url: l } : l?.url ? { ...l } : null
          )
          .filter(Boolean)
      : [{ url: githubLink }];

    if (links.length === 0) return;

    if (links.length === 1) {
      window.open(normalizeUrl(links[0].url), "_blank", "noopener,noreferrer");
      return;
    }

    setRepoModalLinks(links);
    setRepoModalTitle(title);
    setRepoModalOpen(true);
  };

  useEffect(() => {
    if (!repoModalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setRepoModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [repoModalOpen]);

  // --- SINGLE CASE STUDY LAYOUT ---
  if (singleProjectMode) {
    const project = Array.isArray(projectsData)
      ? projectsData[0]
      : projectsData;
    if (!project) {
      return <div className="p-10 text-center">Project not found</div>;
    }

    const idx = indexMap[project.id] ?? 0;
    const imageCount = project.images?.length || 0;

    return (
      <main className={`min-h-screen py-10 px-4 md:px-8 lg:px-16 ${rootText}`}>
        <div className="max-w-7xl mx-auto">
          <Link
            href="/projects"
            className="inline-block mb-6 text-sm text-blue-600 hover:underline"
          >
            ← Back to projects
          </Link>

          {/* Hero carousel — big image */}
          <section className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* LEFT: IMAGE CAROUSEL */}
            <div className="relative w-full rounded-xl overflow-hidden bg-black/5 lg:sticky lg:top-24">
              {/* Ensure a reliable height on mobile & desktop */}
              <div className="relative w-full h-56 sm:h-72 md:h-96 rounded-xl overflow-hidden bg-black/5">
                {project.images && project.images.length > 0 ? (
                  <Image
                    key={idx}
                    src={project.images[idx]}
                    alt={`${project.heading} screenshot ${idx + 1}`}
                    fill
                    priority
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                    No image
                  </div>
                )}
              </div>

              {project.images?.length > 1 && (
                <>
                  <button
                    onClick={() => go(project.id, -1)}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${controlBtnBg} p-2 rounded-full`}
                    aria-label="previous image"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <button
                    onClick={() => go(project.id, +1)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${controlBtnBg} p-2 rounded-full`}
                    aria-label="next image"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* DOTS */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {project.images?.map((_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setIndexMap((s) => ({ ...s, [project.id]: i }))
                    }
                    className={`w-2.5 h-2.5 rounded-full transition ${
                      idx === i ? "bg-blue-500 scale-125" : "bg-white/70"
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: CONTENT */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 text-sm">
                <header className="mb-8">
                  <h1
                    className={`text-5xl font-extrabold mb-4 ${headingClass}`}
                  >
                    {project.heading}
                  </h1>
                  <p className={`${subText} max-w-3xl`}>{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-3 items-center">
                    <div className="mt-4 flex flex-wrap gap-3 items-center">
                      {project.githubLink && (
                        <button
                          onClick={() =>
                            openRepoHandler(project.githubLink, project.heading)
                          }
                          className={repoBtn}
                          type="button"
                        >
                          <Github size={16} /> View Repo
                        </button>
                      )}
                    </div>
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={liveBtn}
                      >
                        <ExternalLink size={14} />{" "}
                        {project?.type === "non-web" ? "Download" : "Live Demo"}
                      </a>
                    )}
                  </div>
                </header>
              </div>
            </div>
          </section>

          {/* Full case study content */}
          <section className="grid gap-8 grid-cols-1 lg:grid-cols-3">
            {/* Left column: Highlights & timeline */}
            <aside className="lg:col-span-1">
              <div
                className={`p-6 rounded-xl ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-50"
                } ${borderClass}`}
              >
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Project timeline</h4>
                  <div className="text-sm">
                    <div className="mb-1">
                      <strong>Start:</strong> {project.startDate ?? "—"}
                    </div>
                    <div>
                      <strong>End:</strong> {project.endDate ?? "—"}
                    </div>
                    <div className="mt-2">
                      <strong>Status:</strong> {project.status ?? "—"}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Tech</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech?.map((t) => (
                      <span
                        key={t}
                        className={`${tagBase} border-2 border-blue-500`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Right column: Description, authors, details */}
            <div className="lg:col-span-2">
              <div
                className={`p-6 rounded-xl ${
                  isDarkMode ? "bg-gray-900" : "bg-white"
                } ${borderClass}`}
              >
                <h3 className="text-2xl font-semibold mb-3">Case Study</h3>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  {project.description}
                </p>

                <div className="mt-6">
                  <h4 className="text-lg font-medium mb-2">Authors</h4>
                  <div className="flex gap-4 items-center">
                    {project.authors?.map((a) => {
                      const href = a.portfolio?.startsWith("http")
                        ? a.portfolio
                        : `https://${a.portfolio}`;

                      return (
                        <a
                          key={a.name}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 no-underline group"
                        >
                          <div
                            className={`${authorAvatar} group-hover:brightness-90 transition-all flex items-center justify-center`}
                          >
                            {a.name
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")}
                          </div>

                          <div>
                            <div
                              className={
                                isDarkMode
                                  ? "font-medium text-gray-100 group-hover:underline"
                                  : "font-medium text-gray-800 group-hover:underline"
                              }
                            >
                              {a.name}
                            </div>
                            <div
                              className={
                                isDarkMode
                                  ? "text-gray-400 text-sm"
                                  : "text-gray-500 text-sm"
                              }
                            >
                              {a.role}
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-medium mb-2">Deep Dive</h4>
                  <div className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                    <p className="mb-3">{project.description}</p>
                    {project.highlights && project.highlights.length > 0 && (
                      <>
                        <p>Highlights:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          {project.highlights.map((h, idx) => (
                            <li key={idx}>{h}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Repo chooser modal (single view) */}
        {repoModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${repoModalTitle} repositories`}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setRepoModalOpen(false)}
            />
            <div className="relative bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full z-60">
              <h3 className="text-lg font-semibold mb-4">
                Select a repository for{" "}
                <span className="font-medium">{repoModalTitle}</span>
              </h3>
              <ul className="space-y-2 max-h-60 overflow-auto">
                {repoModalLinks.map((link, idx) => {
                  const url = typeof link === "string" ? link : link?.url;
                  if (!url) return null;
                  const displayName = link?.name || getRepoLabel(url);
                  const key = url + "-" + idx;
                  return (
                    <li key={key} className="flex items-center justify-between">
                      <span className="text-sm">{displayName}</span>
                      <button
                        onClick={() => {
                          window.open(
                            normalizeUrl(url),
                            "_blank",
                            "noopener,noreferrer"
                          );
                          setRepoModalOpen(false);
                        }}
                        className={repoBtn}
                      >
                        Open
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setRepoModalOpen(false)}
                  className="px-4 py-2 rounded bg-gray-100 dark:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    );
  }

  // --- GRID / CARD LAYOUT (default) ---
  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`mt-20 px-4 md:px-16 mb-10 max-w-7xl mx-auto ${rootText}`}
    >
      <div className="text-center mb-8">
        <h2
          className={`text-4xl font-extrabold mb-2 transition-transform duration-700 ${headingClass} ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {heading}
        </h2>
        <p className={subText}>{subHeading}</p>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sortedProjects.map((project, i) => (
          <article
            key={project.id}
            className={`${cardBase} ${borderClass} rounded-2xl overflow-hidden transform transition-all duration-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className={`relative ${cardHeaderBg}`}>
              <div className="absolute right-3 top-3 z-20">
                <span
                  className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold ${
                    isDarkMode
                      ? "bg-yellow-600 text-black"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                  title={`Priority ${project.priority}`}
                >
                  🔥 {project.priority}
                </span>
              </div>

              {/* Ensure container has explicit heights on small screens */}
              <div className="relative w-full h-40 sm:h-52 md:h-56 lg:h-40 overflow-hidden">
                {project.images?.length > 0 ? (
                  project.images.map((src, idx) => (
                    <Image
                      key={idx}
                      src={src}
                      fill
                      alt={`${project.heading} ${idx + 1}`}
                      className={`absolute inset-0 w-full h-full transition-opacity duration-500 object-contain ${
                        indexMap[project.id] === idx
                          ? "opacity-100 z-10"
                          : "opacity-0 z-0 pointer-events-none"
                      }`}
                      draggable={false}
                    />
                  ))
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                    No image
                  </div>
                )}
              </div>

              <button
                aria-label="previous"
                onClick={() => go(project.id, -1)}
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${controlBtnBg} backdrop-blur-md p-2 rounded-full shadow hover:scale-105 transition`}
              >
                <ChevronLeft
                  size={18}
                  className={isDarkMode ? "text-gray-200" : "text-gray-800"}
                />
              </button>

              <button
                aria-label="next"
                onClick={() => go(project.id, +1)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${controlBtnBg} backdrop-blur-md p-2 rounded-full shadow hover:scale-105 transition`}
              >
                <ChevronRight
                  size={18}
                  className={isDarkMode ? "text-gray-200" : "text-gray-800"}
                />
              </button>

              <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
                {project.images?.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    className={`w-2 h-2 rounded-full transition-transform ${
                      indexMap[project.id] === dotIdx ? dotActive : dotInactive
                    }`}
                    onClick={() =>
                      setIndexMap((s) => ({ ...s, [project.id]: dotIdx }))
                    }
                    aria-label={`Go to image ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="p-5 flex flex-col gap-4">
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-lg font-bold">{project.heading}</h3>

                <div className="flex items-center gap-2">
                  <div className="mt-4 flex flex-wrap gap-3 items-center">
                    {project.githubLink && (
                      <button
                        onClick={() =>
                          openRepoHandler(project.githubLink, project.heading)
                        }
                        className={repoBtn}
                        type="button"
                      >
                        <Github size={24} /> View Repo
                      </button>
                    )}
                  </div>

                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open live demo"
                      className={liveBtn}
                    >
                      <ExternalLink size={14} />
                      <span className="text-sm">
                        {project?.type === "non-web" ? "download" : "Live"}
                      </span>
                    </a>
                  )}
                </div>
              </div>

              <p
                className={
                  isDarkMode
                    ? "text-gray-300 text-sm flex-1"
                    : "text-gray-700 text-sm flex-1"
                }
              >
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech?.map((t) => (
                  <span key={t} className={tagBase}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3">
                  {project.authors?.map((a) => {
                    const href = a.portfolio?.startsWith("http")
                      ? a.portfolio
                      : `https://${a.portfolio}`;

                    return (
                      <a
                        key={a.name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 no-underline group"
                      >
                        <div
                          className={`${authorAvatar} group-hover:brightness-90 transition-all flex items-center justify-center`}
                        >
                          {a.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>

                        <div>
                          <div
                            className={
                              isDarkMode
                                ? "font-medium text-gray-100 group-hover:underline"
                                : "font-medium text-gray-800 group-hover:underline"
                            }
                          >
                            {a.name}
                          </div>
                          <div
                            className={
                              isDarkMode
                                ? "text-gray-400 text-sm"
                                : "text-gray-500 text-sm"
                            }
                          >
                            {a.role}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>

                <Link href={`/projects/${project.id}`} className={caseStudyLink}>
                  Case study <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {limit !== "all" && (
        <div className="text-center mt-8">
          <Link
            href="/Projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            View all projects
          </Link>
        </div>
      )}

      {/* Repo chooser modal (grid view) */}
      {repoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${repoModalTitle} repositories`}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setRepoModalOpen(false)}
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full z-60">
            <h3 className="text-lg font-semibold mb-4">
              Select a repository for{" "}
              <span className="font-medium">{repoModalTitle}</span>
            </h3>
            <ul className="space-y-2 max-h-60 overflow-auto">
              {repoModalLinks.map((linkObj, idx) => {
                const url = linkObj?.url;
                if (!url) return null;
                const displayName = linkObj?.name || getRepoLabel(url);

                return (
                  <li key={url + "-" + idx} className="flex items-center justify-between">
                    <span className="text-sm">{displayName}</span>
                    <button
                      onClick={() => {
                        window.open(
                          normalizeUrl(url),
                          "_blank",
                          "noopener,noreferrer"
                        );
                        setRepoModalOpen(false);
                      }}
                      className={repoBtn}
                    >
                      Open
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setRepoModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-100 dark:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}