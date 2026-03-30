"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";

export function Magnetic({
  children,
  className = "",
  strength = 18
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.35 });

  return (
    <motion.div
      className={className}
      style={{ x: springX, y: springY, willChange: "transform", transform: "translateZ(0)" }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - (rect.left + rect.width / 2)) / strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) / strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
