import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ProjectGallery
 * ----------------------------------------------------------------------------
 * A "bento" style project grid where each image reveals by actually GROWING
 * in size (real width/height, not a CSS transform: scale) from one corner
 * out to fill its frame, as it scrolls into view (GSAP + ScrollTrigger).
 *
 * Why real sizing instead of transform scale: the <img> is pinned to one
 * corner of its frame (e.g. top/left: 0) and its own width/height animate
 * from a small percentage up to 100%. Since both dimensions grow at the
 * same rate, the frame's aspect ratio is preserved the whole time -- it
 * just gets physically bigger from that corner, rather than a full-size
 * image being transform-scaled up (which is what caused the previous,
 * wrong-looking result). The frame itself has no background of any kind --
 * only the image is visible, clipped by the frame's overflow while small.
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
 *     startSize?: number,           // 0-1, how small the image starts (default random ~0.15-0.3)
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

// Which two sides get pinned to 0 for each corner (the other two stay "auto",
// so growth visibly comes from the pinned corner).
const CORNER_ANCHOR = {
  "top-left": { top: 0, left: 0, right: "auto", bottom: "auto" },
  "top-right": { top: 0, right: 0, left: "auto", bottom: "auto" },
  "bottom-left": { bottom: 0, left: 0, top: "auto", right: "auto" },
  "bottom-right": { bottom: 0, right: 0, top: "auto", left: "auto" },
};

const CORNERS = Object.keys(CORNER_ANCHOR);

const DEFAULT_PROJECTS = [
  {
    id: 1,
    src: "./assets/favicon.svg",
    alt: "Vite project preview",
    label: "Vite build",
    colSpan: 4,
    rowSpan: 2,
    offsetY: -8,
    corner: "top-left",
  },
  {
    id: 2,
    src: "./assets/favicon.svg",
    alt: "Brand identity preview",
    label: "Brand identity",
    colSpan: 4,
    rowSpan: 2,
    offsetY: 8,
    corner: "top-right",
  },
  {
    id: 3,
    src: "./assets/favicon.svg",
    alt: "App interface preview",
    label: "Interface design",
    colSpan: 4,
    rowSpan: 2,
    offsetY: -6,
    corner: "bottom-left",
  },
  {
    id: 4,
    src: "./assets/favicon.svg",
    alt: "Marketing visual preview",
    label: "Campaign system",
    colSpan: 8,
    rowSpan: 2,
    offsetY: 12,
    corner: "bottom-right",
  },
];

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
  projects = DEFAULT_PROJECTS,
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
        const startSize = parseFloat(img.dataset.startSize) || 0.2;

        // Set actual box size (not transform) -- this is what grows.
        gsap.set(img, {
          width: `${startSize * 100}%`,
          height: `${startSize * 100}%`,
        });

        if (scrub) {
          gsap.fromTo(
            img,
            { width: `${startSize * 100}%`, height: `${startSize * 100}%` },
            {
              width: "100%",
              height: "100%",
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
          gsap.to(img, {
            width: "100%",
            height: "100%",
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
      {projects.map((p) => {
        const corner = p.corner || CORNERS[Math.floor(rand.current() * CORNERS.length)];
        const startSize = p.startSize ?? 0.15 + rand.current() * 0.15;
        const anchor = CORNER_ANCHOR[corner];

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
              }}
            >
              <img
                className="pg-image"
                src={p.src}
                alt={p.alt || p.label || ""}
                data-start-size={startSize}
                style={{
                  position: "absolute",
                  ...anchor,
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