import Achievements from '@/components/landing/Achievements';
import Hero from '@/components/landing/Hero';
import Technologies from '@/components/landing/Technologies';
import React from 'react'
import Projects from '../projects/[slug]/Projects';
import WhatWeFix from '@/components/landing/WhatWeFix';
import Services from '@/components/landing/Services';

const Home = () => {
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