"use client";

import Achievements from '@/components/landing/Achievements';
import Hero from '@/components/landing/Hero';
import Technologies from '@/components/landing/Technologies';
import React, { useEffect } from 'react'
import Projects from '../projects/[slug]/Projects';
import WhatWeFix from '@/components/landing/WhatWeFix';
import Services from '@/components/landing/Services';

const Home = () => {
  useEffect(() => {
    const registerVisit = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/details`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        });
        await response.json();
      } catch (error) {
        console.log("Error registering visit:", error);
      }
    };

    registerVisit();
  }, []);

  return (
    <>
    <Hero />
    <Technologies />
    <Achievements />
    <Projects />
    <WhatWeFix />
    <Services />
    </>
  )
}

export default Home;