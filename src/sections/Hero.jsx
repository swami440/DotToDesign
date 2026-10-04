import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import landingVideo from "../assets/landing.mp4";
import capabilitiesBg from "../assets/capabilities-1.webp";

export default function Hero() {
  const [deckOpen, setDeckOpen] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const videoRef = useRef(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleDeckSubmit = (e) => {
    e.preventDefault();
    if (submittedEmail.trim()) {
      setIsSuccess(true);
      setTimeout(() => {
        setModalOpen(false);
        setIsSuccess(false);
        setSubmittedEmail("");
      }, 2200);
    }
  };

  return (
    <section id="top" className="relative w-full h-screen min-h-[650px] overflow-hidden bg-black flex flex-col justify-between select-none">
      {/* 1. Cinematic Background Video with Film Tone Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          ref={videoRef}
          src={landingVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Top Spacer for floating header */}
      <div className="relative z-10 w-full pt-16 pointer-events-none" />

      {/* 2. Center Content: Bold Iconic Title & Studio Metadata */}
      <div className="relative z-10 w-full my-auto flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center items-center"
        >
          <h1 className="font-['Syne',sans-serif] font-black text-[13vw] sm:text-[12vw] md:text-[11vw] lg:text-[10vw] leading-[0.88] tracking-[-0.04em] uppercase text-white drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)] text-center w-full px-2">
            DOT TO DESIGN
          </h1>
        </motion.div>

        {/* Clean Studio Sub-meta */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 sm:mt-7 font-['Space_Grotesk',monospace] text-xs sm:text-sm tracking-[0.3em] uppercase text-center space-y-1.5"
        >
          <p className="text-white/95 font-medium">FULL-CYCLE DIGITAL AGENCY</p>
          <p className="text-white/60 text-[11px] sm:text-xs tracking-[0.35em]">EST. 2024 &bull; WORLDWIDE</p>
        </motion.div>
      </div>

      {/* 3. Balanced Bottom Bar: Sound Toggle (Left) & Capabilities Deck (Right) */}
      <div className="relative z-20 w-full px-6 sm:px-10 lg:px-14 pb-8 sm:pb-10 flex items-end justify-between gap-4">
        {/* Sound Toggle (bottom left) */}
        <button
          onClick={toggleSound}
          aria-label="Toggle sound"
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-black/50 border border-white/20 backdrop-blur-md text-white/80 hover:text-white hover:border-white/40 transition-all text-xs font-['Space_Grotesk',monospace] uppercase tracking-wider cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]" />
          <span>{isMuted ? "Sound Off" : "Sound On"}</span>
        </button>

        {/* Capabilities Deck Card (bottom right) */}
        <AnimatePresence>
          {deckOpen ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                backgroundImage: `url(${capabilitiesBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="rounded-2xl p-4 sm:p-5 w-[300px] sm:w-[340px] text-left relative overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border border-white/30"
            >
              {/* Overlay for optimal text readability */}
              <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px] pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div className="font-['Space_Grotesk',monospace] text-xs sm:text-[13px] leading-snug tracking-wider text-black font-bold uppercase">
                    DISCOVER HOW WE CAN HELP
                    <span className="block text-neutral-700 font-semibold mt-0.5 text-[11px] sm:text-xs">
                      — REQUEST OUR CAPABILITIES DECK
                    </span>
                  </div>

                  <button
                    onClick={() => setDeckOpen(false)}
                    aria-label="Close capabilities deck widget"
                    className="w-7 h-7 rounded-full border border-black/20 flex items-center justify-center text-neutral-800 hover:text-black hover:bg-black/10 transition-all text-xs shrink-0 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="mt-4 w-fit bg-black hover:bg-neutral-900 active:scale-95 text-white font-['Space_Grotesk',monospace] font-semibold text-[10px] sm:text-xs tracking-[0.16em] uppercase px-4 sm:px-5 py-2 sm:py-2.5 rounded-full flex items-center gap-2 border border-white/10 shadow-lg transition-all duration-200 cursor-pointer group"
                >
                  <svg
                    className="w-3.5 h-3.5 text-white group-hover:-translate-y-0.5 transition-transform"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span>GET YOUR COPY</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setDeckOpen(true)}
              className="rounded-full px-4 py-2.5 flex items-center gap-2 bg-black/60 backdrop-blur-md text-white font-['Space_Grotesk',monospace] font-semibold text-xs tracking-wider uppercase border border-white/30 transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]" />
              <span>Capabilities Deck</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 5. Capabilities Deck Interactive Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0e0e0e]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-[0_25px_70px_rgba(0,0,0,0.9)] relative"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="text-left space-y-3">
                <span className="font-['Space_Grotesk',monospace] text-[11px] tracking-[0.3em] uppercase text-[#FF0000]">
                  DOT TO DESIGN STUDIO
                </span>
                <h3 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold uppercase text-white">
                  Capabilities Deck 2025 / 2026
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light">
                  Explore our design methodology, portfolio of climate and luxury tech ventures, and full-spectrum agency capabilities.
                </p>

                {isSuccess ? (
                  <div className="py-6 text-center space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/40 flex items-center justify-center text-xl">
                      ✓
                    </div>
                    <p className="font-['Space_Grotesk',monospace] text-xs tracking-wider uppercase text-white font-semibold">
                      Deck sent to your email!
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      Downloading PDF capabilities overview...
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleDeckSubmit} className="mt-5 space-y-3">
                    <div>
                      <label className="block text-[10px] font-['Space_Grotesk',monospace] uppercase tracking-widest text-neutral-400 mb-1">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={submittedEmail}
                        onChange={(e) => setSubmittedEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/60 transition-colors placeholder:text-neutral-500 font-['Space_Grotesk',monospace]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#FF0000] text-white font-['Space_Grotesk',monospace] font-bold text-xs uppercase tracking-[0.2em] py-3.5 rounded-xl hover:bg-[#cc0000] active:scale-[0.99] transition-all cursor-pointer shadow-lg mt-2"
                    >
                      Receive Capabilities Deck
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
