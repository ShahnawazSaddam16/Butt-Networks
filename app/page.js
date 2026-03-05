"use client";

import { useEffect } from "react";
import useHaptic from "@/lib/haptic";
import Home_ from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Founder from "./components/Founder";
import Offer from "./components/Offer";
import Services from "./components/Services";
import Quiz_App from "./components/Quiz-App";
import MakeWeb from "./components/MakeWeb";
import Testimonials from "./components/Testimonials";

export default function Home() {
  const triggerHaptic = useHaptic();

  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target 
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.getAttribute("role") === "button"
      ) {
        triggerHaptic("selection");
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [triggerHaptic]);

  return (
    <>
      <Home_ />
      <About />
      <Skills />
      <Projects limit={3} />
      <Services />
      <MakeWeb />
      <Quiz_App />
      <Founder />
      <Testimonials />
      <Offer />
    </>
  );
}