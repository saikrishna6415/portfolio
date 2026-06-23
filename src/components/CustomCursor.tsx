"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 150, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setIsVisible(true);
    };
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    const attachHover = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach(el => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    attachHover();

    const obs = new MutationObserver(attachHover);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      obs.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Sharp dot — mix-blend-difference makes it invert colors underneath */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference rounded-full bg-white"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isHovering ? 10 : isClicking ? 4 : 6,
          height: isHovering ? 10 : isClicking ? 4 : 6,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.12 }}
      />

      {/* Spring ring — lags behind */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isHovering ? 48 : isClicking ? 24 : 34,
          height: isHovering ? 48 : isClicking ? 24 : 34,
          borderColor: isHovering ? "#a78bfa" : "rgba(255,255,255,0.3)",
          backgroundColor: isHovering ? "rgba(124,58,237,0.1)" : "transparent",
          boxShadow: isHovering ? "0 0 24px rgba(124,58,237,0.5)" : "none",
          border: "1.5px solid rgba(255,255,255,0.3)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}