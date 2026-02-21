"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Network, ShieldCheck, Cpu, Lightbulb } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { useTheme } from "./ThemeProvider"; // expects your ThemeProvider hook

const COPY_VARIANTS = {
  professional: `Butt Networks is a small development team that specialises in creating cutting-edge, dependable, and safe online solutions for people and companies. In order to design scalable systems and continuously improve by constructing real-world projects, we combine strong technical foundations with innovative problem-solving techniques.`,
};

const statsInitial = [
  { id: "projects", label: "Projects Built", value: 5 },
  { id: "collabs", label: "Team Collaborations", value: 2 },
  { id: "tech", label: "Technologies Used", value: 10 },
];

function useCountUp(active, target, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Number((target * progress).toFixed(target % 1 ? 2 : 0)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

const About = ({ copyVariant = "professional" }) => {
  const { isDarkMode } = useTheme?.() ?? { isDarkMode: false };

  // theme classes (from your example)
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-gray-50";
  const cardInnerBg = isDarkMode ? "bg-gray-900" : "bg-white";
  const titleText = isDarkMode ? "text-gray-200" : "text-gray-900";
  const subtitleText = isDarkMode ? "text-gray-400" : "text-gray-600";
  const sectionBg = isDarkMode ? "bg-gray-900/60" : "bg-white/60";
  const borderClass = isDarkMode ? "border-gray-700" : "border-gray-100";
  const iconColor = isDarkMode ? "text-blue-300" : "text-blue-500";
  const border = isDarkMode ? "border-gray-300" : "border-gray-800";

  const [revealSignature, setRevealSignature] = useState(false);
  const [started, setStarted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef(null);

  const copyText = COPY_VARIANTS[copyVariant] || COPY_VARIANTS.professional;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener?.("change", onChange);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => {
      mq.removeEventListener?.("change", onChange);
      if (sectionRef.current) obs.unobserve(sectionRef.current);
    };
  }, [started]);

  const countersActive = started && !reducedMotion;
  const uptime = useCountUp(countersActive, statsInitial[0].value, 1000);
  const throughput = useCountUp(countersActive, statsInitial[1].value, 1000);
  const clients = useCountUp(countersActive, statsInitial[2].value, 1200);

  const handleTypeDone = useCallback(() => {
    if (!reducedMotion) {
      setTimeout(() => setRevealSignature(true), 400);
    } else {
      setRevealSignature(true);
    }
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className={`mt-16 py-16 px-6 rounded-lg shadow-sm transition-colors duration-200 ${sectionBg}`}
    >
      <div
        className={`max-w-5xl mx-auto text-center pt-8`}
      >
        <header className="flex items-center justify-center gap-3 mb-8">
          <Network className={`w-12 h-12 ${iconColor}`} aria-hidden="true" />
          <h2
            id="about-heading"
            className={`text-4xl md:text-5xl font-extrabold ${titleText}`}
          >
            About Us
          </h2>
        </header>

        <div className={`h-1 w-20 mx-auto mb-8 rounded-full bg-gradient-to-r ${isDarkMode ? "from-blue-400 to-cyan-400" : "from-blue-600 to-indigo-600"}`}></div>

        <div className="mx-auto max-w-3xl">
          {!started && (
            <p
              className={`text-lg leading-relaxed min-h-[56px] ${subtitleText}`}
            />
          )}

          {started && !reducedMotion ? (
            <p
              className={`text-lg leading-relaxed whitespace-pre-line ${subtitleText}`}
              aria-live="polite"
            >
              <Typewriter
                words={[copyText]}
                cursor
                cursorStyle="|"
                typeSpeed={28}
                deleteSpeed={0}
                delaySpeed={1000}
                onLoopDone={handleTypeDone}
                loop={1}
              />
            </p>
          ) : (
            <p className={`text-lg leading-relaxed ${subtitleText}`}>
              {copyText}
            </p>
          )}

          {revealSignature && (
            <div className={`mt-6 text-right italic font-semibold text-blue-500`}>
              — Built by The Butt Networks Team
            </div>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            "Real-World Practice",
            "Modern Web Stack",
            "Team Collaboration",
          ].map((title, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl ${cardInnerBg} border-2 ${borderClass} shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1`}
            >
              <div className={`text-lg font-bold ${titleText}`}>
                {title}
              </div>
              <p className={`mt-2 text-sm leading-relaxed ${subtitleText}`}>
                {title === "Real-World Practice" &&
                  "We build practical projects to learn how modern applications work in real scenarios."}
                {title === "Modern Web Stack" &&
                  "Next.js, React, Node.js, Tailwind, Docker, Linux, and cloud fundamentals."}
                {title === "Team Collaboration" &&
                  "We work together like a small product team — planning, building, and reviewing."}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <FeatureCard
            Icon={ShieldCheck}
            title="Secure Solutions"
            desc="End-to-end encrypted and audited."
            colorClass="text-green-400"
            isDarkMode={isDarkMode}
          />
          <FeatureCard
            Icon={Cpu}
            title="High Performance"
            desc="Optimized routing & low latency."
            colorClass="text-purple-400"
            isDarkMode={isDarkMode}
          />
          <FeatureCard
            Icon={Lightbulb}
            title="Innovative Ideas"
            desc="Product design + network automation."
            colorClass="text-yellow-400"
            isDarkMode={isDarkMode}
          />
          <FeatureCard
            Icon={Network}
            title="Reliable Networks"
            desc="Redundancy and proactive monitoring."
            colorClass="text-blue-400"
            isDarkMode={isDarkMode}
          />
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div className="sm:col-span-2">
            <h3 className={`text-lg font-semibold ${titleText}`}>
              Meet the team
            </h3>
            <p className={`text-sm ${subtitleText}`}>
              A compact, cross-disciplinary team that blends infrastructure
              engineering with design & content.
            </p>

            <div className="mt-4 flex items-center gap-3 justify-center">
              <TeamAvatar
                name="Shahnawaz Saddam"
                role="Frontend-Focused Full-Stack Developer"
                isDarkMode={isDarkMode}
              />
              <TeamAvatar
                name="Wahb Amir"
                role="Full-Stack & Systems Architect"
                isDarkMode={isDarkMode}
              />
            </div>
          </div>

          <div className="mt-4 sm:mt-0 flex gap-3 justify-center sm:justify-end">
            <Link
              href="/About"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
              aria-label="Explore our blogs"
            >
              Explore Our Blogs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

function FeatureCard({ Icon, title, desc, colorClass, isDarkMode }) {
  const cardBg = isDarkMode ? "bg-gray-900/50" : "bg-gray-100/50";
  const borderClass = isDarkMode ? "border-gray-700" : "border-gray-200";
  const titleText = isDarkMode ? "text-gray-200" : "text-gray-800";
  const subtitleText = isDarkMode ? "text-gray-400" : "text-gray-600";

  return (
    <div
      className={`flex flex-col items-center p-6 rounded-2xl ${cardBg} border-2 ${borderClass} shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 group`}
    >
      <Icon className={`w-12 h-12 mb-3 ${colorClass} group-hover:scale-110 transition-transform`} aria-hidden="true" />
      <h4 className={`${titleText} font-bold text-lg`}>{title}</h4>
      <p className={`${subtitleText} text-sm mt-2 leading-relaxed`}>{desc}</p>
    </div>
  );
}

function TeamAvatar({ name, role, isDarkMode }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const avatarBg = isDarkMode
    ? "bg-gradient-to-r from-blue-700 to-indigo-800"
    : "bg-gradient-to-r from-blue-400 to-indigo-500";
  const nameText = isDarkMode ? "text-gray-200" : "text-gray-900";
  const roleText = isDarkMode ? "text-gray-400" : "text-gray-500";

  return (
    <div
      className={`flex items-center gap-3 border-2 ${
        isDarkMode ? "border-gray-700" : "border-gray-100"
      } rounded-2xl p-3 transition-all hover:shadow-md`}
    >
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full ${avatarBg} text-white font-bold`}
      >
        {initials}
      </div>
      <div className="text-left">
        <div className={`text-sm font-bold ${nameText}`}>{name}</div>
        <div className={`text-xs font-medium ${roleText}`}>{role}</div>
      </div>
    </div>
  );
}

export default About;
