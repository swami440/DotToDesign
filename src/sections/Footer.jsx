import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAV_COLUMNS = [
  [
    { label: "Home", href: "#top" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
  ],
  [
    { label: "Contact", href: "#contact" },
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Cookie Policy", href: "#cookies" },
  ],
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#linkedin" },
  { label: "Instagram", href: "#instagram" },
];

const SANS = "font-['PPNeueMontreal',Helvetica,Arial,sans-serif]";
const MONO = "font-['Space_Grotesk',monospace]";

const LIME = "#dcff91";
const SURFACE = "#0a0a0a";
const BODY_GRAY = "#9a9a9a";
const LABEL_GRAY = "#d4d4d4";
const HAIRLINE = "rgba(255,255,255,0.16)";

const SEAL_POINTS = Array.from({ length: 48 }, (_, i) => {
  const angle = (i / 48) * Math.PI * 2;
  const radius = i % 2 === 0 ? 47 : 40;
  return `${(56 + Math.cos(angle) * radius).toFixed(2)},${(60 + Math.sin(angle) * radius).toFixed(2)}`;
}).join(" ");

function ArrowUpRight({ className = "h-3 w-3" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function BCorpBadge() {
  return (
    <svg
      viewBox="0 0 100 132"
      role="img"
      aria-label="Certified B Corporation"
      className="h-16 w-auto text-white sm:h-20 lg:h-24"
      style={{ fontFamily: "inherit" }}
    >
      <text x="50" y="14" textAnchor="middle" fontSize="13" fontWeight="700" fill="currentColor">
        Certified
      </text>
      <circle cx="50" cy="66" r="29" fill="none" stroke="currentColor" strokeWidth="4" />
      <text x="50" y="81" textAnchor="middle" fontSize="42" fontWeight="700" fill="currentColor">
        B
      </text>
      <line x1="22" y1="108" x2="78" y2="108" stroke="currentColor" strokeWidth="3" />
      <text x="50" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor">
        Corporation
      </text>
    </svg>
  );
}

function OnePercentBadge() {
  return (
    <svg
      viewBox="0 0 110 132"
      role="img"
      aria-label="One percent for the Planet member"
      className="h-16 w-auto text-white sm:h-20 lg:h-24"
      style={{ fontFamily: "inherit" }}
    >
      <circle cx="55" cy="46" r="41" fill="currentColor" />
      <text x="44" y="63" textAnchor="middle" fontSize="50" fontWeight="700" fill="#0a0a0a">
        1
      </text>
      <text x="72" y="42" fontSize="19" fontWeight="700" fill="#0a0a0a">
        %
      </text>
      <text x="55" y="108" textAnchor="middle" fontSize="16" fontWeight="800" fill="currentColor">
        FOR THE
      </text>
      <text x="55" y="126" textAnchor="middle" fontSize="16" fontWeight="800" fill="currentColor">
        PLANET.
      </text>
    </svg>
  );
}

function CleanCreativesBadge() {
  return (
    <svg
      viewBox="0 0 112 120"
      role="img"
      aria-label="Clean Creatives approved"
      className="h-16 w-auto text-white sm:h-20 lg:h-24"
      style={{ fontFamily: "inherit" }}
    >
      <defs>
        <path id="ccTopArc" d="M28 60 A28 28 0 0 1 84 60" fill="none" />
        <path id="ccBottomArc" d="M86 60 A30 30 0 0 1 26 60" fill="none" />
      </defs>
      <polygon points={SEAL_POINTS} fill="none" stroke="currentColor" strokeWidth="1.4" />
      <text fontSize="8.5" letterSpacing="1.1" fill="currentColor">
        <textPath href="#ccTopArc" startOffset="50%" textAnchor="middle">
          CLEAN CREATIVES
        </textPath>
      </text>
      <text fontSize="8.5" letterSpacing="1.4" fill="currentColor">
        <textPath href="#ccBottomArc" startOffset="50%" textAnchor="middle">
          APPROVED
        </textPath>
      </text>
      <text
        x="45"
        y="60"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="29"
        fontWeight="700"
        fill="currentColor"
      >
        C
      </text>
      <text
        x="68"
        y="60"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="29"
        fontWeight="700"
        fill="currentColor"
        transform="rotate(180 68 60)"
      >
        C
      </text>
    </svg>
  );
}

export default function Footer({
  wordmark = "dottodesign",
  copyright = `Copyright © ${new Date().getFullYear()} Dot To Design®`,
  className = "",
}) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
      timeZone: "Europe/London",
    });

    const update = () => setTime(formatter.format(new Date()));

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`w-full px-6 pb-10 pt-14 text-white sm:px-10 sm:pt-16 lg:px-12 lg:pt-20 ${className}`}
      style={{ backgroundColor: SURFACE }}
    >
      <div className="mx-auto max-w-[1600px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={`${SANS} select-none text-[clamp(2.75rem,10vw,8.5rem)] font-normal leading-[0.82] tracking-[-0.045em]`}
        >
          {wordmark}
        </motion.h2>

        <div className="mt-12 flex flex-col gap-12 lg:mt-16 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[820px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className={`${MONO} text-[11px] uppercase tracking-[0.18em] sm:text-[12px]`}
                style={{ color: LABEL_GRAY }}
              >
                Sustainability
              </p>

              <p
                className={`mt-5 text-[clamp(0.95rem,1.2vw,1.3rem)] leading-[1.38]`}
                style={{ color: BODY_GRAY }}
              >
                Dot To Design has a deep-rooted commitment to sustainability — it&apos;s the
                foundation of everything we do. We partner exclusively with climate-led and
                purpose-driven startups, using design as a force for lasting impact. From the
                choices we make to the clients we support, our work accelerates solutions that
                restore, regenerate, and reshape our future for the better.
              </p>

              <a
                href="#impact-report"
                className={`${SANS} mt-10 inline-flex flex-wrap items-center gap-x-5 text-[clamp(1.6rem,3.1vw,3.1rem)] leading-[1.1] tracking-[-0.035em] sm:mt-12`}
              >
                <span className="transition-colors duration-300 hover:text-white" style={{ color: BODY_GRAY }}>
                  Impact Report
                </span>
                <span className="transition-opacity duration-300 hover:opacity-70">Screening</span>
                <ArrowUpRight className="h-[0.55em] w-[0.55em] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex shrink-0 items-center gap-6 sm:gap-8 lg:gap-10"
          >
            <BCorpBadge />
            <OnePercentBadge />
            <CleanCreativesBadge />
          </motion.div>
        </div>

        <div className="mt-14 border-t sm:mt-16 lg:mt-24" style={{ borderColor: HAIRLINE }} />

        <div className="grid gap-12 py-12 sm:py-14 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p
              className={`${MONO} text-[11px] uppercase tracking-[0.18em] sm:text-[12px]`}
              style={{ color: LABEL_GRAY }}
            >
              Navigate
            </p>

            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-9 sm:mt-10 sm:gap-x-12">
              {NAV_COLUMNS.map((column, columnIndex) => (
                <div key={columnIndex} className="flex flex-col gap-2.5 sm:gap-3">
                  {column.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className={`${SANS} w-fit text-[clamp(1.05rem,1.7vw,1.55rem)] leading-[1.5] tracking-[-0.03em] transition-opacity duration-200 hover:opacity-60`}
                      style={{ color: BODY_GRAY }}
                    >
                      {link.label}
                    </a>
                  ))}

                  {columnIndex === 1 && (
                    <a
                      href="#contact"
                      className={`${SANS} mt-1 inline-flex w-fit items-center gap-3 text-[clamp(1.05rem,1.7vw,1.55rem)] leading-[1.5] tracking-[-0.03em] transition-opacity duration-200 hover:opacity-70`}
                      style={{ color: LIME }}
                    >
                      Book an intro
                      <span
                        className="grid h-6 w-6 place-items-center rounded-[3px] sm:h-7 sm:w-7"
                        style={{ backgroundColor: LIME, color: SURFACE }}
                      >
                        <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      </span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p
              className={`${MONO} text-[11px] uppercase tracking-[0.18em] sm:text-[12px]`}
              style={{ color: LABEL_GRAY }}
            >
              Socials
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`${SANS} w-fit text-[clamp(1.5rem,3.4vw,3.1rem)] leading-[1.15] tracking-[-0.04em] transition-opacity duration-200 hover:opacity-60`}
                  style={{ color: BODY_GRAY }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t" style={{ borderColor: HAIRLINE }} />

        <div className="grid gap-6 pt-8 md:grid-cols-3 md:items-center">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span
              className={`${MONO} rounded-[5px] border px-3 py-2 text-[11px] tracking-[0.06em] sm:text-[12px]`}
              style={{ borderColor: "rgba(255,255,255,0.14)", color: "#c9c9c9" }}
            >
              ONLINE <span className="px-1">→</span> BIRMINGHAM, UK {time}
            </span>
          </div>

          <p
            className={`${SANS} text-center text-[clamp(0.9rem,1.2vw,1.15rem)] tracking-[-0.02em]`}
            style={{ color: LABEL_GRAY }}
          >
            {copyright}
          </p>

          <a
            href="#top"
            onClick={scrollToTop}
            className={`${SANS} w-fit text-[clamp(0.9rem,1.2vw,1.15rem)] tracking-[-0.02em] transition-opacity duration-200 hover:opacity-60 md:justify-self-end`}
            style={{ color: LABEL_GRAY }}
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
