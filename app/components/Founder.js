"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { User2, Code, Database, Zap } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { useTheme } from "./ThemeProvider";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiExpress, SiMongodb, SiTailwindcss } from "react-icons/si";

const Founder = () => {
  const [startTyping1, setStartTyping1] = useState(false);
  const [startTyping2, setStartTyping2] = useState(false);
  const { isDarkMode } = useTheme();

  const sectionRef1 = useRef();
  const sectionRef2 = useRef();

  /* =======================
     TEAM MEMBER SKILLS
  ======================== */
  const shahnawazSkills = [
    { name: "React", icon: <FaReact className="text-cyan-400" />, category: "Frontend" },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-500" />, category: "Frontend" },
    { name: "Next.js", icon: <SiNextdotjs className="text-neutral-800 dark:text-white" />, category: "Frontend" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-500" />, category: "Frontend" },
    { name: "Node.js", icon: <FaNodeJs className="text-green-600" />, category: "Backend" },
    { name: "MongoDB", icon: <SiMongodb className="text-green-700" />, category: "Database" },
  ];

  const wahbSkills = [
    { name: "System Design", icon: <Database className="text-purple-500" />, category: "Architecture" },
    { name: "Backend APIs", icon: <Code className="text-blue-600" />, category: "Backend" },
    { name: "Express.js", icon: <SiExpress className="text-gray-700" />, category: "Backend" },
    { name: "MongoDB", icon: <SiMongodb className="text-green-700" />, category: "Database" },
    { name: "DevOps", icon: <Zap className="text-yellow-500" />, category: "Infrastructure" },
    { name: "Python", icon: <FaPython className="text-blue-700" />, category: "Backend" },
  ];

  /* =======================
     CSS HELPERS (THEME)
  ======================== */
  const sectionBg = isDarkMode ? "bg-gray-900/60" : "bg-white/60";
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-gray-100";
  const cardInnerBg = isDarkMode ? "bg-gray-900" : "bg-white";

  const titleText = isDarkMode ? "text-gray-100" : "text-gray-900";
  const subtitleText = isDarkMode ? "text-gray-400" : "text-gray-700";
  const bodyText = isDarkMode ? "text-gray-300" : "text-gray-800";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-300";
  const skillBg = isDarkMode ? "bg-gray-700/50" : "bg-blue-50/50";
  const skillBorder = isDarkMode ? "border-gray-600" : "border-blue-200";
  const gradientText = isDarkMode ? "from-blue-400 to-cyan-400" : "from-blue-600 to-indigo-600";

  /* =======================
     COPY
  ======================== */
  const fullText1 =
    "founder and full-stack developer working primarily with the MERN stack. Shahnawaz focuses on frontend development, building clean user interfaces and connecting them with reliable backend systems.";

  const fullText2 =
    "Co-founder and technical lead overseeing system design, backend development, security, and deployment. Wahb works across the entire stack to ensure products are scalable, performant, and production-ready.";

  /* =======================
     INTERSECTION OBSERVER
  ======================== */
  useEffect(() => {
    const observer1 = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setStartTyping1(true),
      { threshold: 0.3 }
    );

    const observer2 = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setStartTyping2(true),
      { threshold: 0.3 }
    );

    sectionRef1.current && observer1.observe(sectionRef1.current);
    sectionRef2.current && observer2.observe(sectionRef2.current);

    return () => {
      observer1.disconnect();
      observer2.disconnect();
    };
  }, []);

  return (
    <section
      id="founder"
      className={`mt-10 py-16 transition-colors ${sectionBg}`}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1
          className={`text-center font-extrabold text-4xl md:text-5xl mb-4 flex items-center justify-center gap-3 tracking-wide ${titleText}`}
        >
          <User2 size={36} className="text-blue-500" />
          Leadership Team
        </h1>

        <p
          className={`text-center text-lg mb-2 max-w-3xl mx-auto ${subtitleText}`}
        >
          Expert builders covering full-stack development, system architecture, and infrastructure.
        </p>
        <div className={`h-1 w-20 bg-gradient-to-r ${gradientText} mx-auto rounded-full`}></div>
      </div>

      {/* =======================
         SHAHNAWAZ
      ======================== */}
      <div
        ref={sectionRef1}
        className={`max-w-5xl mx-auto rounded-2xl p-10 flex flex-col md:flex-row items-start gap-8 shadow-lg mb-12 transition-all border-2 ${cardBg} ${borderColor} hover:shadow-xl`}
      >
        <div className="flex-shrink-0">
          <div
            className={`w-48 h-48 rounded-2xl overflow-hidden border-4 shadow-md transition-transform hover:scale-105 ${borderColor}`}
          >
            <Image
              src="/developer.jpg"
              width={300}
              height={300}
              alt="Shahnawaz Saddam Butt"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-6">
            <h2 className={`text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r ${gradientText} bg-clip-text text-transparent`}>
              Shahnawaz Saddam Butt
            </h2>

            <p className={`text-lg font-semibold mb-4 flex items-center gap-2 ${subtitleText}`}>
              <Code size={20} className="text-blue-500" />
              Founder & Full-Stack Developer
            </p>

            <p
              className={`leading-relaxed mb-6 text-base ${bodyText}`}
            >
              {startTyping1 && (
                <Typewriter
                  words={[fullText1]}
                  cursor
                  cursorStyle="|"
                  typeSpeed={30}
                />
              )}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="mb-6">
            <h3 className={`text-sm font-semibold uppercase tracking-wide mb-3 ${subtitleText}`}>
              Expertise
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {shahnawazSkills.map((skill) => (
                <div
                  key={skill.name}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all hover:shadow-md ${skillBg} ${skillBorder}`}
                >
                  <span className="text-lg">{skill.icon}</span>
                  <span className={`text-xs font-medium ${titleText}`}>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          <a
            href="https://shahnawaz.buttnetworks.com/"
            target="_blank"
            rel="noreferrer"
          >
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all">
              View Profile
            </button>
          </a>
        </div>
      </div>

      {/* =======================
         WAHB
      ======================== */}
      <div
        ref={sectionRef2}
        className={`max-w-5xl mx-auto rounded-2xl p-10 flex flex-col md:flex-row items-start gap-8 shadow-lg transition-all border-2 ${cardBg} ${borderColor} hover:shadow-xl`}
      >
        <div className="flex-shrink-0">
          <div
            className={`w-48 h-48 rounded-2xl overflow-hidden border-4 shadow-md transition-transform hover:scale-105 ${borderColor}`}
          >
            <Image
              src="/developer2.svg"
              width={300}
              height={300}
              alt="Wahb Amir"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-6">
            <h2 className={`text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r ${gradientText} bg-clip-text text-transparent`}>
              Wahb Amir
            </h2>

            <p className={`text-lg font-semibold mb-4 flex items-center gap-2 ${subtitleText}`}>
              <Database size={20} className="text-purple-500" />
              Co-Founder & Technical Lead
            </p>

            <p
              className={`leading-relaxed mb-6 text-base ${bodyText}`}
            >
              {startTyping2 && (
                <Typewriter
                  words={[fullText2]}
                  cursor
                  cursorStyle="|"
                  typeSpeed={30}
                />
              )}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="mb-6">
            <h3 className={`text-sm font-semibold uppercase tracking-wide mb-3 ${subtitleText}`}>
              Expertise
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {wahbSkills.map((skill) => (
                <div
                  key={skill.name}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all hover:shadow-md ${skillBg} ${skillBorder}`}
                >
                  <span className="text-lg">{skill.icon}</span>
                  <span className={`text-xs font-medium ${titleText}`}>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          <a href="https://wahb.space" target="_blank" rel="noreferrer">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-blue-700 transition-all">
              View Profile
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Founder;
