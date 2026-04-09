import { User2, Mail, Phone, Globe, PhoneCall } from "lucide-react";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import Typewriter to avoid SSR issues
const Typewriter = dynamic(() => import("typewriter-effect"), {
  ssr: false,
  loading: () => <span>At our software house, we believe in transforming ideas into impactful digital experiences...</span>
});

const BrandAmbassador = () => {
  return (
    <>
      <section className="mt-20 py-5 px-4 sm:px-10">
        {/* Header */}
        <header className="flex flex-col justify-center items-center text-center">
          <div className="Ambassador bg-blue-50 border px-4 py-1 border-blue-300 flex gap-2 rounded-[5px]">
            <User2 size={15} className="BrandAmbassador-Icon mt-1 text-blue-500" />
            <h1 className="font-semibold text-blue-500 uppercase">
              Our Brand-Ambassador
            </h1>
          </div>

          <h2 className="Ambassador-Text mt-4 text-2xl sm:text-3xl font-bold text-gray-800">
            Representing Innovation <span className="BrandAmbassador-Highlight text-blue-600">& Excellence</span>
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
              Brand Ambassador & Full Stack Developer
            </p>

            <p className="Ambassador-P mt-4 text-gray-600 leading-relaxed">
              Passionate about building scalable digital solutions, our brand
              ambassador represents the core values of innovation, performance,
              and reliability. With expertise in modern web technologies, they
              bridge the gap between ideas and execution.
            </p>

            {/* Contact Info */}
            <div className="mt-5">
              <button className="bg-blue-600 px-6 py-2 flex gap-2 rounded-[10px] text-white
              font-semibold">
              <PhoneCall size={20}/> View Contact Info</button>
            </div>

            </div>
            </div>

        {/* Speech Section */}
        <div className="Ambassador mt-14 bg-gray-50 border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h3 className="Ambassador-Text text-xl font-semibold text-gray-800 text-center">
            Ambassador’s Message
          </h3>

          <div className="Ambassador-P mt-4 text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
            <Typewriter
              options={{
                strings: [
                  "At our software house, we believe in transforming ideas into impactful digital experiences. Our mission is not just to build applications, but to create solutions that empower businesses and individuals worldwide. As a brand ambassador, I proudly represent a team that values innovation, integrity, and excellence. Together, we are shaping the future of technology — one project at a time."
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