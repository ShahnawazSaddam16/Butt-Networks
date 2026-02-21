"use client";

import React, { useRef, useEffect, useState } from "react";
import { Star, Quote, CheckCircle, TrendingUp, Award, Heart } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const Testimonials = () => {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  /* =======================
     THEME CLASSES (NO ANIMATION)
  ======================== */
  const sectionBg = isDarkMode ? "bg-gray-900/60" : "bg-white/60";
  const titleText = isDarkMode ? "text-gray-100" : "text-gray-900";
  const subtitleText = isDarkMode ? "text-gray-400" : "text-gray-700";
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-white";
  const cardBorder = isDarkMode ? "border-gray-700" : "border-gray-200";
  const gradientText = isDarkMode
    ? "from-blue-400 to-cyan-400"
    : "from-blue-600 to-indigo-600";

  /* =======================
     INTERSECTION OBSERVER (ONLY FOR SCROLL REVEAL)
  ======================== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  /* =======================
     TESTIMONIALS DATA
  ======================== */
  const testimonials = [
    {
      id: 1,
      name: "Ahmed Hassan",
      role: "Startup Founder",
      company: "TechVenture Inc",
      content:
        "Working with Butt Networks transformed our web presence. Their attention to detail and modern approach delivered exactly what we needed. Highly recommended!",
      rating: 5,
      icon: TrendingUp,
      avatar: "AH",
    },
    {
      id: 2,
      name: "Fatima Khan",
      role: "Product Manager",
      company: "Digital Solutions Ltd",
      content:
        "The team's expertise in full-stack development is exceptional. They delivered our platform on time and the code quality is outstanding. Great partnership!",
      rating: 5,
      icon: Award,
      avatar: "FK",
    },
    {
      id: 3,
      name: "Muhammad Ali",
      role: "CEO",
      company: "Global Tech Co",
      content:
        "From concept to deployment, Butt Networks demonstrated professionalism and technical excellence. Our application performs beautifully and scales effortlessly.",
      rating: 5,
      icon: CheckCircle,
      avatar: "MA",
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Business Lead",
      company: "Innovation Hub",
      content:
        "The responsive design and user experience exceeded our expectations. The team was collaborative, communicative, and delivered beyond the scope.",
      rating: 5,
      icon: Heart,
      avatar: "SW",
    },
    {
      id: 5,
      name: "Ali Raza",
      role: "Managing Director",
      company: "Enterprise Solutions",
      content:
        "We've never experienced such a seamless development process. Butt Networks combined technical skill with remarkable communication throughout.",
      rating: 5,
      icon: TrendingUp,
      avatar: "AR",
    },
    {
      id: 6,
      name: "Emma Johnson",
      role: "Operations Manager",
      company: "StartUp Accelerator",
      content:
        "Outstanding work on our mobile app. The team's backend architecture is scalable and the UI is intuitive. Definitely working with them again!",
      rating: 5,
      icon: Award,
      avatar: "EJ",
    },
  ];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className={`mt-20 py-16 ${sectionBg}`}
    >
      {/* Header */}
      <div className="text-center mb-16 max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Star className="text-yellow-400" size={28} />
          <h2 className={`text-4xl md:text-5xl font-extrabold ${titleText}`}>
            Client Testimonials
          </h2>
          <Star className="text-yellow-400" size={28} />
        </div>

        <p className={`text-lg ${subtitleText} mt-4`}>
          Trusted by leading businesses and startups. Hear what our clients have to say.
        </p>

        <div
          className={`h-1 w-20 bg-gradient-to-r ${gradientText} mx-auto rounded-full mt-4`}
        />
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, idx) => {
          const IconComponent = testimonial.icon;

          return (
            <article
              key={testimonial.id}
              className={`p-6 rounded-2xl ${cardBg} border-2 ${cardBorder} shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-transform duration-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? `${idx * 100}ms` : "0ms",
              }}
            >
              <Quote
                className={`w-8 h-8 mb-4 opacity-20 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-400 fill-yellow-400"
                    size={18}
                  />
                ))}
              </div>

              <p className={`text-sm leading-relaxed mb-5 ${subtitleText}`}>
                "{testimonial.content}"
              </p>

              <div
                className={`h-px mb-5 ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      idx % 3 === 0
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                        : idx % 3 === 1
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : "bg-gradient-to-r from-green-500 to-teal-500"
                    }`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${titleText}`}>
                      {testimonial.name}
                    </h4>
                    <p className={`text-xs ${subtitleText}`}>
                      {testimonial.role} @ {testimonial.company}
                    </p>
                  </div>
                </div>

                <IconComponent
                  className={`w-5 h-5 ${
                    idx % 3 === 0
                      ? "text-blue-500"
                      : idx % 3 === 1
                      ? "text-purple-500"
                      : "text-green-500"
                  }`}
                />
              </div>
            </article>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <p className={`text-lg font-semibold mb-6 ${titleText}`}>
          Ready to work with us?
        </p>
        <a
          href="/Contact"
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-transform duration-300"
        >
          Get in Touch Today
        </a>
      </div>
    </section>
  );
};

export default Testimonials;