import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

// Project & capability images matching the rest of the site
import airhiveImg from "../assets/airhive.jpg";
import acreImg from "../assets/acre_insight.jpg";
import climcanadaImg from "../assets/climcanada.jpg";
import verdantImg from "../assets/verdant.jpg";
import capabilitiesBg from "../assets/capabilities-1.webp";

gsap.registerPlugin(ScrollTrigger);

const RED = "#FF0000";
const INK = "#171413";
const GRAY = "#737373";
const LIGHT_BG = "#FAFAF2";
const BORDER_LIGHT = "rgba(0, 0, 0, 0.08)";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const SANS = "font-['PPNeueMontreal',Helvetica,Arial,sans-serif]";
const MONO = "font-['Space_Grotesk',monospace]";

const SERVICES = [
  {
    id: "brand",
    number: "01",
    title: "Brand Identity & Systems",
    sub: "From atom to icon, we forge identity systems that live in memory.",
    desc: "Every pixel carries intent. We build comprehensive design systems, logomarks, typography scales, and guidelines designed to scale across every digital and physical touchpoint seamlessly.",
    tags: ["Visual Identity", "Design Systems", "Typography", "Art Direction"],
    metric: { value: "3.2x", label: "Brand Recall Lift" },
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6 text-[#FF0000]" stroke="currentColor" strokeWidth="1.6">
        <path d="M20 4L34 12V28L20 36L6 28V12L20 4Z" strokeLinejoin="round" />
        <path d="M20 16L27 20V28L20 32L13 28V20L20 16Z" strokeDasharray="2 2" />
        <circle cx="20" cy="20" r="3" fill="#FF0000" />
      </svg>
    ),
  },
  {
    id: "motion",
    number: "02",
    title: "Motion & Interactive 3D",
    sub: "Interfaces that breathe, respond, and guide human attention.",
    desc: "Static is forgotten. We animate with precision—from micro-interactions that reward curiosity to immersive WebGL interactions and cinematic brand narrative films that convert.",
    tags: ["UI Animation", "WebGL / 3D", "Micro-interactions", "Interactive Prototyping"],
    metric: { value: "68%", label: "Engagement Growth" },
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6 text-[#FF0000]" stroke="currentColor" strokeWidth="1.6">
        <circle cx="20" cy="20" r="14" strokeDasharray="3 3" />
        <path d="M16 13L27 20L16 27V13Z" fill="#FF0000" strokeLinejoin="round" />
        <circle cx="20" cy="6" r="2" fill="#FF0000" />
        <circle cx="34" cy="20" r="2" fill="#FF0000" />
      </svg>
    ),
  },
  {
    id: "web",
    number: "03",
    title: "Web Experience & Engineering",
    sub: "Engineered marvels—websites that convert and captivate.",
    desc: "We build websites as high-performance interactive experiences. Every scroll reveals subtle elegance, speed, and responsiveness. Uncompromising performance meets visual poetry.",
    tags: ["React & Next.js", "GSAP & Motion", "Headless CMS", "Performance SEO"],
    metric: { value: "99+", label: "Lighthouse Performance" },
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6 text-[#FF0000]" stroke="currentColor" strokeWidth="1.6">
        <rect x="5" y="8" width="30" height="24" rx="3" strokeLinejoin="round" />
        <path d="M5 15H35" />
        <circle cx="9" cy="11.5" r="1.2" fill="#FF0000" />
        <circle cx="14" cy="11.5" r="1.2" fill="#171413" />
        <circle cx="19" cy="11.5" r="1.2" fill="#171413" />
        <path d="M12 24L16 20L12 16M18 24H24" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "strategy",
    number: "04",
    title: "Product Strategy & UX",
    sub: "Clarity before pixels. Conviction before execution.",
    desc: "Great design starts with deep listening and rigorous challenge. We research, prototype, test, and iterate until the product story and conversion architecture are undeniable.",
    tags: ["UX Research", "Information Architecture", "Conversion Strategy", "Design Audits"],
    metric: { value: "2.4x", label: "Conversion Multiplier" },
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6 text-[#FF0000]" stroke="currentColor" strokeWidth="1.6">
        <path d="M8 32L16 22L23 27L32 12" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="12" r="3" fill="#FF0000" />
        <path d="M8 8V32H32" strokeLinecap="round" />
      </svg>
    ),
  },
];


const CAPABILITY_CARDS = [
  {
    id: "identity",
    title: "Brand Strategy & Identity",
    subtitle: "Airhive Technology",
    desc: "High-conviction positioning and full visual identity system built for deep-tech climate leaders.",
    tags: ["BRAND", "SYSTEMS", "TYPOGRAPHY"],
    image: airhiveImg,
  },
  {
    id: "digital",
    title: "Digital Platform Experience",
    subtitle: "Acre Insight Platform",
    desc: "Seamless renewable land-matching interface pairing utility-scale data with intuitive UX.",
    tags: ["INTERFACE", "WEB APP", "STRATEGY"],
    image: acreImg,
  },
  {
    id: "studio",
    title: "Climate Venture Studio",
    subtitle: "ClimCanada Identity",
    desc: "A bold, future-oriented venture studio brand and dynamic storytelling platform.",
    tags: ["VENTURE", "DIGITAL", "MOTION"],
    image: climcanadaImg,
  },
  {
    id: "intelligence",
    title: "Biodiversity Intelligence",
    subtitle: "Verdant Labs Ecosystem",
    desc: "Next-generation data visualisations and modular interface components that clarify ecological complexity.",
    tags: ["DATA UX", "DESIGN SYSTEM", "WEBGL"],
    image: verdantImg,
  },
  {
    id: "scale",
    title: "Scalable Creative Systems",
    subtitle: "Dot To Design Architecture",
    desc: "End-to-end execution combining bespoke motion, responsive fluid layouts, and production code.",
    tags: ["CODE", "ANIMATION", "DELIVERY"],
    image: capabilitiesBg,
  },
];


function ServiceItem({ svc, isLast }) {
  const [scramble, setScramble] = useState(svc.title);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      setScramble(svc.title);
      return;
    }
    let frame = 0;
    let raf;
    const target = svc.title;
    const run = () => {
      const prog = frame / 18;
      if (prog >= 1) {
        setScramble(target);
        return;
      }
      setScramble(
        target
          .split("")
          .map((ch, i) =>
            i < Math.floor(prog * target.length)
              ? ch
              : ch === " "
                ? " "
                : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join("")
      );
      frame++;
      raf = requestAnimationFrame(run);
    };
    run();
    return () => cancelAnimationFrame(raf);
  }, [isHovered, svc.title]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative py-12 sm:py-16 border-b border-black/10 transition-colors duration-300 hover:bg-[#FAFAF2]/40"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Number & Icon */}
        <div className="lg:col-span-4 flex items-start gap-5">
          <div className="w-12 h-12 rounded-sm border border-black/10 bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:border-[#FF0000]/40 group-hover:shadow-md transition-all duration-300">
            {svc.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`${MONO} text-xs uppercase tracking-widest text-[#FF0000] font-semibold`}>
                {svc.number}
              </span>
              <span className="h-px w-6 bg-black/15" />
              <span className={`${MONO} text-[10px] uppercase tracking-widest text-[#737373]`}>
                Capability
              </span>
            </div>
            <h3 className={`${SANS} text-2xl sm:text-3xl font-medium tracking-tight text-[#171413] group-hover:text-[#FF0000] transition-colors duration-300`}>
              {scramble}
            </h3>
            <p className={`${MONO} text-xs sm:text-sm text-[#737373] mt-2 font-light leading-relaxed max-w-sm`}>
              {svc.sub}
            </p>
          </div>
        </div>

        {/* Center Column: Description & Tags */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <p className="text-sm sm:text-base text-[#171413]/80 leading-relaxed font-normal">
            {svc.desc}
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {svc.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-[3px] border border-black/10 text-[10px] sm:text-[11px] font-mono tracking-wider text-[#737373] uppercase bg-white group-hover:border-black/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Metric Badge & Link */}
        <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-end justify-between lg:justify-between h-full gap-4 pt-2">
          <div className="flex flex-col items-start lg:items-end">
            <span className={`${SANS} text-2xl sm:text-3xl font-normal tracking-tight text-[#171413]`}>
              {svc.metric.value}
            </span>
            <span className={`${MONO} text-[10px] uppercase tracking-widest text-[#737373]`}>
              {svc.metric.label}
            </span>
          </div>

          <a
            href="#work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#171413] group-hover:text-[#FF0000] transition-colors"
          >
            <span>See Case Studies</span>
            <span className="w-6 h-6 rounded-full border border-black/15 flex items-center justify-center group-hover:bg-[#FF0000] group-hover:border-[#FF0000] group-hover:text-white transition-all duration-300">
              <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5" stroke="currentColor" strokeWidth="1.8">
                <path d="M2.5 6H9.5M6 2.5L9.5 6L6 9.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

function ImageCard({ card, index }) {
  return (
    <div
      className="curved-card shrink-0 w-[300px] sm:w-[380px] lg:w-[440px] rounded-2xl border border-black/10 bg-white overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.12)] transition-shadow duration-500 group flex flex-col justify-between"
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Top Image Showcase */}
      <div className="relative w-full aspect-[16/11] overflow-hidden bg-neutral-100">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />

        {/* Category Pill Tag */}
        <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-black/10 text-[10px] font-mono tracking-widest uppercase text-[#171413] shadow-sm">
          {card.tags[0]}
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
        <div>
          <span className={`${MONO} text-[11px] uppercase tracking-widest text-[#FF0000] block mb-1.5 font-medium`}>
            {card.subtitle}
          </span>
          <h4 className={`${SANS} text-xl sm:text-2xl font-normal tracking-tight text-[#171413] group-hover:text-[#FF0000] transition-colors duration-300`}>
            {card.title}
          </h4>
          <p className="mt-2.5 text-xs sm:text-sm text-[#737373] font-light leading-relaxed line-clamp-3">
            {card.desc}
          </p>
        </div>

        {/* Card Footer Tag Row */}
        <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {card.tags.slice(1).map((tag) => (
              <span
                key={tag}
                className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#737373] bg-[#FAFAF2] border border-black/10 px-2.5 py-0.5 rounded-[3px]"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center group-hover:bg-[#FF0000] group-hover:border-[#FF0000] group-hover:text-white transition-all duration-300">
            <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5" stroke="currentColor" strokeWidth="1.8">
              <path d="M2.5 6H9.5M6 2.5L9.5 6L6 9.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

function HorizontalImageScroller() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const cards = track.querySelectorAll(".curved-card");

      // Dynamic 3D cylindrical curvature update function
      const updateCurvature = () => {
        const viewportCenter = window.innerWidth / 2;
        const radiusFactor = window.innerWidth * 0.7;

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const dist = (cardCenter - viewportCenter) / radiusFactor;
          const clamped = Math.max(-1.5, Math.min(1.5, dist));

          // Concave cylindrical curvature:
          // Negative dist (left of center) -> positive rotateY (angles towards viewer center)
          // Positive dist (right of center) -> negative rotateY (angles towards viewer center)
          const rotateY = clamped * -18;
          const translateZ = -Math.pow(Math.abs(clamped), 1.5) * 110;
          const scale = 1 - Math.min(Math.abs(clamped) * 0.08, 0.14);

          gsap.set(card, {
            rotateY,
            z: translateZ,
            scale,
            transformPerspective: 1200,
            transformOrigin: "center center",
            force3D: true,
          });
        });
      };

      const getDistance = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth + 120);
      };

      // Set initial curvature on mount
      updateCurvature();

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => "+=" + getDistance(),
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: updateCurvature,
        },
      });
    }, containerRef);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    const timer = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-white flex flex-col justify-center overflow-hidden border-t border-black/10"
      style={{
        perspective: "1400px",
      }}
    >
      {/* Top curved boundary arc line */}
      <div className="absolute top-0 inset-x-0 h-4 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 24" fill="none" className="w-full h-full text-black/5" preserveAspectRatio="none">
          <path d="M0 0 Q720 24 1440 0" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Subheader info bar */}
      <div className="max-w-[1680px] w-full mx-auto px-6 sm:px-10 lg:px-16 mb-6 sm:mb-8 flex items-center justify-between shrink-0 relative z-20">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#FF0000] animate-pulse" />
          <span className={`${MONO} text-xs uppercase tracking-widest text-[#737373]`}>
            Curved Capability Gallery
          </span>
        </div>
        <span className={`${MONO} text-[11px] uppercase tracking-widest text-[#737373] hidden sm:inline-block`}>
          Scroll To Traverse &rarr;
        </span>
      </div>

      {/* Ambient edge vignettes for curved screen depth */}
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-20" /> */}

      {/* 3D Cylindrical Curved Track with Image Cards */}
      <div
        ref={trackRef}
        className="flex items-stretch gap-8 sm:gap-10 px-10 sm:px-16 lg:px-24 will-change-transform py-6"
        style={{
          width: "max-content",
          transformStyle: "preserve-3d",
        }}
      >
        {CAPABILITY_CARDS.map((card, idx) => (
          <ImageCard key={card.id} card={card} index={idx} />
        ))}

        {/* Final CTA Card */}
        <div
          className="curved-card shrink-0 w-[280px] sm:w-[360px] rounded-2xl border border-dashed border-black/20 bg-[#FAFAF2]/70 p-7 sm:p-8 flex flex-col justify-between items-start shadow-sm"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          <div>
            <span className={`${MONO} text-xs uppercase tracking-widest text-[#FF0000] font-semibold`}>
              Next Step
            </span>
            <h4 className={`${SANS} text-2xl font-normal tracking-tight text-[#171413] mt-2.5 leading-snug`}>
              Have a visionary project in mind?
            </h4>
            <p className="mt-3 text-xs sm:text-sm text-[#737373] font-light leading-relaxed">
              We scope every engagement around tangible outcomes, transparent phases, and rapid deployment.
            </p>
          </div>

          <a
            href="#contact"
            className="w-full mt-6 py-3.5 px-4 rounded-sm bg-[#171413] text-white hover:bg-[#FF0000] text-center font-mono text-xs uppercase tracking-widest transition-colors duration-300"
          >
            Start A Project &rarr;
          </a>
        </div>
      </div>

      {/* Bottom curved boundary arc line */}
      <div className="absolute bottom-0 inset-x-0 h-4 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 24" fill="none" className="w-full h-full text-black/5" preserveAspectRatio="none">
          <path d="M0 24 Q720 0 1440 24" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="w-full bg-white text-[#171413] pt-16 sm:pt-24 font-sans select-none"
    >
      <div className="max-w-[1680px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Tasteful editorial headline with subtle entrance animation */}
        <div className="mb-16 sm:mb-20 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className={`${SANS} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#171413] leading-[1.12]`}
          >
            Crafting high-conviction brands, digital platforms, and{" "}
            <span className="text-[#FF0000]">scalable design systems</span> that lead markets.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`${MONO} text-xs sm:text-sm text-[#737373] mt-6 max-w-2xl font-light leading-relaxed`}
          >
            From venture launch to category leadership, we operate as a dedicated design and engineering partner.
            Every deliverable is crafted with clarity, speed, and uncompromising quality.
          </motion.p>
        </div>

        {/* Detailed Services List */}
        <div className="flex flex-col border-t border-black/10 mb-8 sm:mb-12">
          {SERVICES.map((svc, idx) => (
            <ServiceItem
              key={svc.id}
              svc={svc}
              isLast={idx === SERVICES.length - 1}
            />
          ))}
        </div>

      </div>

      {/* Horizontal Image Scroller */}
      <HorizontalImageScroller />

    </section>
  );
}