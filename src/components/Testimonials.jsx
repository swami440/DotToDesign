import { useRef, useState } from "react";
import { motion } from "framer-motion";
import defaultVideo from "../assets/landing.mp4";

const DEFAULT_TESTIMONIAL = {
  id: "teresa-geruson",
  segments: [
    { text: "The work Dot To Design did far " },
    { text: "exceeded my expectations,", muted: true },
    { text: " and made me more excited about our progress than I already was." },
  ],
  name: "Teresa Geruson",
  role: "Commercial Lead, Airhive",
  avatar: "",
  video: defaultVideo,
};

const LIME = "#ff0000";
// const CARD = "#e9e9e9";
const INK = "#171413";
const MUTED = "#ff0000";
const SANS = "font-['PPNeueMontreal',Helvetica,Arial,sans-serif]";

function QuoteMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[54%] w-[54%] fill-current">
      <path d="M4 12.5C4 8.9 6.4 5.9 10.2 4.3l1.1 2.2C9.1 7.7 7.8 9.3 7.7 11h2.8c1.5 0 2.5 1 2.5 2.4S12 15.8 10.5 15.8H6.2C4.9 15.8 4 14.6 4 12.5Zm8.5 0c0-3.6 2.4-6.6 6.2-8.2l1.1 2.2c-2.2 1.2-3.5 2.8-3.6 4.5h2.8c1.5 0 2.5 1 2.5 2.4s-1 2.4-2.5 2.4h-4.3c-1.3 0-2.2-1.2-2.2-3.3Z" />
    </svg>
  );
}

function PlaybackIcon({ playing }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[38%] w-[38%] fill-current">
      {playing ? (
        <path d="M7 4.5h3.4v15H7v-15Zm6.6 0H17v15h-3.4v-15Z" />
      ) : (
        <path d="M7.5 4.6v14.8L19.6 12 7.5 4.6Z" />
      )}
    </svg>
  );
}

function Avatar({ src, name }) {
  const size =
    "h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12 2xl:h-14 2xl:w-14 rounded-[6px] shrink-0";

  if (src) {
    return <img src={src} alt={name} className={`${size} object-cover`} />;
  }

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className={`${size} grid place-items-center ${SANS} text-[11px] font-medium text-white`}
      style={{ backgroundColor: INK }}
    >
      {initials}
    </span>
  );
}

export default function Testimonials({
  testimonial = DEFAULT_TESTIMONIAL,
  className = "",
}) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const videoSrc = testimonial.video || "";

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <motion.section
      id="testimonials"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-28 ${className}`}
    >
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[1600px] overflow-hidden rounded-[14px]  bg-black sm:aspect-[16/9] lg:aspect-[2/1]">
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            preload="metadata"
            onEnded={() => setPlaying(false)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        <figure
          className={`absolute inset-x-4 bottom-4  flex flex-col rounded-[10px] p-5 sm:inset-x-auto sm:bottom-[5%] sm:left-[4%] sm:w-[72%] sm:p-7 md:w-[60%] lg:w-[46%] lg:p-9 xl:w-[38%] xl:p-10 2xl:w-[33.5%] 2xl:p-12  bg-white/40 backdrop-blur-xl backdrop-saturate-150 transition-[width,height,left] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none`}
          
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-[4px] sm:h-10 sm:w-10 lg:h-12 lg:w-12 2xl:h-14 2xl:w-14"
            style={{ backgroundColor: LIME, color: INK }}
          >
            <QuoteMark />
          </span>

          <blockquote
            className={`${SANS} mt-4 text-[17px] font-medium leading-[1.28] tracking-[-0.03em] sm:mt-5 sm:text-[20px] lg:text-[24px] 2xl:text-[30px]`}
            style={{ color: INK }}
          >
            {testimonial.segments.map((segment, index) => (
              <span
                key={index}
                className={segment.muted ? "transition-colors duration-300" : undefined}
                style={segment.muted ? { color: MUTED } : undefined}
              >
                {segment.text}
              </span>
            ))}
          </blockquote>

          <figcaption className="mt-6 flex items-center gap-3 sm:mt-8 sm:gap-4">
            <Avatar src={testimonial.avatar} name={testimonial.name} />
            <div className="min-w-0">
              <p
                className={`${SANS} truncate text-[12px] font-medium sm:text-[13px] 2xl:text-[15px]`}
                style={{ color: INK }}
              >
                {testimonial.name}
              </p>
              <p className="truncate text-[11px] sm:text-[12px] 2xl:text-[14px]" style={{ color: '#ff0000' }}>
                {testimonial.role}
              </p>
            </div>
          </figcaption>
        </figure>

        {videoSrc && (
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={playing ? "Pause testimonial video" : "Play testimonial video"}
            className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-[8px] transition-colors duration-200 hover:bg-[#FF0000] sm:right-[4%] sm:top-auto sm:bottom-[6%] sm:h-14 sm:w-14 lg:h-16 lg:w-16 2xl:h-[104px] 2xl:w-[104px]"
            style={{ backgroundColor: "#ffffff", color: '#ff0000' }}
          >
            <PlaybackIcon playing={playing} />
          </button>
        )}
      </div>
    </motion.section>
  );
}
