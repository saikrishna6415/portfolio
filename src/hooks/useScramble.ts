"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

interface UseScrambleOptions {
  text: string;
  trigger?: boolean;
  speed?: number; // ms per frame
  revealDelay?: number; // ms before starting reveal
}

export function useScramble({ text, trigger = true, speed = 40, revealDelay = 0 }: UseScrambleOptions) {
  const [output, setOutput] = useState(text);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iterRef = useRef(0);

  const scramble = () => {
    if (frameRef.current) clearTimeout(frameRef.current);
    iterRef.current = 0;

    const run = () => {
      const current = iterRef.current;
      setOutput(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < current) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (current < text.length) {
        iterRef.current = current + 1;
        frameRef.current = setTimeout(run, speed);
      }
    };

    setTimeout(run, revealDelay);
  };

  useEffect(() => {
    if (trigger) scramble();
    return () => { if (frameRef.current) clearTimeout(frameRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, text]);

  return { output, scramble };
}
