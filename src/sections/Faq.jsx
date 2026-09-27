import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FAQS = [
  {
    number: "01",
    question: "What makes a great fit for Dot To Design?",
    answer:
      "We work best with ambitious founders and purpose-driven teams who have real conviction, not just about their product, but about the change they're trying to make in the world. Most of our clients are startups and scaleups in the climate, sustainability, or social impact space, at a critical inflection point. If you're serious about design as a lever for clarity, traction and growth (and you're not afraid of being challenged along the way) we'll get along just fine.",
  },
  {
    number: "02",
    question: "What will the process look like?",
    answer:
      "Every engagement starts with a short discovery call to understand where you are and where you need to go. From there we map the work into clear phases — strategy, identity, interface, and delivery — with a shared workspace, weekly reviews, and a live prototype you can open at any time. No black boxes, no surprise invoices, and you can pause or reshape the plan whenever the work calls for it.",
  },
  {
    number: "03",
    question: "How much does it cost to work with you?",
    answer:
      "We scope every project around the outcome rather than a fixed hourly rate. A focused identity or product sprint typically starts in the low five figures, while a full end-to-end partnership is priced per phase so you can invest where it matters most. Once we've had the discovery call we'll send a transparent proposal with deliverables, timeline, and cost — no padded line items.",
  },
  {
    number: "04",
    question: "Can you just build us a website?",
    answer:
      "We can, but we'd rather help you build the thing that makes a website worth visiting. That usually means clarifying the story, sharpening the identity, and designing the interface first, then handing a build-ready system to our engineering team or a trusted partner. If a site really is all you need, we'll say so and keep the scope honest.",
  },
];

const SANS = "font-['PPNeueMontreal',Helvetica,Arial,sans-serif]";
const MONO = "font-['Space_Grotesk',monospace]";

const INK = "#171413";
const HEADLINE_GRAY = "#a3a3a3";
const BODY_GRAY = "#8a8a8a";
const DIVIDER = "#d9d9d9";
const LIME = "#ff0000";

function Arrow({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`h-5 w-5 transition-transform duration-300 ease-out motion-reduce:transition-none ${open ? "rotate-180" : ""
        }`}
    >
      <path d="M12 4v16" />
      <path d="m6 14 6 6 6-6" />
    </svg>
  );
}

export default function Faq({ items = FAQS, defaultOpen = 0, className = "" }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  return (
    <section
      id="faq"
      className={`w-full bg-white px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36 ${className}`}
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-[7vw]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={`${MONO} text-[11px] uppercase tracking-[0.18em] sm:text-[12px]`} style={{ color: BODY_GRAY }}>
            Frequently asked questions
          </p>

          <h2
            className={`${SANS} mt-6 text-[clamp(1.75rem,2.8vw,3.25rem)] font-normal leading-[1.18] tracking-[-0.035em] sm:mt-8`}
            style={{ color: HEADLINE_GRAY }}
          >
            Strong partnerships are built on{" "}
            <span className="text-[#171413]">transparency</span> from day one
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${item.number}`;
            const buttonId = `faq-button-${item.number}`;

            return (
              <div key={item.number} className="border-b" style={{ borderColor: DIVIDER }}>
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center gap-4 py-6 text-left sm:gap-6 sm:py-7"
                >
                  <span
                    className={`${MONO} grid h-10 w-10 shrink-0 place-items-center rounded-[4px] text-[12px] font-medium sm:h-12 sm:w-12`}
                    style={{ backgroundColor: LIME, color: INK }}
                  >
                    {item.number}
                  </span>

                  <span
                    className={`${SANS} flex-1 text-[clamp(0.95rem,1.1vw,1.25rem)] font-medium tracking-[-0.02em]`}
                    style={{ color: INK }}
                  >
                    {item.question}
                  </span>

                  <span className="grid shrink-0 place-items-center" style={{ color: INK }}>
                    <Arrow open={isOpen} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p
                        className="max-w-[52ch] pb-7 pr-6 text-[clamp(0.875rem,1vw,1.125rem)] leading-[1.5] sm:pb-8 sm:pr-10"
                        style={{ color: BODY_GRAY }}
                      >
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
