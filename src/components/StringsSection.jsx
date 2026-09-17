import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * StringsSection
 * -----------------------------------------------------------------------
 * A 40vh section containing N horizontal "strings" (SVG paths) that
 * behave like guitar strings: as the cursor hovers near a string it
 * bends toward the pointer, and on mouse-leave it springs back with a
 * damped elastic vibration.
 *
 * Usage:
 *   <StringsSection count={6} />
 * -----------------------------------------------------------------------
 */
export default function StringsSection({ count = 6, className = "" }) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const pathRefs = useRef([]);
  // one mutable physics state object per string: { amp, x, restY, active }
  const stateRefs = useRef([]);
  const dims = useRef({ width: 0, height: 0 });

  const SAMPLES = 40; // points sampled across each string's path
  const HIT_ZONE = 34; // px — how close (vertically) the cursor must be to grab a string
  const MAX_AMP = 46; // px — max bend distance
  const BUMP_WIDTH = 0.16; // fraction of container width — width of the pluck bump

  const buildPath = (i) => {
    const { width } = dims.current;
    const s = stateRefs.current[i];
    if (!s || !width) return "";

    let d = "";
    for (let n = 0; n <= SAMPLES; n++) {
      const x = (n / SAMPLES) * width;
      const bump = Math.exp(
        -Math.pow((x / width - s.x) / BUMP_WIDTH, 2)
      );
      const y = s.restY + s.amp * bump;
      d += n === 0 ? `M ${x},${y}` : ` L ${x},${y}`;
    }
    return d;
  };

  const redraw = (i) => {
    const el = pathRefs.current[i];
    if (el) el.setAttribute("d", buildPath(i));
  };

  const measure = () => {
    const el = containerRef.current;
    if (!el) return;
    dims.current = { width: el.clientWidth, height: el.clientHeight };

    stateRefs.current = Array.from({ length: count }, (_, i) => ({
      amp: 0,
      x: 0.5,
      restY: ((i + 1) / (count + 1)) * dims.current.height,
    }));

    for (let i = 0; i < count; i++) redraw(i);
  };

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    stateRefs.current.forEach((s, i) => {
      const dist = Math.abs(my - s.restY);

      if (dist < HIT_ZONE) {
        // grabbed — follow the cursor, no easing lag
        gsap.killTweensOf(s);
        const pull = (1 - dist / HIT_ZONE) * (my - s.restY);
        s.amp = gsap.utils.clamp(-MAX_AMP, MAX_AMP, pull * 1.6);
        s.x = gsap.utils.clamp(0, 1, mx / dims.current.width);
        redraw(i);
      } else if (Math.abs(s.amp) > 0.05 && !s._releasing) {
        release(i);
      }
    });
  };

  const release = (i) => {
    const s = stateRefs.current[i];
    if (!s) return;
    s._releasing = true;
    gsap.to(s, {
      amp: 0,
      duration: 1.1,
      ease: "elastic.out(1, 0.18)",
      onUpdate: () => redraw(i),
      onComplete: () => {
        s._releasing = false;
      },
    });
  };

  const handleMouseLeave = () => {
    stateRefs.current.forEach((_, i) => release(i));
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative h-[40vh] w-full overflow-hidden bg-neutral-950 ${className}`}
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 h-full w-full text-neutral-400"
        preserveAspectRatio="none"
      >
        {Array.from({ length: count }).map((_, i) => (
          <path
            key={i}
            ref={(el) => (pathRefs.current[i] = el)}
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="transition-[stroke] duration-300 hover:text-neutral-100"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </section>
  );
}