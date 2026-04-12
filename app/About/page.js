"use client";
import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const blogs = [
  { image: "/Poster1.png" },
  { image: "/Poster2.png" },
  { image: "/Poster3.png" },
  { image: "/Poster4.png" },
  { image: "/Poster5.png" },
];

const About = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <>
      <section ref={sectionRef} className="Blogs mt-20">
        <h1 className="text-center font-bold text-[40px] mb-10">Blogs</h1>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className={`transition-all duration-700 opacity-0 ${
            visible ? "animate-fadeUp opacity-100" : ""
          }`}
        >
          {blogs.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="About bg-gray-100 shadow-lg rounded-xl p-5 text-center"
                style={{
                  animationDelay: visible ? `${index * 0.2}s` : "0s",
                  animationFillMode: "forwards",
                }}
              >
                <Image
                  src={item.image}
                  alt={`Blog Poster ${index + 1}`}
                  width={260}
                  height={260}
                  className="rounded-[5px] block m-auto"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default About;
