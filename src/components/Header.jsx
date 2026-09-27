import { useCallback, useEffect, useRef, useState } from "react";

import RollingLink from "./RollingLink";


const NAV_LINKS = [
  { label: "Work", href: "#work", badge: true },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const MENU_LINKS = [
  { label: "Home", href: "#top" },
  ...NAV_LINKS,
  { label: "DOT Bloom", href: "#bloom", accent: true },
];

const SOCIAL_LINKS = [
  { label: "Linkedin", href: "#linkedin" },
  { label: "Instagram", href: "#instagram" },
];



const BAR_HEIGHT = 60;
const TOP_ZONE = 24;
const COMPACT_AFTER = 140;
const HIDE_INTENT = 28;
const SHOW_INTENT = 52;
const CLOSE_ON_SCROLL = 48;


const GEOMETRY = {
  wide: {
    width: "min(934px, calc(100% - 2 * var(--gutter)))",
    height: `${BAR_HEIGHT}px`,
    left: "max(var(--gutter), calc(50% - 467px))",
  },
  compact: {
    width: "184px",
    height: `${BAR_HEIGHT}px`,
    left: "var(--gutter)",
  },
  panel: {
    width: "var(--panel-w)",
    height: "var(--panel-h)",
    left: "var(--gutter)",
  },
};

const RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-[#171413]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eee5e0]";

const CTA =
  "group flex h-[42px] items-center gap-3 rounded-[4px] bg-[#ff0000] px-4 text-[13px] font-medium tracking-[-0.04em] text-[#171a13] transition-colors hover:bg-[#c9f777]";

const ACCENT = "#ff0000";

const DOT = "absolute h-1.5 w-1.5 rounded-full bg-[#ff5b5e]";


const readScrollY = () => {
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  return Math.min(Math.max(window.scrollY, 0), max);
};

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


export default function Header() {
  const [open, setOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  const boxRef = useRef(null);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);


  const compactRef = useRef(false);
  const extremeRef = useRef(0);
  const openAnchorRef = useRef(0);
  const frameRef = useRef(0);

  const applyCompact = useCallback((value) => {
    compactRef.current = value;
    extremeRef.current = readScrollY();
    setIsCompact(value);
  }, []);

  const closeMenu = useCallback(
    (compact) => {
      setOpen(false);
      applyCompact(compact ?? readScrollY() > TOP_ZONE);
    },
    [applyCompact]
  );

  const openMenu = () => {
    openAnchorRef.current = readScrollY();
    setOpen(true);
  };

  const toggleMenu = () => (open ? closeMenu() : openMenu());

  const handleMenuLink = (href) => {
    if (href === "#top") return closeMenu(false);

    const target = document.getElementById(href.slice(1));
    return closeMenu(target ? true : undefined);
  };

  useEffect(() => {
    const y = readScrollY();
    extremeRef.current = y;
    if (y > COMPACT_AFTER) applyCompact(true);
  }, [applyCompact]);


  useEffect(() => {
    const update = () => {
      const y = readScrollY();

      if (open) {
        if (y > openAnchorRef.current) {
          openAnchorRef.current = y;
        }
        const moved = y - openAnchorRef.current;
        // Only close when scrolling up / to top, never on scroll to bottom
        if (moved <= -CLOSE_ON_SCROLL || (moved < 0 && y <= TOP_ZONE)) {
          closeMenu(false);
        }
        return;
      }

      // Near the top the header is always the full bar.
      if (y <= TOP_ZONE) {
        extremeRef.current = y;
        if (compactRef.current) applyCompact(false);
        return;
      }

      if (compactRef.current) {
        extremeRef.current = Math.max(extremeRef.current, y);
        if (extremeRef.current - y >= SHOW_INTENT) applyCompact(false);
      } else {
        extremeRef.current = Math.min(extremeRef.current, y);
        if (y > COMPACT_AFTER && y - extremeRef.current >= HIDE_INTENT) applyCompact(true);
      }
    };

    const onScroll = () => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = 0;
        update();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    };
  }, [open, applyCompact, closeMenu]);

  useEffect(() => {
    if (!open) return undefined;

    const isOutside = (target) => !boxRef.current?.contains(target);

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      closeMenu();
      toggleRef.current?.focus();
    };
    const onPointerDown = (event) => {
      if (isOutside(event.target)) closeMenu();
    };
    const onFocusIn = (event) => {
      if (isOutside(event.target)) closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open, closeMenu]);

  useEffect(() => {
    if (open) firstLinkRef.current?.focus({ preventScroll: true });
  }, [open]);

  const mode = open ? "panel" : isCompact ? "compact" : "wide";
  const barExpanded = mode === "wide";

  const itemMotion = (index) => ({
    className: `shrink-0 transition-all ease-out motion-reduce:transition-none ${open ? "translate-y-0 opacity-100 duration-500" : "translate-y-2 opacity-0 duration-200"
      }`,
    style: { transitionDelay: open ? `${160 + index * 45}ms` : "0ms" },
  });
  const footerMotion = itemMotion(MENU_LINKS.length);

  return (
    <header
      className="fixed inset-x-0 z-40 [--gutter:1rem] [--top:1.25rem] sm:[--gutter:1.5rem] sm:[--top:1.75rem]"
      style={{
        top: "var(--top)",
        "--panel-w": "min(370px, calc(100vw - 2 * var(--gutter)))",

        "--panel-h": "min(670px, calc(100dvh - var(--top) - var(--gutter)))",
      }}
    >
      <div
        ref={boxRef}
        className="absolute top-3 overflow-hidden rounded-[10px] bg-white/40 backdrop-blur-xl backdrop-saturate-150 transition-[width,height,left] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
        style={GEOMETRY[mode]}
      >
        {/* ------------------------------ Top bar ------------------------------ */}
        <div className="relative flex h-[60px] items-center px-5 sm:px-6">
          <a
            className={`shrink-0 text-[17px] font-bold tracking-[-0.08em] text-[#171413] transition-opacity hover:opacity-60 ${RING}`}
            href="#top"
            aria-label="Dot To Design home"
            onClick={() => open && closeMenu(false)}
          >
            dot<span className="font-medium">to</span>design
          </a>

          <nav
            aria-label="Primary"
            className={`absolute left-1/2 top-0 hidden h-[60px] -translate-x-1/2 items-center gap-9 transition-all duration-300 ease-out motion-reduce:transition-none md:flex ${barExpanded
                ? "visible opacity-100 delay-200"
                : "pointer-events-none invisible -translate-y-2 opacity-0"
              }`}
          >
            {NAV_LINKS.map((link) => (
              <RollingLink
                key={link.label}
                href={link.href}
                hoverColor={ACCENT}
                underlineColor={ACCENT}
                className={`text-[13px] font-medium tracking-[-0.03em] text-[#201c1a] ${RING}`}
                badge={
                  link.badge ? <span aria-hidden="true" className={`${DOT} -right-3 -top-1`} /> : null
                }
              >
                {link.label}
              </RollingLink>
            ))}
          </nav>


          <div
            className={`absolute right-5 top-[9px] hidden transition-all duration-300 ease-out motion-reduce:transition-none sm:right-[4.5rem] sm:block md:right-6 ${barExpanded
                ? "visible opacity-100 delay-200"
                : "pointer-events-none invisible translate-x-2 opacity-0"
              }`}
          >
            <a href="#contact" className={`${CTA} ${RING}`}>
              Book an intro
              <Arrow />
            </a>
          </div>


          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={toggleMenu}
            className={`absolute right-4 top-2 grid h-11 w-11 place-items-center text-[#171413] transition-all duration-300 ease-out motion-reduce:transition-none ${RING} ${isCompact || open
                ? "md:delay-200"
                : "md:pointer-events-none md:invisible md:translate-x-2 md:opacity-0"
              }`}
          >
            <span aria-hidden="true" className="relative block h-2 w-5">
              <i
                className={`absolute left-0 top-0 block h-px w-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none ${open ? "translate-y-[3.5px] rotate-45" : ""
                  }`}
              />
              <i
                className={`absolute bottom-0 left-0 block h-px w-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none ${open ? "-translate-y-[3.5px] -rotate-45" : ""
                  }`}
              />
            </span>
          </button>
        </div>


        <nav
          id="site-menu"
          aria-label="Menu"
          className="absolute left-0 flex flex-col overflow-y-auto overscroll-contain px-5 pb-5 sm:px-6"
          style={{
            top: BAR_HEIGHT,
            width: "var(--panel-w)",
            height: `calc(var(--panel-h) - ${BAR_HEIGHT}px)`,
            visibility: open ? "visible" : "hidden",
            transition: open ? "none" : "visibility 0s linear 300ms",
          }}
        >
          <div className="flex shrink-0 flex-col pb-8 pt-4">
            {MENU_LINKS.map((link, index) => {
              const motion = itemMotion(index);
              return (
                <div key={link.label} className={motion.className} style={motion.style}>
                  <RollingLink
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={() => handleMenuLink(link.href)}
                    hoverColor={ACCENT}
                    underlineColor={ACCENT}
                    className={`text-[30px] leading-[1.16] mt-4 tracking-[-0.06em] ${RING} ${
                      link.accent ? "text-[#8d6844]" : "text-[#171413]"
                    }`}
                    badge={
                      link.badge ? (
                        <span aria-hidden="true" className={`${DOT} -right-3 top-1`} />
                      ) : null
                    }
                  >
                    {link.label}
                  </RollingLink>
                </div>
              );
            })}
          </div>

          <div
            className={`mt-auto border-t border-black/10 pt-7 ${footerMotion.className}`}
            style={footerMotion.style}
          >
            <div className="flex items-center justify-between text-[13px] text-[#171413]">
              <div className="space-y-2">
                {SOCIAL_LINKS.map((link) => (
                  <div key={link.label}>
                    <RollingLink
                      href={link.href}
                      hoverColor={ACCENT}
                      underlineColor={ACCENT}
                      className={`text-[13px] text-[#171413] ${RING}`}
                    >
                      {link.label}
                    </RollingLink>
                  </div>
                ))}
              </div>
              <div className="text-center text-[10px] font-bold leading-[0.95]">
                1%<br />
                <span className="text-[8px]">
                  FOR THE
                  <br />
                  PLANET
                </span>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-full border border-dashed border-black/60 text-[11px] font-bold">
                CC
              </div>
            </div>

            <div className="mt-10 border-t border-black/15 pt-8">
              <a
                href="#contact"
                className={`${CTA} justify-center ${RING}`}
                onClick={() => handleMenuLink("#contact")}
              >
                Book an intro
                <Arrow />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}