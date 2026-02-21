"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Quiz_App = () => {
  return (
    <section className="QuizApp py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">

       {/* LEFT SIDE - Swiper Images */}
<div className="w-full lg:w-1/2 flex justify-center">
  <Swiper
    modules={[Autoplay, Pagination]}
    spaceBetween={20}
    slidesPerView={1}
    autoplay={{ delay: 2500 }}
    pagination={{ clickable: true }}
    loop={true}
    className="w-[280px] h-[500px] rounded-2xl shadow-2xl"
  >
    <SwiperSlide>
      <img
        src="/quiz1.jpeg"
        alt="Quiz App Screen 1"
        className="w-full h-full object-cover rounded-2xl"
      />
    </SwiperSlide>

    <SwiperSlide>
      <img
        src="/quiz2.jpeg"
        alt="Quiz App Screen 2"
        className="w-full h-full object-cover rounded-2xl"
      />
    </SwiperSlide>

    <SwiperSlide>
      <img
        src="/quiz3.jpeg"
        alt="Quiz App Screen 3"
        className="w-full h-full object-cover rounded-2xl"
      />
    </SwiperSlide>

    <SwiperSlide>
      <img
        src="/quiz4.jpeg"
        alt="Quiz App Screen 4"
        className="w-full h-full object-cover rounded-2xl"
      />
    </SwiperSlide>
  </Swiper>
</div>

        {/* RIGHT SIDE - Your Original Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          
          {/* Header */}
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
            Master Coding Skills with{" "}
            <span className="text-blue-600">Fun Quizzes!</span>
          </h1>

          {/* Description */}
          <p className="Quiz-Text text-lg lg:text-xl mb-6 text-gray-900">
            Challenge yourself with coding questions, test your knowledge, and improve your programming skills with our interactive mobile quiz app.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <a
              href="/Programming-Quiz.apk"
              download
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Download Now
            </a>

            <button className="bg-gray-100 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition">
              Learn More
            </button>
          </div>

          {/* Note */}
          <p className="Quiz-Text mt-6 text-sm text-gray-800">
            Available for Android devices. Free to download.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Quiz_App;