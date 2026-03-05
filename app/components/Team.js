"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { User2, Code, Database, Zap, ArrowUpRight, Globe, Server, GitBranch, Layers } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { FaReact, FaNodeJs, FaPython, FaDocker } from "react-icons/fa";
import {
  SiTypescript, SiNextdotjs, SiMongodb,
  SiTailwindcss, SiReact, SiPytorch, SiPostgresql, SiCplusplus,
} from "react-icons/si";
import {
  motion, useInView, useMotionValue, useSpring, useTransform,
} from "framer-motion";

/* ─── Easing ─────────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1];

/* ─── Tilt hook ──────────────────────────────────────────── */
const useTilt = (strength = 5) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), { stiffness: 260, damping: 28 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), { stiffness: 260, damping: 28 });
  const onMouseMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };
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
      if (idx.current >= text.length) { clearInterval(timer.current); setDone(true); }
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
  Frontend: { light: "text-blue-600 bg-blue-50   border-blue-200",         dark: "text-blue-400 bg-blue-950/40   border-blue-800/50"    },
  Backend:  { light: "text-emerald-600 bg-emerald-50 border-emerald-200",   dark: "text-emerald-400 bg-emerald-950/40 border-emerald-800/50" },
  DevOps:   { light: "text-orange-600 bg-orange-50  border-orange-200",     dark: "text-orange-400 bg-orange-950/40  border-orange-800/50"  },
  Database: { light: "text-violet-600 bg-violet-50  border-violet-200",     dark: "text-violet-400 bg-violet-950/40  border-violet-800/50"  },
  AI:       { light: "text-rose-600 bg-rose-50    border-rose-200",         dark: "text-rose-400 bg-rose-950/40    border-rose-800/50"    },
};

/* ─── Skill chip ─────────────────────────────────────────── */
const SkillChip = ({ skill, i, isDarkMode }) => {
  const theme = CAT[skill.category] ?? CAT.Frontend;
  const cls = isDarkMode ? theme.dark : theme.light;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.035 * i, type: "spring", stiffness: 340, damping: 22 }}
      whileHover={{ y: -2, scale: 1.05 }}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold cursor-default select-none ${cls}`}
    >
      <span className="text-sm leading-none flex-shrink-0">{skill.icon}</span>
      <span>{skill.name}</span>
    </motion.div>
  );
};

/* ─── Avatar — clean static ring, no animation ───────────── */
const Avatar = ({ src, alt, accent, isDarkMode }) => (
  <motion.div
    whileHover={{ scale: 1.04 }}
    transition={{ type: "spring", stiffness: 240, damping: 20 }}
    className="relative flex-shrink-0 w-40 h-40 md:w-48 md:h-48"
  >
    <div
      className="absolute inset-0 rounded-2xl"
      style={{ boxShadow: `0 0 0 2px ${accent}60, 0 6px 28px ${accent}28` }}
    />
    <div className={`absolute inset-0 rounded-2xl overflow-hidden ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <Image
        src={src}
        width={300}
        height={300}
        alt={alt}
        className="w-full h-full object-cover"
        priority
      />
    </div>
    {/* Green dot indicator */}
    <motion.span
      className="absolute bottom-2 right-2 w-3 h-3 rounded-full border-2"
      style={{ backgroundColor: "#22c55e", borderColor: isDarkMode ? "#111827" : "#ffffff" }}
      animate={{ scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }}
      transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
    />
  </motion.div>
);

/* ─── Stat pill ──────────────────────────────────────────── */
const StatPill = ({ value, label, accent, isDarkMode }) => (
  <div className={`flex-1 text-center py-2 rounded-xl border ${isDarkMode ? "bg-gray-900/50 border-gray-700/60" : "bg-gray-50 border-gray-200"}`}>
    <p className="text-base font-black leading-none" style={{ color: accent }}>{value}</p>
    <p className={`text-[9px] uppercase tracking-widest font-bold mt-0.5 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>{label}</p>
  </div>
);

/* ─── Skill group section ────────────────────────────────── */
const SkillGroup = ({ group, inView, isDarkMode }) => (
  <div>
    <div className="flex items-center gap-1.5 mb-2">
      <span className="opacity-50 text-gray-400">{group.icon}</span>
      <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>{group.label}</span>
    </div>
    {inView && (
      <div className="flex flex-wrap gap-1.5">
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

  useEffect(() => { if (inView) setTyped(true); }, [inView]);

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
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: "preserve-3d" }}
        className={`relative rounded-3xl p-7 md:p-10 border overflow-hidden ${
          isDarkMode
            ? "bg-gray-800/70 border-gray-700/70 backdrop-blur-sm"
            : "bg-white border-gray-200 shadow-xl"
        }`}
      >
        {/* Soft static glow blob — no movement */}
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${member.accent}14 0%, transparent 65%)`,
            filter: "blur(24px)",
          }}
        />

        {/* Ghost index */}
        <div
          className="absolute bottom-5 right-7 text-7xl font-black select-none pointer-events-none leading-none"
          style={{ color: `${member.accent}0d` }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">

          {/* Col A: avatar + stats */}
          <div className="flex flex-col items-center gap-3 w-40 md:w-48 flex-shrink-0">
            <Avatar src={member.image} alt={member.name} accent={member.accent} isDarkMode={isDarkMode} />
            <div className="flex gap-2 w-full">
             
            </div>
          </div>

          {/* Col B: bio + skills + cta */}
          <div className="flex-1 min-w-0">
            <motion.h2
              className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mb-1"
              style={{ color: member.accent }}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.18, duration: 0.5, ease: EASE }}
            >
              {member.name}
            </motion.h2>

            <div className={`flex items-center gap-2 mb-4 text-sm font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              <span style={{ color: member.accent }}>{member.roleIcon}</span>
              {member.role}
            </div>

            {/* Sweep line */}
            <motion.div
              className="h-px mb-5 rounded-full"
              style={{ background: `linear-gradient(to right, ${member.accent}70, transparent)` }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.28, duration: 0.55, ease: EASE }}
            />

            <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              <TypedText text={member.bio} started={typed} speed={16} />
            </p>

            {/* Skill groups */}
            <div className="space-y-4 mb-7">
              {member.skillGroups.map((g) => (
                <SkillGroup key={g.label} group={g} inView={inView} isDarkMode={isDarkMode} />
              ))}
            </div>

            <motion.a
              href={member.profileUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg transition-shadow"
              style={{ background: `linear-gradient(135deg, ${member.accent}, ${member.accentEnd})` }}
            >
              View Profile <ArrowUpRight size={14} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Data ───────────────────────────────────────────────── */
const useTeamData = () =>
  useMemo(() => [
    {
      name: "Shahnawaz Saddam Butt",
      role: "Founder & Full-Stack Developer",
      roleIcon: <Code size={14} />,
      image: "/developer.jpg",
      profileUrl: "https://shahnawaz.buttnetworks.com/",
      accent: "#3b82f6",
      accentEnd: "#6366f1",
      bio: "Founder and full-stack developer specialising in the MERN stack. Leads frontend architecture while bridging clean interfaces with robust backends and cross-platform mobile apps.",
      skillGroups: [
        {
          label: "Frontend", icon: <Globe size={11} />,
          skills: [
            { name: "Next.js",      icon: <SiNextdotjs />,                            category: "Frontend" },
            { name: "React",        icon: <FaReact className="text-cyan-400" />,       category: "Frontend" },
            { name: "TypeScript",   icon: <SiTypescript className="text-blue-500" />,  category: "Frontend" },
            { name: "React Native", icon: <SiReact className="text-sky-400" />,        category: "Frontend" },
            { name: "Tailwind",     icon: <SiTailwindcss className="text-sky-500" />,  category: "Frontend" },
          ],
        },
        {
          label: "Backend & Infra", icon: <Server size={11} />,
          skills: [
            { name: "Node.js",  icon: <FaNodeJs className="text-green-500" />,  category: "Backend"  },
            { name: "Python",   icon: <FaPython className="text-blue-500" />,   category: "Backend"  },
            { name: "MongoDB",  icon: <SiMongodb className="text-green-600" />, category: "Database" },
            { name: "Docker",   icon: <FaDocker className="text-blue-400" />,   category: "DevOps"   },
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
      accent: "#a855f7",
      accentEnd: "#3b82f6",
      bio: "Co-founder and technical lead driving system design, backend APIs, AI/ML pipelines, and DevOps. Ensures every product ships scalable, secure, and production-ready — across the full stack.",
      skillGroups: [
        {
          label: "Frontend", icon: <Globe size={11} />,
          skills: [
            { name: "Next.js",    icon: <SiNextdotjs />,                                category: "Frontend" },
            { name: "TypeScript", icon: <SiTypescript className="text-blue-500" />,     category: "Frontend" },
            { name: "Framer",     icon: <Layers size={12} className="text-pink-400" />, category: "Frontend" },
          ],
        },
        {
          label: "Backend & AI", icon: <Server size={11} />,
          skills: [
            { name: "Node.js",    icon: <FaNodeJs className="text-green-500" />,        category: "Backend"  },
            { name: "Python",     icon: <FaPython className="text-blue-500" />,         category: "Backend"  },
            { name: "PyTorch",    icon: <SiPytorch className="text-orange-500" />,      category: "AI"       },
            { name: "C++",        icon: <SiCplusplus className="text-blue-600" />,      category: "Backend"  },
            { name: "PostgreSQL", icon: <SiPostgresql className="text-sky-600" />,      category: "Database" },
          ],
        },
        {
          label: "DevOps", icon: <GitBranch size={11} />,
          skills: [
            { name: "Docker",  icon: <FaDocker className="text-blue-400" />,            category: "DevOps" },
            { name: "Nginx",   icon: <Zap size={12} className="text-green-400" />,      category: "DevOps" },
            { name: "Actions", icon: <GitBranch size={12} className="text-gray-400" />, category: "DevOps" },
          ],
        },
      ],
    },
  ], []);

/* ─── Export ─────────────────────────────────────────────── */
const Team = () => {
  const { isDarkMode } = useTheme();
  const members = useTeamData();

  return (
    <section id="team" className="mt-10 py-20 px-4">
      {/* Header */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <motion.div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5 border"
          style={{ color: "#3b82f6", borderColor: "#3b82f640", backgroundColor: "#3b82f60d" }}
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <User2 size={11} /> Leadership Team
        </motion.div>

        <h1 className={`text-4xl md:text-5xl font-black tracking-tight mb-4 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
          The People Behind{" "}
          <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
            the Work
          </span>
        </h1>

        <p className={`max-w-lg mx-auto text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Full-stack builders covering frontend, backend, AI pipelines, and infrastructure — end to end.
        </p>

        <motion.div
          className="h-0.5 w-14 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto mt-5 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.32, duration: 0.55, ease: EASE }}
        />
      </motion.div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto space-y-8">
        {members.map((m, i) => (
          <MemberCard key={m.name} member={m} index={i} isDarkMode={isDarkMode} />
        ))}
      </div>
    </section>
  );
};

export default Team;