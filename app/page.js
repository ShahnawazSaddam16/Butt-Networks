// app/page.jsx (or wherever your Home component lives)
"use client";

import useHaptic from "@/lib/haptic";
import useGlobalHaptics from "@/lib/useGlobalHaptics";

import Home_ from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Team from "./components/Team";
import Offer from "./components/Offer";
import Services from "./components/Services";
import MakeWeb from "./components/MakeWeb";
import Testimonials from "./components/Testimonials";

export default function Home() {
  const triggerHaptic = useHaptic();
  useGlobalHaptics(triggerHaptic, { cooldownMs: 250 });

  return (
    <>
      <Home_ />
      <About />
      <Skills />
      <Projects limit={3} />
      <Services />
      <MakeWeb />
      <Team />
      <Testimonials />
      <Offer />
    </>
  );
}