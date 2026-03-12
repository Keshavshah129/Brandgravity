import React, { useEffect } from 'react';
import IntroLoader from './components/IntroLoader';
import CustomCursor from './components/CustomCursor';
import InteractiveBackground from './components/InteractiveBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Process from './components/Process';
import Testimonial from './components/Testimonial';
import Footer from './components/Footer';

import Blog from './components/Blog';

import { useCustomCursor } from './hooks/useCustomCursor';
import { useMagneticHover } from './hooks/useMagneticHover';
import { useRevealOnScroll } from './hooks/useRevealOnScroll';

function App() {
  useCustomCursor();
  useMagneticHover();
  useRevealOnScroll();

  useEffect(() => {
    // --- Initial Setup ---
    document.body.style.backgroundColor = '#050505';
    document.body.style.color = '#ffffff';

    // --- Section Wipe Effect Logic ---
    const sections = document.querySelectorAll('.wipe-section');
    const navbar = document.getElementById('navbar');

    const wipeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('light-section')) {
            document.body.style.backgroundColor = '#f7f7f7';
            document.body.style.color = '#0d0d0d';
          } else {
            document.body.style.backgroundColor = '#050505';
            document.body.style.color = '#ffffff';
          }
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: "-10% 0px -10% 0px"
    });

    sections.forEach(sec => {
      wipeObserver.observe(sec);
    });

    return () => {
      sections.forEach(sec => wipeObserver.unobserve(sec));
    };
  }, []);

  return (
    <>
      <IntroLoader />
      <CustomCursor />
      <InteractiveBackground />
      <Navbar />
      <main className="main-wrapper">
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Process />
        <Blog />
        <Testimonial />
        <Footer />
      </main>
    </>
  );
}

export default App;
