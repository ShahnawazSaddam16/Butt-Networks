import Achievements from '@/components/landing/Achievements';
import Hero from '@/components/landing/Hero';
import Technologies from '@/components/landing/Technologies';
import React from 'react'
import Projects from '../projects/[slug]/Projects';

const Home = () => {
  return (
    <>
    <Hero />
    <Technologies />
    <Achievements />
    <Projects />
    </>
  )
}

export default Home;