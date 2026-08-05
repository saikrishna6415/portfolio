"use client";

import { animate, utils } from "animejs";

/**
 * Radial particle explosion originating from mouse click or button hover/click
 */
export function triggerParticleBurst(
  targetEl: HTMLElement,
  options?: { count?: number; colors?: string[]; distance?: number }
) {
  const rect = targetEl.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const count = options?.count ?? 18;
  const colors = options?.colors ?? ["#7c3aed", "#06b6d4", "#ec4899", "#a78bfa", "#38bdf8"];
  const maxDistance = options?.distance ?? 80;

  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.pointerEvents = "none";
  container.style.overflow = "visible";
  container.style.zIndex = "99";
  targetEl.style.position = targetEl.style.position || "relative";
  targetEl.appendChild(container);

  const particles: HTMLDivElement[] = [];

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    const size = Math.floor(Math.random() * 6) + 4;
    const color = colors[i % colors.length];

    p.style.position = "absolute";
    p.style.left = `${centerX}px`;
    p.style.top = `${centerY}px`;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.borderRadius = i % 3 === 0 ? "2px" : "50%";
    p.style.backgroundColor = color;
    p.style.boxShadow = `0 0 10px ${color}`;
    p.style.pointerEvents = "none";
    p.style.opacity = "1";
    p.style.transform = "translate(-50%, -50%) scale(1)";

    container.appendChild(p);
    particles.push(p);
  }

  animate(particles, {
    translateX: () => utils.random(-maxDistance, maxDistance),
    translateY: () => utils.random(-maxDistance, maxDistance),
    scale: [
      { value: 1, duration: 0 },
      { value: () => utils.random(1.2, 1.8), duration: 200 },
      { value: 0, duration: 400 },
    ],
    opacity: [
      { value: 1, duration: 0 },
      { value: 0, duration: 550, easing: "outQuad" },
    ],
    rotate: () => utils.random(-360, 360),
    duration: 600,
    easing: "outExpo",
    onComplete: () => {
      container.remove();
    },
  });
}

/**
 * Hacker-style character scramble text decoding animation using Anime.js
 */
export function scrambleText(
  element: HTMLElement,
  finalText: string,
  options?: { duration?: number; chars?: string }
) {
  const duration = options?.duration ?? 1200;
  const chars = options?.chars ?? "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=";

  const obj = { progress: 0 };

  animate(obj, {
    progress: 100,
    duration: duration,
    easing: "inOutCubic",
    onUpdate: () => {
      const p = obj.progress / 100;
      const revealCount = Math.floor(p * finalText.length);
      let str = "";

      for (let i = 0; i < finalText.length; i++) {
        if (i < revealCount) {
          str += finalText[i];
        } else if (finalText[i] === " ") {
          str += " ";
        } else {
          str += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      element.textContent = str;
    },
  });
}

/**
 * Whip counter animation with elastic bounce at the end
 */
export function animateElasticCounter(
  element: HTMLElement,
  targetNumber: number,
  options?: { suffix?: string; duration?: number }
) {
  const suffix = options?.suffix ?? "";
  const duration = options?.duration ?? 1600;
  const obj = { val: 0 };

  animate(obj, {
    val: targetNumber,
    duration: duration,
    easing: "outExpo",
    round: 1,
    onUpdate: () => {
      element.textContent = `${Math.round(obj.val)}${suffix}`;
    },
    onComplete: () => {
      animate(element, {
        scale: [1, 1.2, 0.95, 1.05, 1],
        duration: 600,
        easing: "outElastic(1, .5)",
      });
    },
  });
}
