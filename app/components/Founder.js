"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { User2 } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { useTheme } from "./ThemeProvider";

const Founder = () => {
  const [startTyping1, setStartTyping1] = useState(false);
  const [startTyping2, setStartTyping2] = useState(false);
  const { isDarkMode } = useTheme();

  const sectionRef1 = useRef();
  const sectionRef2 = useRef();

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
      className={`mt-10 py-10 transition-colors ${sectionBg}`}
    >
      {/* Header */}
      <h1
        className={`text-center font-extrabold text-4xl mb-4 flex items-center justify-center gap-3 tracking-wide ${titleText}`}
      >
        <User2 size={28} />
        Founders
      </h1>

      <p
        className={`text-center text-lg mb-10 max-w-3xl mx-auto ${subtitleText}`}
      >
        Two builders covering design, frontend, backend, and infrastructure.
      </p>

      {/* =======================
         SHAHNAWAZ
      ======================== */}
      <div
        ref={sectionRef1}
        className={`max-w-5xl mx-auto rounded-md p-10 flex flex-col md:flex-row items-center gap-8 shadow-lg mb-12 transition-colors ${cardBg}`}
      >
        <div
          className={`w-40 h-40 rounded-full overflow-hidden border-4 shadow-md ${borderColor}`}
        >
          <Image
            src="/developer.jpg"
            width={300}
            height={300}
            alt="Shahnawaz Saddam Butt"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center md:text-left flex flex-col items-center md:items-start max-w-xl">
          <h2 className={`text-3xl font-bold mb-2 ${titleText}`}>
            Shahnawaz Saddam Butt
          </h2>

          <p className={`text-lg font-semibold mb-4 ${subtitleText}`}>
            Founder & Full-Stack Developer
          </p>

          <p
            className={`leading-relaxed mb-6 min-h-20 whitespace-pre-wrap ${bodyText}`}
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

          <a
            href="https://shahnawaz.buttnetworks.com/"
            target="_blank"
            rel="noreferrer"
          >
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition">
              Visit Profile
            </button>
          </a>
        </div>
      </div>

      {/* =======================
         WAHB
      ======================== */}
      <div
        ref={sectionRef2}
        className={`max-w-5xl mx-auto rounded-md p-10 flex flex-col md:flex-row items-center gap-8 shadow-lg transition-colors ${cardBg}`}
      >
        <div
          className={`w-40 h-40 rounded-full overflow-hidden border-4 shadow-md ${borderColor}`}
        >
          <Image
            src="/developer2.svg"
            width={300}
            height={300}
            alt="Wahb Amir"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center md:text-left flex flex-col items-center md:items-start max-w-xl">
          <h2 className={`text-3xl font-bold mb-2 ${titleText}`}>Wahb Amir</h2>

          <p className={`text-lg font-semibold mb-4 ${subtitleText}`}>
            Co-Founder & Technical Lead
          </p>

          <p
            className={`leading-relaxed mb-6 min-h-20 whitespace-pre-wrap ${bodyText}`}
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

          <a href="https://wahb.space" target="_blank" rel="noreferrer">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition">
              Visit Profile
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Founder;
