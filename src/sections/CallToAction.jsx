import React from 'react';
import { motion } from 'framer-motion';
import bgimg from '../assets/8.png';

export default function CallToAction() {
  const marqueeText = "GREAT WORK FOR GREAT PEOPLE DOING GREAT THINGS ";

  return (
    <section className="relative w-full bg-[#0d0f0d] text-white font-sans overflow-hidden">

      {/* 1. Scrolling Ticker / Marquee Banner */}
      <div className="w-full bg-[#ff0000] text-[#0d0f0d] py-2.5 overflow-hidden whitespace-nowrap flex items-center font-mono text-xs uppercase tracking-widest font-bold border-b border-black/10">
        <motion.div
          className="inline-block whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
        >
          {Array(10).fill(marqueeText).map((text, idx) => (
            <span key={idx} className="inline-flex items-center mx-3">
              <span>{text}</span>
              <span className="ml-3 text-[10px]">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* 2. Background Image + Text Overlay Hero Section */}
      <div className="relative w-full min-h-[85vh] flex flex-col justify-center items-center text-center px-6 py-24">

        {/* Background Image Container */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-100"
          style={{
            backgroundImage: `url(${bgimg})`,
          }}
        >
          {/* Dark Gradients & Vignette Overlays */}
          {/* <div className="absolute inset-0 bg-[#0d0f0d]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f0d]/60 via-transparent to-black" /> */}
        </div>

        {/* Inner bottom shadow / gradient blend for seamless transition to black footer */}
        {/* <div 
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 sm:h-64 md:h-80 bg-gradient-to-t from-black via-black/80 to-transparent z-[5]" 
          aria-hidden="true" 
        /> */}

        {/* Hero Overlay Content */}
       
      </div>

    </section>
  );
}