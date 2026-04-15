"use client";

import { User2, PhoneCall } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import React, { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Typewriter to avoid SSR issues
const Typewriter = dynamic(() => import("typewriter-effect"), {
  ssr: false,
  loading: () => (
    <span>
      At our software house, we believe in transforming ideas into impactful
      digital experiences. Our mission is not just to build applications, but to
      create intelligent solutions that drive growth and innovation. We are
      committed to delivering high-quality, scalable, and user-focused products
      that make a real difference. As a brand ambassador, I proudly represent a
      team that values creativity, integrity, and excellence in everything we
      do. We continuously explore new technologies and push boundaries to stay
      ahead in the digital world. Our goal is to empower businesses and
      individuals by turning their visions into reality. Together, we are
      building a future where technology connects, inspires, and transforms
      lives — one project at a time.
    </span>
  ),
});

const BrandAmbassador = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState("");

  return (
    <>
      <section className="mt-20 py-5 px-4 sm:px-10">
        {/* Header */}
        <header className="flex flex-col justify-center items-center text-center">
          <div className="Ambassador bg-blue-50 border px-4 py-1 border-blue-300 flex gap-2 rounded-[5px]">
            <User2
              size={15}
              className="BrandAmbassador-Icon mt-1 text-blue-500"
            />
            <h1 className="font-semibold text-blue-500 uppercase">
              Our Brand-Ambassador
            </h1>
          </div>

          <h2 className="Ambassador-Text mt-4 text-2xl sm:text-3xl font-bold text-gray-800">
            Representing Innovation{" "}
            <span className="BrandAmbassador-Highlight text-blue-600">
              & Excellence
            </span>
          </h2>

          <p className="Ambassador-P mt-2 text-gray-500 max-w-xl">
            Our ambassador stands as the face of our software house, driving
            vision, innovation, and trust across our global community.
          </p>
        </header>

        {/* Main Content */}
        <div className="BrandAmbassador-Content flex flex-col lg:flex-row justify-between items-center gap-10 mt-10">
          {/* Image Section */}
          <div className="BrandAmbassador-ImageSection ml-5 flex justify-center">
            <div className="BrandAmbassador-ImageContainer relative">
              <Image
                src={"/Ambassador.jpeg"}
                alt="Brand Ambassador"
                width={180}
                height={180}
                className="BrandAmbassador-Image rounded-xl shadow-lg object-cover"
                priority
              />
              <span className="BrandAmbassador-Verified absolute bottom-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                Verified
              </span>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 text-center lg:text-left">
            <h3 className="Ambassador-Text text-xl font-semibold text-gray-800">
              M.Ali
            </h3>
            <p className="BrandAmbassador-Role text-blue-500 font-medium">
              Brand Ambassador
            </p>

            <p className="Ambassador-P mt-4 text-gray-600 sm:text-left text-center w-full leading-relaxed">
              Passionate about building scalable digital solutions, our brand
              ambassador represents the core values of innovation, performance,
              and reliability. With a strong focus on user experience and modern
              technologies, they continuously strive to deliver impactful and
              efficient solutions. Their dedication and forward-thinking mindset
              help drive our mission to create meaningful digital
              transformation.
            </p>

            {/* Contact Button */}
            <div className="mt-5 flex sm:justify-start justify-center">
              <button
                onClick={() => setShowPopup(!showPopup)}
                className="bg-blue-600 px-6 py-2 flex gap-2 rounded-[10px] text-white font-semibold hover:bg-blue-700 cursor-pointer"
              >
                <PhoneCall size={20} />{" "}
                {showPopup ? "Hide Contact Info" : "View Contact Info"}
              </button>
            </div>

            {/* 🔥 POPUP SECTION */}
            {showPopup && (
              <div className="mt-6 flex flex-col items-center lg:items-start gap-3">
                {selectedInfo && (
                  <p className="text-blue-600 font-medium px-4 py-2 bg-blue-100 rounded-[50%_50%_40%_60%/60%_40%_60%_40%]">
                    {selectedInfo}
                  </p>
                )}

                {/* Icons */}
                <div className="flex gap-4">
                  {/* WhatsApp */}
                  <div
                    onClick={() => setSelectedInfo("+92 300 1234567")}
                    className={`p-4 text-white cursor-pointer hover:scale-110 transition ${
                      selectedInfo === "+92 300 1234567"
                        ? "bg-gradient-to-r from-green-400 to-green-600 rounded-[50%_50%_40%_60%/60%_40%_60%_40%]"
                        : "bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                    }`}
                  >
                    <FaWhatsapp size={20} />
                  </div>

                  {/* Instagram */}
                  <div
                    onClick={() => setSelectedInfo("@m.ali.dev")}
                    className={`p-4 text-white cursor-pointer hover:scale-110 transition ${
                      selectedInfo === "@m.ali.dev"
                        ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-[50%_50%_40%_60%/60%_40%_60%_40%]"
                        : "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full"
                    }`}
                  >
                    <FaInstagram size={20} />
                  </div>

                  {/* Email */}
                  <div
                    onClick={() => setSelectedInfo("mali@example.com")}
                    className={`p-4 text-white cursor-pointer hover:scale-110 transition ${
                      selectedInfo === "mali@example.com"
                        ? "bg-gradient-to-r from-gray-600 to-gray-900 rounded-[50%_50%_40%_60%/60%_40%_60%_40%]"
                        : "bg-gradient-to-r from-gray-600 to-gray-900 rounded-full"
                    }`}
                  >
                    <MdEmail size={20} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Speech Section */}
        <div className="Ambassador mt-14 bg-blue-50 border border-blue-300 rounded-xl p-6 sm:p-8 shadow-sm">
          <h3 className="Ambassador-Text text-xl font-semibold text-gray-800 text-center">
            Ambassador’s <span className="text-blue-600">Message</span>
          </h3>

          <div className="Ambassador-P mt-4 text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
            <Typewriter
              options={{
                strings: [
                  "At our software house, we believe in transforming ideas into impactful digital experiences...",
                ],
                autoStart: true,
                loop: true,
                delay: 30,
                deleteSpeed: 10,
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default BrandAmbassador;
