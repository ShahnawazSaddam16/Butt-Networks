"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  User2,
  Code,
  Database,
  Zap,
  ArrowUpRight,
  Globe,
  Server,
  GitBranch,
  Layers,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { FaReact, FaNodeJs, FaPython, FaDocker, FaGithub } from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiMongodb,
  SiTailwindcss,
  SiReact,
  SiPytorch,
  SiPostgresql,
  SiCplusplus,
} from "react-icons/si";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ─── Custom Font ────────────────────────────────────────── */
const customFont = Plus_Jakarta_Sans({ subsets: ["latin"] });

/* ─── Easing ─────────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1];

/* ─── Tilt hook ──────────────────────────────────────────── */
const useTilt = (strength = 5) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [strength, -strength]),
    { stiffness: 260, damping: 28 },
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-strength, strength]),
    { stiffness: 260, damping: 28 },
  );
  const onMouseMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
};

/* ─── Typewriter ─────────────────────────────────────────── */
const TypedText = ({ text, started, speed = 16 }) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);
  const timer = useRef(null);
  useEffect(() => {
    if (!started || done) return;
    timer.current = setInterval(() => {
      idx.current += 1;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) {
        clearInterval(timer.current);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer.current);
  }, [started, text, speed, done]);
  return (
    <span>
      {displayed}
      {!done && started && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-px h-4 ml-0.5 align-middle bg-current"
        />
      )}
    </span>
  );
};

/* ─── Category style map ─────────────────────────────────── */
const CAT = {
  Frontend: {
    light: "text-blue-700 bg-blue-50/80 border-blue-200",
    dark: "text-blue-400 bg-blue-950/30 border-blue-800/50",
  },
  Backend: {
    light: "text-emerald-700 bg-emerald-50/80 border-emerald-200",
    dark: "text-emerald-400 bg-emerald-950/30 border-emerald-800/50",
  },
  DevOps: {
    light: "text-orange-700 bg-orange-50/80 border-orange-200",
    dark: "text-orange-400 bg-orange-950/30 border-orange-800/50",
  },
  Database: {
    light: "text-violet-700 bg-violet-50/80 border-violet-200",
    dark: "text-violet-400 bg-violet-950/30 border-violet-800/50",
  },
  AI: {
    light: "text-rose-700 bg-rose-50/80 border-rose-200",
    dark: "text-rose-400 bg-rose-950/30 border-rose-800/50",
  },
};

/* ─── Skill chip ─────────────────────────────────────────── */
const SkillChip = ({ skill, i, isDarkMode }) => {
  const theme = CAT[skill.category] ?? CAT.Frontend;
  const cls = isDarkMode ? theme.dark : theme.light;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.035 * i,
        type: "spring",
        stiffness: 340,
        damping: 22,
      }}
      whileHover={{ y: -2, scale: 1.05 }}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold cursor-default select-none shadow-sm ${cls}`}
    >
      <span className="text-sm leading-none flex-shrink-0">{skill.icon}</span>
      <span>{skill.name}</span>
    </motion.div>
  );
};

/* ─── Avatar ─────────────────────────────────────────────── */
const Avatar = ({ src, alt, accent, isDarkMode }) => (
  <motion.div
    whileHover={{ scale: 1.04 }}
    transition={{ type: "spring", stiffness: 240, damping: 20 }}
    className="relative flex-shrink-0 w-40 h-40 md:w-48 md:h-48"
  >
    <div
      className="absolute inset-0 rounded-2xl"
      style={{ boxShadow: `0 0 0 2px ${accent}60, 0 8px 32px ${accent}30` }}
    />
    <div
      className={`absolute inset-0 rounded-2xl overflow-hidden ${isDarkMode ? "bg-slate-900" : "bg-gray-100"}`}
    >
      <Image
        src={src}
        width={300}
        height={300}
        alt={alt}
        className="w-full h-full object-cover"
        priority
      />
    </div>
    <motion.span
      className="absolute bottom-2 right-2 w-3.5 h-3.5 rounded-full border-2"
      style={{
        backgroundColor: "#22c55e",
        borderColor: isDarkMode ? "#0f172a" : "#ffffff",
      }}
      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
      transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
    />
  </motion.div>
);

/* ─── Skill group section ────────────────────────────────── */
const SkillGroup = ({ group, inView, isDarkMode }) => (
  <div>
    <div className="flex items-center gap-1.5 mb-2.5">
      <span className="opacity-50 text-gray-400">{group.icon}</span>
      <span
        className={`text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}
      >
        {group.label}
      </span>
    </div>
    {inView && (
      <div className="flex flex-wrap gap-2">
        {group.skills.map((sk, i) => (
          <SkillChip key={sk.name} skill={sk} i={i} isDarkMode={isDarkMode} />
        ))}
      </div>
    )}
  </div>
);

/* ─── Member card ────────────────────────────────────────── */
const MemberCard = ({ member, index, isDarkMode }) => {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-70px" });
  const [typed, setTyped] = useState(false);
  const tilt = useTilt(4);

  useEffect(() => {
    if (inView) setTyped(true);
  }, [inView]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.08 }}
    >
      <motion.div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative rounded-3xl p-7 md:p-10 border overflow-hidden transition-colors ${
          isDarkMode
            ? "bg-slate-900/80 border-slate-800 backdrop-blur-md shadow-2xl"
            : "bg-white border-gray-100 shadow-xl"
        }`}
      >
        {/* Soft static glow blob */}
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${member.accent}15 0%, transparent 70%)`,
            filter: "blur(32px)",
          }}
        />

        {/* Ghost index */}
        <div
          className="absolute bottom-5 right-7 text-8xl font-black select-none pointer-events-none leading-none"
          style={{ color: `${member.accent}0a` }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start gap-8 md:gap-10">
          {/* Col A: avatar */}
          <div className="flex flex-col items-center gap-3 w-40 md:w-48 flex-shrink-0">
            <Avatar
              src={member.image}
              alt={member.name}
              accent={member.accent}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Col B: bio + skills + cta */}
          <div className="flex-1 min-w-0">
            <motion.h2
              className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mb-1.5"
              style={{ color: member.accent }}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.18, duration: 0.5, ease: EASE }}
            >
              {member.name}
            </motion.h2>

            <div
              className={`flex items-center gap-2 mb-4 text-sm font-semibold ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}
            >
              <span style={{ color: member.accent }}>{member.roleIcon}</span>
              {member.role}
            </div>

            {/* Sweep line */}
            <motion.div
              className="h-px mb-5 rounded-full"
              style={{
                background: `linear-gradient(to right, ${member.accent}60, transparent)`,
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.28, duration: 0.55, ease: EASE }}
            />

            <p
              className={`text-[15px] leading-relaxed mb-7 ${isDarkMode ? "text-slate-400" : "text-gray-600"}`}
            >
              <TypedText text={member.bio} started={typed} speed={16} />
            </p>

            {/* Skill groups */}
            <div className="space-y-5 mb-8">
              {member.skillGroups.map((g) => (
                <SkillGroup
                  key={g.label}
                  group={g}
                  inView={inView}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>

            {/* Action Buttons Container - FIXED SPACING */}
            <div className="flex flex-wrap items-center gap-4">
              <motion.a
                href={member.profileUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg transition-all"
                style={{
                  background: `linear-gradient(135deg, ${member.accent}, ${member.accentEnd})`,
                }}
              >
                View Profile <ArrowUpRight size={16} strokeWidth={2.5} />
              </motion.a>

              {member.githubUrl && (
                <motion.a
                  href={member.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all ${
                    isDarkMode
                      ? "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  <FaGithub size={18} /> GitHub
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Data ───────────────────────────────────────────────── */
// (Keep your existing useTeamData hook exactly as it is)
const useTeamData = () =>
  useMemo(
    () => [
      {
        name: "Shahnawaz Saddam Butt",
        role: "Founder & Full-Stack Developer",
        roleIcon: <Code size={14} />,
        image: "/developer.jpg",
        githubUrl: "https://github.com/ShahanwazSaddam144",
        profileUrl: "https://shahnawaz.buttnetworks.com/",
        accent: "#3b82f6",
        accentEnd: "#6366f1",
        bio: "Founder and full-stack developer specialising in the MERN stack. Leads frontend architecture while bridging clean interfaces with robust backends and cross-platform mobile apps.",
        skillGroups: [
          {
            label: "Frontend",
            icon: <Globe size={11} />,
            skills: [
              { name: "Next.js", icon: <SiNextdotjs />, category: "Frontend" },
              { name: "React", icon: <FaReact className="text-cyan-400" />, category: "Frontend" },
              { name: "TypeScript", icon: <SiTypescript className="text-blue-500" />, category: "Frontend" },
              { name: "React Native", icon: <SiReact className="text-sky-400" />, category: "Frontend" },
              { name: "Tailwind", icon: <SiTailwindcss className="text-sky-500" />, category: "Frontend" },
            ],
          },
          {
            label: "Backend & Infra",
            icon: <Server size={11} />,
            skills: [
              { name: "Node.js", icon: <FaNodeJs className="text-green-500" />, category: "Backend" },
              { name: "Python", icon: <FaPython className="text-blue-500" />, category: "Backend" },
              { name: "MongoDB", icon: <SiMongodb className="text-green-600" />, category: "Database" },
              { name: "Docker", icon: <FaDocker className="text-blue-400" />, category: "DevOps" },
            ],
          },
        ],
      },
      {
        name: "Wahb Amir",
        role: "Co-Founder & Technical Lead",
        roleIcon: <Database size={14} />,
        image: "/developer2.svg",
        profileUrl: "https://wahb.space",
        githubUrl: "https://github.com/wahb-amir",
        accent: "#a855f7",
        accentEnd: "#3b82f6",
        bio: "Co-founder and technical lead driving system design, backend APIs, AI/ML pipelines, and DevOps. Ensures every product ships scalable, secure, and production-ready — across the full stack.",
        skillGroups: [
          {
            label: "Frontend",
            icon: <Globe size={11} />,
            skills: [
              { name: "Next.js", icon: <SiNextdotjs />, category: "Frontend" },
              { name: "TypeScript", icon: <SiTypescript className="text-blue-500" />, category: "Frontend" },
              { name: "Framer", icon: <Layers size={12} className="text-pink-400" />, category: "Frontend" },
            ],
          },
          {
            label: "Backend & AI",
            icon: <Server size={11} />,
            skills: [
              { name: "Node.js", icon: <FaNodeJs className="text-green-500" />, category: "Backend" },
              { name: "Python", icon: <FaPython className="text-blue-500" />, category: "Backend" },
              { name: "PyTorch", icon: <SiPytorch className="text-orange-500" />, category: "AI" },
              { name: "C++", icon: <SiCplusplus className="text-blue-600" />, category: "Backend" },
              { name: "PostgreSQL", icon: <SiPostgresql className="text-sky-600" />, category: "Database" },
            ],
          },
          {
            label: "DevOps",
            icon: <GitBranch size={11} />,
            skills: [
              { name: "Docker", icon: <FaDocker className="text-blue-400" />, category: "DevOps" },
              { name: "Nginx", icon: <Zap size={12} className="text-green-400" />, category: "DevOps" },
              { name: "Actions", icon: <GitBranch size={12} className="text-gray-400" />, category: "DevOps" },
            ],
          },
        ],
      },
    ],
    [],
  );

/* ─── Export ─────────────────────────────────────────────── */
const Team = () => {
  const { isDarkMode } = useTheme();
  const members = useTeamData();

  return (
    <section id="team" className={`mt-10 py-20 px-4 ${customFont.className}`}>
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <motion.div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6 border"
          style={{
            color: "#3b82f6",
            borderColor: "#3b82f640",
            backgroundColor: "#3b82f60d",
          }}
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <User2 size={12} /> Leadership Team
        </motion.div>

        <h1
          className={`text-4xl md:text-5xl font-black tracking-tight mb-5 ${isDarkMode ? "text-slate-100" : "text-gray-900"}`}
        >
          The People Behind{" "}
          <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
            the Work
          </span>
        </h1>

        <p
          className={`max-w-lg mx-auto text-[15px] leading-relaxed ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}
        >
          Full-stack builders covering frontend, backend, AI pipelines, and
          infrastructure — end to end.
        </p>

        <motion.div
          className="h-1 w-16 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto mt-6 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.32, duration: 0.55, ease: EASE }}
        />
      </motion.div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto space-y-10">
        {members.map((m, i) => (
          <MemberCard
            key={m.name}
            member={m}
            index={i}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </section>
  );
};

export default Team;