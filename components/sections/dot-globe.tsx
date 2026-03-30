"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function DotGlobe() {
  const globeRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(globeRef, { amount: 0.35, once: false });

  return (
    <div
      ref={globeRef}
      className="relative flex min-h-[22rem] items-end justify-center overflow-hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_50%_24%,rgba(214,208,255,0.55),rgba(255,255,255,0)_40%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(23,19,17,0.08))]"
    >
      <div className="gpu-layer absolute inset-x-[6%] top-[4%] h-[90%] rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(18,18,18,0.96),rgba(18,18,18,0.78)_58%,rgba(18,18,18,0)_74%)] blur-[6px]" />

      <motion.div
        aria-hidden
        className="gpu-layer absolute inset-x-[10%] top-[6%] h-[88%] rounded-full"
        animate={isInView ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.92) 1.1px, transparent 1.3px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at center, black 0%, black 54%, transparent 74%)"
        }}
      />

      <motion.div
        aria-hidden
        className="gpu-layer absolute inset-x-[10%] top-[6%] h-[88%] rounded-full opacity-75"
        animate={isInView ? { backgroundPositionX: ["0px", "-28px"] } : { backgroundPositionX: "0px" }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1.2px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.35) 18%, black 40%, black 58%, transparent 74%)"
        }}
      />

      <div className="absolute inset-x-[10%] top-[6%] h-[88%] rounded-full bg-[radial-gradient(ellipse_at_50%_120%,rgba(255,255,255,0.96),rgba(255,255,255,0)_34%)]" />
      <div className="absolute inset-x-[10%] top-[6%] h-[88%] rounded-full bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.04),rgba(255,255,255,0)_30%)]" />

      <motion.div
        aria-hidden
        className="gpu-layer absolute left-[39%] top-[48%] h-3 w-3 rounded-full bg-[#ffb25b] shadow-[0_0_0_5px_rgba(255,178,91,0.14),0_0_16px_rgba(255,178,91,0.56)]"
        animate={isInView ? { scale: [1, 1.12, 1], opacity: [0.95, 1, 0.95] } : { scale: 1, opacity: 0.95 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute bottom-0 h-24 w-full bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.86)_70%,rgba(255,255,255,1)_100%)]" />
    </div>
  );
}
