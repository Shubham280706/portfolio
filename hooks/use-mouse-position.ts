"use client";

import { useEffect, useState } from "react";

type MousePosition = {
  x: number;
  y: number;
  isTouchDevice: boolean;
};

export function useMousePosition() {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    isTouchDevice: false
  });

  useEffect(() => {
    const isTouchDevice =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;

    setPosition((current) => ({
      ...current,
      isTouchDevice
    }));

    if (isTouchDevice) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
        isTouchDevice: false
      });
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return position;
}
