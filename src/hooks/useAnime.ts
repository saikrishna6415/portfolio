"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

export function useAnime(
  params: Parameters<typeof animate>[1],
  deps: React.DependencyList = []
) {
  const targetsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!targetsRef.current) return;

    const anim = animate(targetsRef.current, params);

    return () => {
      if (anim) {
        anim.pause();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ref: targetsRef };
}
