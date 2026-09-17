import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ProjectGallery
 * ----------------------------------------------------------------------------
 * A "bento" style project grid where every image reveals by scaling up from
 * one corner to its full size as it scrolls into view (GSAP + ScrollTrigger).
 * Each card can vary in grid size, vertical offset (for that loose, masonry
 * feel), and which corner it grows from -- matching the reference layout
 * where some tiles are fully grown and others are still mid-reveal.
 *
 * Data shape (pass your own list via the `projects` prop):
 *   {
 *     id: string | number,        // unique React key
 *     src: string,                 // image url
 *     alt: string,
 *     label: string,                // e.g. "THE VERTIGO DOCTOR"
 *     colSpan?: number,             // grid columns to span (default 4, of 12)
 *     rowSpan?: number,             // grid rows to span (default 2)
 *     offsetY?: number,             // px, shifts the tile up/down for a scattered feel
 *     corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right",
 *     startScale?: number,          // how small the image starts (default 0.15)
 *   }
 *
 * Usage:
 *   <ProjectGallery projects={projects} />
 *   <ProjectGallery projects={projects} columns={12} rowHeight={110} gap={24} />
 *   <ProjectGallery projects={projects} scrub />   // tie growth directly to scroll instead of a one-shot reveal
 *
 * Requires: gsap  ->  npm install gsap
 * ----------------------------------------------------------------------------
 */

const CORNER_ORIGIN = {
  "top-left": "0% 0%",
  "top-right": "100% 0%",
  "bottom-left": "0% 100%",
  "bottom-right": "100% 100%",
};

const CORNERS = Object.keys(CORNER_ORIGIN);

// Deterministic pseudo-random so repeated renders (and SSR) stay consistent.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function ProjectGallery({
  projects = [],
  columns = 12,
  rowHeight = 110,
  gap = 24,
  scrub = false,
  start = "top 85%",
  stagger = 0.12,
  duration = 1.1,
  ease = "power3.out",
  seed = 7,
  className = "",
  style = {},
}) {
  const containerRef = useRef(null);
  const rand = useRef(mulberry32(seed));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".pg-image", containerRef.current);

      items.forEach((img, i) => {
        const startScale = parseFloat(img.dataset.startScale) || 0.15;
        const origin = img.dataset.origin || "0% 0%";

        gsap.set(img, {
          scale: startScale,
          transformOrigin: origin,
          willChange: "transform",
        });

        if (scrub) {
          // Growth is tied directly to scroll position within the trigger range.
          gsap.fromTo(
            img,
            { scale: startScale },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: img.closest(".pg-frame"),
                start,
                end: "top 35%",
                scrub: 0.6,
              },
            }
          );
        } else {
          // One-shot reveal: grows once when the card enters view, and can
          // reverse if scrolled back up past it.
          gsap.to(img, {
            scale: 1,
            duration,
            ease,
            delay: (i % 3) * (stagger * 0.5), // gentle stagger for cards entering together
            scrollTrigger: {
              trigger: img.closest(".pg-frame"),
              start,
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [scrub, start, duration, ease, stagger]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridAutoRows: rowHeight,
        gap,
        ...style,
      }}
    >
      {projects.map((p, i) => {
        const corner = p.corner || CORNERS[Math.floor(rand.current() * CORNERS.length)];
        const startScale = p.startScale ?? 0.12 + rand.current() * 0.1;

        return (
          <div
            key={p.id}
            className="pg-card"
            style={{
              gridColumn: `span ${p.colSpan || 4}`,
              gridRow: `span ${p.rowSpan || 2}`,
              transform: p.offsetY ? `translateY(${p.offsetY}px)` : undefined,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              className="pg-frame"
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                background: "#0a0a0a",
                borderRadius: 4,
              }}
            >
              <img
                className="pg-image"
                src={p.src}
                alt={p.alt || p.label || ""}
                data-start-scale={startScale}
                data-origin={CORNER_ORIGIN[corner]}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            {p.label && (
              <div
                className="pg-label"
                style={{
                  fontFamily:
                    "'JetBrains Mono', 'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: 13,
                  letterSpacing: "0.04em",
                  color: "#8a8a8a",
                  textTransform: "uppercase",
                }}
              >
                {p.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
