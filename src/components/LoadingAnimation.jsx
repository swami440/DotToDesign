import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

/**
 * LoadingAnimation
 * -----------------------------------------------------------------------
 * Full-screen intro loader: animated percentage counter (0 -> 100),
 * a progress bar driven by GSAP, then a curtain-wipe exit that reveals
 * the page underneath. Mount this above your page content and pass
 * `onComplete` to know when to trigger your own hero/reveal timeline.
 *
 * Usage:
 *   const [loading, setLoading] = useState(true);
 *   <LoadingAnimation show={loading} onComplete={() => setLoading(false)} />
 *   <main className={loading ? "invisible" : ""}>...</main>
 * -----------------------------------------------------------------------
 */
export default function LoadingAnimation({ show = true, onComplete, duration = 2.2 }) {
  const [count, setCount] = useState(0);
  const barRef = useRef(null);
  const counterObj = useRef({ val: 0 });

  useEffect(() => {
    if (!show) return;

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        // small hold so 100% is readable before exit animation starts
        gsap.delayedCall(0.35, () => onComplete && onComplete());
      },
    });

    // counter tween
    tl.to(counterObj.current, {
      val: 100,
      duration,
      onUpdate: () => setCount(Math.round(counterObj.current.val)),
    });

    // progress bar tween, running in parallel
    tl.to(
      barRef.current,
      { scaleX: 1, duration, transformOrigin: "left center" },
      "<"
    );

    return () => tl.kill();
  }, [show, duration, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading-screen"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-neutral-950 text-neutral-100"
        >
          {/* brand mark */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-10 text-sm font-medium tracking-[0.3em] uppercase text-neutral-400"
          >
            Loading
          </motion.span>

          {/* big percentage counter */}
          <div className="relative flex items-baseline">
            <span className="font-semibold text-[clamp(3rem,10vw,7rem)] leading-none tabular-nums tracking-tight">
              {count}
            </span>
            <span className="ml-1 text-[clamp(1.25rem,3vw,2rem)] text-neutral-500">%</span>
          </div>

          {/* progress bar */}
          <div className="mt-10 h-[2px] w-56 sm:w-72 overflow-hidden bg-neutral-800">
            <div
              ref={barRef}
              className="h-full w-full origin-left scale-x-0 bg-neutral-100"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}