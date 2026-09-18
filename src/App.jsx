import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Home from "./pages/Home";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis with GSAP ScrollTrigger updates
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full bg-white text-neutral-900 min-h-screen">
      <Home />
    </div>
  );
};

export default App;
