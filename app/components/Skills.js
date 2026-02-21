"use client";

import React from "react";
import { FaNodeJs, FaReact, FaPython, FaLinux } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";
import {
  SiTailwindcss,
  SiJavascript,
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiC,
  SiCplusplus,
  SiScikitlearn,
  SiTypescript,
  SiPytorch,
  SiMysql
} from "react-icons/si";

/* Core tools – shown ONCE */
const CORE_STACK = [
  { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
  { name: "React", icon: <FaReact className="text-cyan-400" /> },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-neutral-800 dark:text-black" />,
  },
  { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-500" /> },
];

/* Capabilities – tools appear ONCE, in context */
const CAPABILITIES = [
  {
    title: "Frontend Web Apps",
    desc: "Responsive, accessible interfaces with modern React patterns.",
    tools: [
      { name: "React", icon: <FaReact className="text-cyan-400" /> },
      {
        name: "Next.js",
        icon: <SiNextdotjs className="text-neutral-800 dark:text-black" />
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className="text-sky-500" />,
      },
      {
        name: "JavaScript",
        icon: <SiJavascript className="text-yellow-400" />,
      },
    ],
  },
  {
    title: "Backend APIs",
    desc: "REST APIs and application backends.",
    tools: [
      { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
      { name: "Express", icon: <SiExpress className="text-gray-700" /> },
    ],
  },
  {
    title: "Databases",
    desc: "Flexible data models for web apps.",
    tools: [
      { name: "MongoDB", icon: <SiMongodb className="text-green-700" /> },
      { name: "MySQL", icon: <SiMysql className="text-blue-600" /> },
    ],
  },
  {
    title: "Mobile Apps",
    desc: "Cross-platform apps for Android and iOS.",
    tools: [
      { name: "React Native", icon: <FaReact className="text-cyan-500" /> },
    ],
  },
  {
    title: "DevOps & Systems",
    desc: "Deploying and running applications.",
    tools: [{ name: "Linux", icon: <FaLinux className="text-gray-800" /> }],
  },
  {
    title: "ML & Experiments",
    desc: "Exploration and prototyping with data.",
    tools: [
      { name: "Python", icon: <FaPython className="text-blue-700" /> },
      {
        name: "Scikit-Learn",
        icon: <SiScikitlearn className="text-orange-400" />,
      },
      { name: "PyTorch", icon: <SiPytorch className="text-orange-400" /> },
    ],
  },
  {
    title: "Systems / Low-level",
    desc: "Performance-oriented and systems work.",
    tools: [
      { name: "C", icon: <SiC className="text-blue-800" /> },
      { name: "C++", icon: <SiCplusplus className="text-blue-600" /> },
    ],
  },
];

export default function Skills() {
  const { isDarkMode } = useTheme?.() ?? { isDarkMode: false };
  const CAPABILITIES = [
    {
      title: "Frontend Web Apps",
      desc: "Responsive, accessible interfaces with modern React patterns.",
      tools: [
        { name: "React", icon: <FaReact className="text-cyan-400" /> },
        {
          name: "Next.js",
          icon: <SiNextdotjs className="text-neutral-800 dark:text-black" />,
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss className="text-sky-500" />,
        },
        {
          name: "JavaScript",
          icon: <SiJavascript className="text-yellow-400" />,
        },
      ],
    },
    {
      title: "Backend APIs",
      desc: "REST APIs and application backends.",
      tools: [
        { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
        { name: "Express", icon: <SiExpress className="text-gray-700" /> },
      ],
    },
    {
      title: "Databases",
      desc: "Flexible data models for web apps.",
      tools: [
        { name: "MongoDB", icon: <SiMongodb className="text-green-700" /> },
      ],
    },
    {
      title: "Mobile Apps",
      desc: "Cross-platform apps for Android and iOS.",
      tools: [
        { name: "React Native", icon: <FaReact className="text-cyan-500" /> },
      ],
    },
    {
      title: "DevOps & Systems",
      desc: "Deploying and running applications.",
      tools: [
        {
          name: "Linux",
          icon: (
            <FaLinux
              className={`${isDarkMode ? "text-black" : "text-gray-900"}`}
            />
          ),
        },
      ],
    },
    {
      title: "ML & Experiments",
      desc: "Exploration and prototyping with data.",
      tools: [
        { name: "Python", icon: <FaPython className="text-blue-700" /> },
        {
          name: "Scikit-Learn",
          icon: <SiScikitlearn className="text-orange-400" />,
        },
        { name: "PyTorch", icon: <SiPytorch className="text-orange-400" /> },
      ],
    },
    {
      title: "Systems / Low-level",
      desc: "Performance-oriented and systems work.",
      tools: [
        { name: "C", icon: <SiC className="text-blue-800" /> },
        { name: "C++", icon: <SiCplusplus className="text-blue-600" /> },
      ],
    },
  ];

  // Theme classes (from your example)
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-gray-100";
  const cardInnerBg = isDarkMode ? "bg-gray-800" : "bg-gray-100";
  const titleText = isDarkMode ? "text-gray-200" : "text-gray-700";
  const subtitleText = isDarkMode ? "text-gray-400" : "text-gray-600";
  const sectionBg = isDarkMode ? "bg-gray-900/60" : "bg-white/60";
  const borderClass = isDarkMode ? "border-gray-700" : "border-gray-100";

  return (
    <section
      className={`py-16 px-5 mt-20 transition-colors duration-200 ${sectionBg}`}
      id="skills"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-5xl font-extrabold text-center mb-4 ${titleText}`}>
            Our Technology Stack
          </h2>
          <p
            className={`text-center text-base md:text-lg mb-2 max-w-3xl mx-auto ${subtitleText}`}
          >
            Built with modern, proven technologies to deliver scalable and performant solutions.
          </p>
          <div className={`h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mt-4 rounded-full`}></div>
        </div>

        {/* Core Stack */}
        <div className="mb-12">
          <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${titleText}`}>
            <span className="text-2xl">⚡</span> Core Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {CORE_STACK.map((item) => (
              <div
                key={item.name}
                className={`flex items-center gap-3 px-5 py-3 rounded-full ${cardBg} ${borderClass} border-2 transition-all hover:shadow-lg hover:scale-105 transform`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className={`font-semibold ${titleText}`}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div>
          <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${titleText}`}>
            <span className="text-2xl">🎯</span> Capabilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CAPABILITIES.map((cap) => (
              <article
                key={cap.title}
                className={`p-6 rounded-2xl ${cardInnerBg} ${borderClass} border-2 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 transform`}
              >
                <h4 className={`text-lg font-bold ${titleText} mb-2`}>
                  {cap.title}
                </h4>
                <p className={`text-sm mb-4 leading-relaxed ${subtitleText}`}>{cap.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {cap.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg ${cardBg} ${borderClass} border transition-all hover:shadow-md`}
                    >
                      <span className="text-base">{tool.icon}</span>
                      <span className={`text-xs font-semibold ${titleText}`}>{tool.name}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
