import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_COLUMNS = [
  {
    id: "col-1",
    items: [
      "LOGO DESIGN",
      "BRAND IDENTITY SYSTEMS",
      "CORPORATE IDENTITY",
      "USER EXPERIENCE DESIGN",
      "UX STRATEGY",
    ],
  },
  {
    id: "col-2",
    items: [
      "USER INTERFACE DESIGN",
      "UI KITS & DESIGN SYSTEMS",
      "PRODUCT DESIGN",
      "CUSTOM PRODUCT SOLUTIONS",
      "PROTOTYPING",
    ],
  },
  {
    id: "col-3",
    items: [
      "GRAPHIC DESIGN",
      "MARKETING GRAPHICS",
      "ILLUSTRATIONS",
      "MOTION DESIGN",
      "3D MODELING",
    ],
  },
  {
    id: "col-4",
    items: [
      "FRONTEND DEVELOPMENT",
      "BACKEND DEVELOPMENT",
      "DEVOPS & ARCHITECTURE",
      "PRODUCT ANALYTICS",
      "CREATIVE DIRECTION",
    ],
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const whatRef = useRef(null);
  const weRef = useRef(null);
  const doRef = useRef(null);
  const listRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline scrubbed to scroll
      // Elements initially start towards the middle-right side of the page
      // and animate in at different/random speeds as the user scrolls
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 0%",
          scrub: 2,
          markers: true,
        },
      });

      // "WHAT" moves from middle-right (offset: 35vw) with speed A
      tl.fromTo(
        whatRef.current,
        {
          x: "20vw",
          opacity: 1,
        },
        {
          x: "0vw",
          opacity: 1,
          ease: "power2.out",
        },
        0
      );

      // "WE" starts further to the right (offset: 65vw) and glides faster with speed B
      tl.fromTo(
        weRef.current,
        {
          x: "68vw",
          opacity: 0.3,
        },
        {
          x: "0vw",
          opacity: 1,
          ease: "power1.out",
        },
        0
      );

      // "DO" starts even further (offset: 92vw) and moves at high speed C
      tl.fromTo(
        doRef.current,
        {
          x: "95vw",
          opacity: 0.2,
        },
        {
          x: "0vw",
          opacity: 1,
          ease: "power3.out",
        },
        0
      );

      // Services list gentle reveal
     
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full bg-white text-black py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top descriptor text (top-right) */}
        <div className="w-full flex justify-end mb-6 sm:mb-10">
          <p className="max-w-[290px] sm:max-w-[340px] text-xs sm:text-sm md:text-[15px] font-normal text-neutral-800 leading-snug tracking-tight text-right md:text-left">
            We build standout digital products and experiences that move our clients’
            brands forward.
          </p>
        </div>

        {/* Kinetic Headline: WHAT WE DO */}
        <div className="relative w-full py-4 sm:py-8 overflow-visible">
          <div className="flex flex-col relative">
            {/* Top row: WHAT + WE */}
            <div className="flex items-baseline relative z-10">
              {/* "WHAT" - Hollow / Stroked Classical Serif */}
              <div
                ref={whatRef}
                className="stroke-text z-4 font-['FreigBigProLigIta',Arial,sans-serif] italic text-[16vw] sm:text-[16vw] md:text-[16vw] lg:text-[16vw] leading-[1] tracking-tight select-none uppercase font-light inline-block"
              >
                WHAT
              </div>

              {/* "WE" - Bold Black Sans-Serif Overlapping "WHAT" */}
              <div
                ref={weRef}
                className="font-['PPNeueMontreal',Helvetica,Arial,sans-serif] font-black text-[14vw] sm:text-[14vw] md:text-[14vw] lg:text-[14vw] leading-[0.82] tracking-tight text-black select-none uppercase inline-block -ml-[9vw] sm:-ml-[8vw] md:-ml-[7vw] lg:-ml-[6vw] "
              >
                WE
              </div>
            </div>

            {/* Bottom row: "DO" placed stepped to the right */}
            <div className="flex justify-end pr-[4vw] sm:pr-[10vw] md:pr-[16vw] lg:pr-[20vw] -mt-[2vw] sm:-mt-[3vw] relative z-10">
              <div
                ref={doRef}
                className="font-['PPNeueMontreal',Helvetica,Arial,sans-serif] font-black text-[15vw] sm:text-[13vw] md:text-[12vw] lg:text-[11vw] leading-[0.82] tracking-tight text-black select-none uppercase inline-block"
              >
                DO
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Services 4-Column Grid */}
        <div
          ref={listRef}
          className="mt-16 sm:mt-24 pt-8 sm:pt-10 border-t border-neutral-200"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {SERVICE_COLUMNS.map((col) => (
              <div key={col.id} className="flex flex-col space-y-2.5 sm:space-y-3">
                {col.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="font-['Plus_Jakarta_Sans',sans-serif] text-[12px] sm:text-[13px] md:text-[14px] font-bold tracking-tight text-neutral-900 hover:text-neutral-500 transition-colors duration-200 cursor-default uppercase leading-snug"
                  >
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
