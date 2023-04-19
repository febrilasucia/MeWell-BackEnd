import React from 'react'
import HeroSection from '../../components/About/HeroSection'
import Team from '../../components/About/Team'
import Layout from '../Layout'

function About() {
  return (
    <Layout>
        <HeroSection />
        <Team />
    </Layout>
  )
}

export default About