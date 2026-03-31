"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function DotGlobe() {
  const globeRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(globeRef, { amount: 0.35, once: false });

  return (
    <div
      ref={globeRef}
      className="relative mx-auto aspect-square w-full max-w-[30rem] overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_24%,rgba(214,208,255,0.55),rgba(255,255,255,0)_40%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(23,19,17,0.08))]"
    >
      <div className="gpu-layer absolute inset-[7%] rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(18,18,18,0.96),rgba(18,18,18,0.78)_58%,rgba(18,18,18,0)_74%)] blur-[6px]" />

      <motion.div
        aria-hidden
        className="gpu-layer absolute inset-[10%] rounded-full"
        animate={isInView ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.92) 1.1px, transparent 1.3px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(circle at center, black 0%, black 54%, transparent 74%)"
        }}
      />

      <motion.div
        aria-hidden
        className="gpu-layer absolute inset-[10%] rounded-full opacity-75"
        animate={isInView ? { backgroundPositionX: ["0px", "-28px"] } : { backgroundPositionX: "0px" }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1.2px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.35) 18%, black 40%, black 58%, transparent 74%)"
        }}
      />

      <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.96),rgba(255,255,255,0)_34%)]" />
      <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),rgba(255,255,255,0)_30%)]" />

      <motion.div
        aria-hidden
        className="gpu-layer absolute left-[47%] top-[49%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffb25b] shadow-[0_0_0_8px_rgba(255,178,91,0.14),0_0_24px_rgba(255,178,91,0.56)]"
        animate={isInView ? { scale: [1, 1.12, 1], opacity: [0.95, 1, 0.95] } : { scale: 1, opacity: 0.95 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-x-[12%] bottom-[6%] h-[18%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.92),rgba(255,255,255,0)_72%)] blur-md" />
    </div>
  );
}
