import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/* ── Motion language ─────────────────────────────────────────────────────
   `expo.out` for entry (fast, decisive), `expo.inOut` for exit so the
   unroll eases symmetrically instead of snapping back. The exit stagger
   runs right-to-left, so the word unrolls the way it rolled in.        */

const EASE_IN = "expo.out";
const EASE_OUT = "expo.inOut";

const ROLL_IN = 0.62;
const ROLL_OUT = 0.52;
const RULE_IN = 0.7;
const RULE_OUT = 0.55;

const STEP = 0.026;
const STEP_BUDGET = 0.15;
const SHIFT = 3;

const ACCENT = "#ff0000";

/* Keyboard focus should animate, a stray mouse click should not. */
const focusVisible = (el) => {
  try {
    return el.matches(":focus-visible");
  } catch {
    return true;
  }
};

/* Pointer + keyboard wiring. Touch is ignored on purpose: it has no hover
   state, so playing there would leave the link stuck mid-roll. */
const attach = (root, play, reset) => {
  const onPointerEnter = (event) => {
    if (event.pointerType === "touch") return;
    play();
  };
  const onFocus = () => {
    if (focusVisible(root)) play();
  };

  root.addEventListener("pointerenter", onPointerEnter);
  root.addEventListener("pointerleave", reset);
  root.addEventListener("focus", onFocus);
  root.addEventListener("blur", reset);

  return () => {
    root.removeEventListener("pointerenter", onPointerEnter);
    root.removeEventListener("pointerleave", reset);
    root.removeEventListener("focus", onFocus);
    root.removeEventListener("blur", reset);
  };
};

export default function RollingLink({
  href,
  onClick,
  target,
  rel,
  ref,
  children,
  className = "",
  style,
  hoverColor = ACCENT,
  underlineColor,
  badge = null,
  trailing = null,
}) {
  const localRef = useRef(null);
  const text = typeof children === "string" ? children : "";
  const linkRef = ref && typeof ref === "object" ? ref : localRef;

  useLayoutEffect(() => {
    const root = linkRef.current;
    if (!root || !text) return undefined;

    const tops = Array.from(root.querySelectorAll(".rl-char-top"));
    const bottoms = Array.from(root.querySelectorAll(".rl-char-bottom"));
    if (!tops.length) return undefined;

    const rule = root.querySelector(".rl-underline");
    const shift = trailing ? root.querySelector(".rl-trailing") : null;
    const last = tops.length - 1;

    /* Normalise the resting state so the first interaction always starts
       from a known, seam-perfect position — no drift, no half-open glyph.
       `y` must be zeroed explicitly: GSAP reads the pre-hydration CSS
       translateY(-100%) into `y`, which would then stack on yPercent. */
    gsap.set(tops, { y: 0, yPercent: 0 });
    gsap.set(bottoms, { y: 0, yPercent: -100 });
    if (rule) gsap.set(rule, { scaleX: 0 });

    /* Size the character mask to the real line box so the two layers swap
       with zero seam, whatever font-size / leading the link inherits. */
    const lineHeight = parseFloat(getComputedStyle(root).lineHeight);
    if (Number.isFinite(lineHeight) && lineHeight > 0) {
      root.style.setProperty("--rl-line", `${lineHeight}px`);
    }

    /* Long labels must not feel sluggish — cap the total stagger. */
    const step = Math.min(STEP, STEP_BUDGET / last);

    /* Both layers of one glyph share duration, ease and delay, so the
       swap is always frame-perfect. Killing first + overwrite:auto makes
       interrupted hovers resume from wherever they are. */
    const spin = (open, duration, ease, index) => {
      const top = tops[index];
      const bottom = bottoms[index];
      const delay = (open ? index : last - index) * step;

      gsap.killTweensOf(top);
      gsap.killTweensOf(bottom);
      gsap.to(top, {
        yPercent: open ? -100 : 0,
        duration,
        ease,
        delay,
        overwrite: "auto",
      });
      gsap.to(bottom, {
        yPercent: open ? 0 : -100,
        duration,
        ease,
        delay,
        overwrite: "auto",
      });
    };

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const play = () => {
        for (let i = 0; i <= last; i += 1) spin(true, ROLL_IN, EASE_IN, i);

        if (rule) {
          gsap.to(rule, { scaleX: 1, duration: RULE_IN, ease: EASE_IN, overwrite: "auto" });
        }
        if (shift) {
          gsap.to(shift, {
            x: SHIFT,
            y: -SHIFT,
            duration: RULE_IN,
            ease: EASE_IN,
            overwrite: "auto",
          });
        }
      };

      const reset = () => {
        for (let i = 0; i <= last; i += 1) spin(false, ROLL_OUT, EASE_OUT, i);

        if (rule) {
          gsap.to(rule, { scaleX: 0, duration: RULE_OUT, ease: EASE_OUT, overwrite: "auto" });
        }
        if (shift) {
          gsap.to(shift, {
            x: 0,
            y: 0,
            duration: RULE_OUT,
            ease: EASE_OUT,
            overwrite: "auto",
          });
        }
      };

      return attach(root, play, reset);
    });

    /* Reduced motion: no travel at all, just the colour swap + rule. */
    mm.add("(prefers-reduced-motion: reduce)", () => {
      const play = () => {
        gsap.set(bottoms, { yPercent: 0 });
        if (rule) gsap.set(rule, { scaleX: 1 });
      };
      const reset = () => {
        gsap.set(bottoms, { yPercent: -100 });
        if (rule) gsap.set(rule, { scaleX: 0 });
      };

      return attach(root, play, reset);
    });

    return () => mm.revert();
  }, [text, linkRef, trailing]);

  const words = text.split(" ");

  return (
    <a
      ref={linkRef}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={`rl-link ${className}`}
      style={style}
    >
      <span className="rl-content">
        <span className="rl-sr">{text}</span>

        <span className="rl-chars" aria-hidden="true">
          {words.map((word, wordIndex) => (
            <span className="rl-word" key={wordIndex}>
              {Array.from(word).map((char, charIndex) => (
                <span className="rl-char" key={charIndex}>
                  <span className="rl-char-top">{char}</span>
                  <span className="rl-char-bottom" style={{ color: hoverColor }}>
                    {char}
                  </span>
                </span>
              ))}

              {wordIndex < words.length - 1 && (
                <span className="rl-space" aria-hidden="true">
                  &nbsp;
                </span>
              )}
            </span>
          ))}
        </span>

        <span
          className="rl-underline"
          style={{ backgroundColor: underlineColor || hoverColor }}
          aria-hidden="true"
        />
      </span>

      {trailing && <span className="rl-trailing">{trailing}</span>}
      {badge}
    </a>
  );
}
