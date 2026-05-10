"use client";

import React, { useState } from "react";
import { User2, Phone, X } from "lucide-react";
import { FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Team_Member = [
  {
    name: "Shahnawaz Saddam Butt",
    role: "Founder & Full-Stack Developer",
    contact: {
      phone: "+92 300 1234567",
      email: "shahnawaz@example.com",
      github: "https://github.com/ShahanwazSaddam144",
    },
  },
  {
    name: "Muhammad Ali",
    role: "Brand Ambassador",
    contact: {
      phone: "+92 301 7654321",
      email: "mali@example.com",
      instagram: "@m.ali.dev",
    },
  },
  {
    name: "Wahb Amir",
    role: "AI Expert",
    contact: {
      phone: "+92 302 1122334",
      email: "wahb@example.com",
      github: "https://github.com/wahb-amir",
    },
  },
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <>
      <section className="mt-20 py-10" id="team">
        <header className="flex flex-col justify-center items-center text-center">
          <div className="Ambassador bg-blue-50 px-4 py-1 flex gap-2 rounded-[5px]">
            <User2 size={15} className="mt-1 text-blue-500" />
            <h1 className="font-semibold text-blue-500 uppercase">
              Our Team
            </h1>
          </div>
        </header>

        <div className="flex justify-center items-center gap-5 mt-10 flex-wrap">
          {Team_Member.map((member, index) => (
            <div
              key={index}
              className="Ambassador rounded-xl p-6 shadow-lg w-72 text-center bg-white hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg shadow-md">
                  {getInitials(member.name)}
                </div>
              </div>

              <h2 className="Ambassador-P text-lg font-semibold text-gray-800">
                {member.name}
              </h2>
              <p className="text-blue-500 text-sm mb-4">{member.role}</p>

              <button
                onClick={() => setSelectedMember(member)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
              >
                View Contact
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* POPUP */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-[320px] shadow-2xl relative animate-scaleIn">
            {/* Close */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg">
                {getInitials(selectedMember.name)}
              </div>
            </div>

            <h2 className="text-center font-semibold text-gray-800">
              {selectedMember.name}
            </h2>
            <p className="text-center text-blue-500 text-sm mb-5">
              {selectedMember.role}
            </p>

            {/* Contact Icons */}
            <div className="flex justify-center gap-4">
              {selectedMember.contact.phone && (
                <div className="bg-green-500 p-3 rounded-full text-white hover:scale-110 transition cursor-pointer">
                  <FaWhatsapp />
                </div>
              )}

              {selectedMember.contact.email && (
                <div className="bg-gray-700 p-3 rounded-full text-white hover:scale-110 transition cursor-pointer">
                  <MdEmail />
                </div>
              )}

              {selectedMember.contact.github && (
                <div className="bg-black p-3 rounded-full text-white hover:scale-110 transition cursor-pointer">
                  <FaGithub />
                </div>
              )}

              {selectedMember.contact.instagram && (
                <div className="bg-pink-500 p-3 rounded-full text-white hover:scale-110 transition cursor-pointer">
                  <FaInstagram />
                </div>
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
              {
                name: "React",
                icon: <FaReact className="text-cyan-400" />,
                category: "Frontend",
              },
              {
                name: "TypeScript",
                icon: <SiTypescript className="text-blue-500" />,
                category: "Frontend",
              },
              {
                name: "React Native",
                icon: <SiReact className="text-sky-400" />,
                category: "Frontend",
              },
              {
                name: "Tailwind",
                icon: <SiTailwindcss className="text-sky-500" />,
                category: "Frontend",
              },
            ],
          },
          {
            label: "Backend & Infra",
            icon: <Server size={11} />,
            skills: [
              {
                name: "Node.js",
                icon: <FaNodeJs className="text-green-500" />,
                category: "Backend",
              },
              {
                name: "Python",
                icon: <FaPython className="text-blue-500" />,
                category: "Backend",
              },
              {
                name: "MongoDB",
                icon: <SiMongodb className="text-green-600" />,
                category: "Database",
              },
              {
                name: "Docker",
                icon: <FaDocker className="text-blue-400" />,
                category: "DevOps",
              },
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
              {
                name: "TypeScript",
                icon: <SiTypescript className="text-blue-500" />,
                category: "Frontend",
              },
              {
                name: "Framer",
                icon: <Layers size={12} className="text-pink-400" />,
                category: "Frontend",
              },
            ],
          },
          {
            label: "Backend & AI",
            icon: <Server size={11} />,
            skills: [
              {
                name: "Node.js",
                icon: <FaNodeJs className="text-green-500" />,
                category: "Backend",
              },
              {
                name: "Python",
                icon: <FaPython className="text-blue-500" />,
                category: "Backend",
              },
              {
                name: "PyTorch",
                icon: <SiPytorch className="text-orange-500" />,
                category: "AI",
              },
              {
                name: "C++",
                icon: <SiCplusplus className="text-blue-600" />,
                category: "Backend",
              },
              {
                name: "PostgreSQL",
                icon: <SiPostgresql className="text-sky-600" />,
                category: "Database",
              },
            ],
          },
          {
            label: "DevOps",
            icon: <GitBranch size={11} />,
            skills: [
              {
                name: "Docker",
                icon: <FaDocker className="text-blue-400" />,
                category: "DevOps",
              },
              {
                name: "Nginx",
                icon: <Zap size={12} className="text-green-400" />,
                category: "DevOps",
              },
              {
                name: "Actions",
                icon: <GitBranch size={12} className="text-gray-400" />,
                category: "DevOps",
              },
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