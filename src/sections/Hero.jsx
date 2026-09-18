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
    <section className="relative w-full h-screen min-h-[650px] overflow-hidden bg-white flex flex-col justify-between select-none">
      {/* 1. Cinematic Background Video with atmospheric Tailwind gradient overlays */}
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
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Top spacer to balance layout since header was removed */}
      <div className="relative z-10 w-full pt-8 sm:pt-12 pointer-events-none" />

      {/* 2. Center Content: Giant Title, Metadata, and Dome Icon */}
      <div className="relative z-10 w-full my-auto flex flex-col items-center justify-center px-4 text-center">
        {/* Giant Hero Title: DOT TO DESIGN */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center items-center"
        >
          <h1 className="font-['Syne',sans-serif] font-black text-[13vw] sm:text-[12vw] md:text-[11vw] lg:text-[10.5vw] leading-[0.88] tracking-[-0.04em] uppercase text-white drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)] text-center w-full px-2">
            DOT TO DESIGN
          </h1>
        </motion.div>

        {/* Agency Studio Details & Geodesic Wireframe Dome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-6 flex flex-col items-center"
        >
          <div className="font-['Space_Grotesk',monospace] text-[10px] sm:text-xs md:text-sm tracking-[0.28em] text-neutral-300 font-medium uppercase space-y-1 text-center">
            <p className="tracking-[0.32em] text-white/95">FULL-CYCLE DIGITAL AGENCY</p>
            <p className="text-white/75">EST. 2024</p>
            <p className="text-white/65">WORLDWIDE</p>
          </div>

          {/* Wireframe Geodesic Dome SVG (recreated from the screenshot) */}
         
        </motion.div>
      </div>

      {/* 3. Bottom Controls & Capabilities Deck Float Card */}
      <div className="relative z-20 w-full px-6 sm:px-10 lg:px-14 pb-8 sm:pb-10 flex items-end justify-end">
        {/* Sound / Atmosphere Toggle (bottom left) */}
        

        {/* Floating Capabilities Deck Glass Card (bottom right) */}
        <AnimatePresence>
          {deckOpen ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                backgroundImage: `url(${capabilitiesBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="rounded-2xl p-4 sm:p-5 min-w-[340px] sm:max-w-[340px] text-left relative overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border border-white/30"
            >
              {/* Header row: Text & Close (x) button */}
              <div className="flex items-start justify-between gap-6">
                <div className="font-['Space_Grotesk',monospace] text-[16px] sm:text-[11px] leading-snug tracking-wider text-neutral-900 font-bold uppercase">
                  DISCOVER HOW WE CAN HELP
                  <span className="block text-neutral-800 font-semibold mt-0.5">
                    — REQUEST OUR CAPABILITIES DECK
                  </span>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setDeckOpen(false)}
                  aria-label="Close capabilities deck widget"
                  className="w-8 h-8 rounded-full border border-black/25 flex items-center justify-center text-neutral-800 hover:text-black hover:bg-black/10 transition-all text-xs shrink-0 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Action Button: GET YOUR COPY */}
              <button
                onClick={() => setModalOpen(true)}
                className="mt-4 w-fit bg-black hover:bg-neutral-900 active:scale-95 text-white font-['Space_Grotesk',monospace] font-semibold text-[10px] sm:text-xs tracking-[0.16em] uppercase px-4 sm:px-5 py-2 sm:py-2.5 rounded-full flex items-center gap-2.5 border border-white/10 shadow-xl transition-all duration-200 cursor-pointer group"
              >
                {/* Download / Request Tray Icon */}
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
            </motion.div>
          ) : (
            /* Minimized pill badge when closed */
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setDeckOpen(true)}
              style={{
                backgroundImage: `url(${capabilitiesBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="rounded-full px-4 py-2.5 flex items-center gap-2 text-neutral-900 font-['Space_Grotesk',monospace] font-bold text-xs tracking-wider uppercase border border-white/30 transition-all cursor-pointer shadow-2xl hover:scale-105 active:scale-95"
            >
              <svg
                className="w-3.5 h-3.5 text-neutral-900"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span>Capabilities Deck</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Capabilities Deck Modal */}
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
                <span className="font-['Space_Grotesk',monospace] text-[11px] tracking-[0.3em] uppercase text-cyan-400">
                  DOT TO DESIGN STUDIO
                </span>
                <h3 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold uppercase text-white">
                  Capabilities Deck 2024 / 2025
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Explore our design methodology, case studies in luxury digital experiences, and full-spectrum agency capabilities.
                </p>

                {isSuccess ? (
                  <div className="py-6 text-center space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xl">
                      ✓
                    </div>
                    <p className="font-['Space_Grotesk',monospace] text-xs tracking-wider uppercase text-white">
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
                      className="w-full bg-white text-black font-['Space_Grotesk',monospace] font-bold text-xs uppercase tracking-[0.2em] py-3.5 rounded-xl hover:bg-neutral-200 active:scale-[0.99] transition-all cursor-pointer shadow-lg mt-2"
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
