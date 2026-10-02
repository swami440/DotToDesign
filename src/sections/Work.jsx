import React from 'react';
import { motion } from 'framer-motion';
import airhiveImg from '../assets/airhive.jpg';
import acreImg from '../assets/acre_insight.jpg';
import climcanadaImg from '../assets/climcanada.jpg';
import verdantImg from '../assets/verdant.jpg';

const projects = [
  {
    id: 'airhive',
    title: 'Airhive',
    subtitle: 'DAC technology accelerating carbon removal',
    tags: ['BRAND', 'MOTION DESIGN', 'WEBSITE', '+3'],
    image: airhiveImg,
    align: 'right', // 1st project sits on the right as in user reference
  },
  {
    id: 'acre-insight',
    title: 'Acre Insight',
    subtitle: 'Connecting land owners with renewable project partners',
    tags: ['BRAND', 'WEBSITE', 'STRATEGY'],
    image: acreImg,
    align: 'left', // 2nd project sits on the left
  },
  {
    id: 'climcanada',
    title: 'ClimCanada',
    subtitle: 'A new breed of climate venture builder studio',
    tags: ['BRAND', 'IDENTITY', 'DIGITAL', '+2'],
    image: climcanadaImg,
    align: 'right', // 3rd project sits on the right
  },
  {
    id: 'verdant',
    title: 'Verdant Labs',
    subtitle: 'Next-generation biodiversity intelligence platform',
    tags: ['PRODUCT', 'WEBSITE', 'DESIGN SYSTEM'],
    image: verdantImg,
    align: 'left', // 4th project sits on the left
  },
];

export default function Work() {
  return (
    <section id="work" className="w-full bg-white text-[#171413] py-16 sm:py-24 px-6 sm:px-10 lg:px-16 font-sans overflow-hidden">
      <div className="max-w-[1680px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 flex items-center justify-between border-b border-black/10 pb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[#737373]">
            Selected Work (<span className="text-[#FF0000] font-semibold">0{projects.length}</span>)
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#737373]">
            Featured Projects
          </span>
        </div>

        {/* Alternating Staggered Project Cards with Smooth Animated Partition Lines */}
        <div className="flex flex-col">
          {projects.map((project, idx) => {
            const isRight = project.align === 'right';

            return (
              <React.Fragment key={project.id}>
                <div
                  className={`w-full flex ${isRight ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="w-full lg:w-[58%] xl:w-[54%] group cursor-pointer">
                    
                    {/* Image Container with Center-to-Whole-Size Uncover Animation */}
                    <motion.div
                      initial={{
                        clipPath: 'inset(22% 22% 22% 22% round 4px)',
                        opacity: 1,
                      }}
                      whileInView={{
                        clipPath: 'inset(0% 0% 0% 0% round 4px)',
                        opacity: 1,
                      }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: 1.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="relative w-full aspect-[16/13] overflow-hidden rounded-sm bg-[#111111] border border-black/10 shadow-[0_16px_40px_rgba(0,0,0,0.06)] group-hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)] transition-shadow duration-500"
                    >
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        initial={{ scale: 1 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                          duration: 1.2,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                    </motion.div>

                    {/* Project Details / Meta Row */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.2,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="mt-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                    >
                      {/* Left: Title & Subtitle */}
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#171413] group-hover:text-[#FF0000] transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="mt-1.5 text-sm sm:text-base text-[#737373] font-light tracking-tight leading-relaxed">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Right: Pill Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 sm:pt-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-[3px] border border-black/10 text-[10px] sm:text-[11px] font-mono tracking-wider text-[#737373] uppercase bg-black/[0.02] select-none group-hover:border-[#FF0000]/40 group-hover:text-[#171413] group-hover:bg-[#FF0000]/5 transition-all duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                  </div>
                </div>

                {/* Smooth Animated Partition Line Between Projects */}
                {idx < projects.length - 1 && (
                  <div className="w-full overflow-hidden my-14 sm:my-16 lg:my-20">
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        duration: 1.15,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="w-full h-[1px] bg-black/10 origin-left"
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
}