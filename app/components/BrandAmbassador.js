"use client";

import { PhoneCall, CheckCircle2, Mail, Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const Typewriter = dynamic(() => import("typewriter-effect"), {
  ssr: false,
  loading: () => (
    <span className="text-blue-700/60 italic">
      At our software house, we believe in transforming ideas into impactful
      digital experiences…
    </span>
  ),
});

const CONTACT_ITEMS = [
  {
    id: "whatsapp",
    Icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+92 300 1234567",
    href: "https://wa.me/923001234567",
    bg: "bg-emerald-500 hover:bg-emerald-600",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "instagram",
    Icon: Instagram,
    label: "Instagram",
    value: "@m.ali.dev",
    href: "https://instagram.com/m.ali.dev",
    bg: "bg-pink-500 hover:bg-pink-600",
    pill: "bg-pink-50 text-pink-700 border-pink-200",
  },
  {
    id: "email",
    Icon: Mail,
    label: "Email",
    value: "mali@example.com",
    href: "mailto:mali@example.com",
    bg: "bg-blue-600 hover:bg-blue-700",
    pill: "bg-blue-50 text-blue-700 border-blue-200",
  },
];

const AMBASSADOR_MESSAGE =
  "At our software house, we believe in transforming ideas into impactful digital experiences. Our mission is not just to build applications, but to create intelligent solutions that drive growth and innovation. We are committed to delivering high-quality, scalable, and user-focused products that make a real difference.";

export default function BrandAmbassador() {
  const [showContact, setShowContact] = useState(false);
  const [activeContact, setActiveContact] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleContactClick = (id) => {
    setActiveContact((prev) => (prev === id ? null : id));
  };

  const active = CONTACT_ITEMS.find((c) => c.id === activeContact);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-8 overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-[300px] h-[300px] rounded-full bg-blue-50/60 blur-2xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* ── Section Label ── */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Brand Ambassador
          </span>
        </div>

        {/* ── Heading ── */}
        <div
          className={`mt-5 text-center transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Representing{" "}
            <span className="text-blue-600">Innovation & Excellence</span>
          </h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto text-base leading-relaxed">
            The face of our software house — driving vision, trust, and impact
            across our global community.
          </p>
        </div>

        {/* ── Main Card ── */}
        <div
          className={`mt-12 grid lg:grid-cols-[auto_1fr] gap-10 items-start transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Left — Image & Identity */}
          <div className="flex flex-col items-center lg:items-start gap-5">
            {/* Avatar */}
            <div className="relative group">
              <div className="absolute inset-0 rounded-2xl bg-blue-500/20 scale-105 group-hover:scale-110 transition-transform duration-500" />
              <div className="relative w-44 h-44 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl">
                <Image
                  src="/Ambassador.jpeg"
                  alt="M.Ali — Brand Ambassador"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 -right-2 flex items-center gap-1 bg-blue-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md">
                <CheckCircle2 size={11} />
                Verified
              </div>
            </div>

            {/* Name & role */}
            <div className="text-center lg:text-left">
              <p className="text-xl font-bold text-gray-900">M. Ali</p>
              <p className="text-blue-500 text-sm font-medium mt-0.5">
                Brand Ambassador
              </p>
            </div>

            {/* Stats row */}
            <div className="flex gap-4 text-center">
              {[
                { value: "3+", label: "Years" },
                { value: "40+", label: "Projects" },
                { value: "100%", label: "Committed" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center px-3 py-2 bg-blue-50 rounded-xl border border-blue-100"
                >
                  <span className="text-lg font-bold text-blue-700">
                    {value}
                  </span>
                  <span className="text-[11px] text-blue-400 font-medium uppercase tracking-wide">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Bio & Contact */}
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed text-[15px]">
              Passionate about building scalable digital solutions, M. Ali
              represents the core values of innovation, performance, and
              reliability. With a sharp focus on user experience and modern
              technologies, he continuously strives to deliver impactful and
              efficient solutions. His forward-thinking mindset drives our
              mission to create meaningful digital transformation.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {["Full-Stack Dev", "UX Focused", "Agile", "Open Source"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>

            {/* Contact toggle */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setShowContact(!showContact);
                  setActiveContact(null);
                }}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-blue-200"
              >
                <PhoneCall size={17} />
                {showContact ? "Hide Contact Info" : "View Contact Info"}
              </button>

              {/* Contact panel */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showContact
                    ? "max-h-40 opacity-100 mt-5"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    {CONTACT_ITEMS.map(({ id, Icon, label, bg }) => (
                      <button
                        key={id}
                        onClick={() => handleContactClick(id)}
                        title={label}
                        className={`${bg} text-white w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 ${
                          activeContact === id
                            ? "ring-2 ring-offset-2 ring-current scale-105"
                            : ""
                        }`}
                      >
                        <Icon size={18} />
                      </button>
                    ))}
                  </div>

                  {/* Inline info display */}
                  {active && (
                    <a
                      href={active.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 border px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80 w-fit ${active.pill}`}
                    >
                      <active.Icon size={14} />
                      {active.value}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Ambassador Message ── */}
        <div
          className={`mt-16 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 sm:p-10 overflow-hidden shadow-xl shadow-blue-200/50">
            {/* Decorative quote mark */}
            <span className="pointer-events-none absolute -top-4 left-6 text-[120px] leading-none text-white/10 font-serif select-none">
              "
            </span>

            <p className="text-xs font-semibold text-blue-200 uppercase tracking-widest mb-3">
              Ambassador's Message
            </p>

            <div className="relative text-white text-base sm:text-lg leading-relaxed font-light min-h-[80px]">
              <Typewriter
                options={{
                  strings: [AMBASSADOR_MESSAGE],
                  autoStart: true,
                  loop: true,
                  delay: 25,
                  deleteSpeed: 8,
                }}
              />
            </div>

            {/* Signature */}
            <div className="mt-6 flex items-center gap-3">
              <div className="w-8 h-px bg-blue-400" />
              <p className="text-blue-200 text-sm font-medium">
                M. Ali &mdash; Brand Ambassador
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
