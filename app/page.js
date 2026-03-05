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
    const target = e.target ;
    let pattern = "medium"; // default

    // Determine pattern based on element type
    if (target.tagName === "BUTTON") {
      pattern = "rigid";      // solid click
    } else if (target.tagName === "A") {
      pattern = "soft";       // lighter tap
    } else if (target.getAttribute("role") === "button") {
      pattern = "medium";     // standard interactive
    } else if (typeof (target).onclick === "function") {
      pattern = "light";    
    } else {
      return;                 
    }
    // debugging log
    // console.log(`Haptic triggered on <${target.tagName.toLowerCase()}> with pattern "${pattern}"`, target);

    triggerHaptic(pattern);
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