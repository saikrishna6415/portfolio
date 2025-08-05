"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedTypewriterProps {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenPhrases?: number;
  cursorColor?: string;
  onComplete?: () => void;
  repeat?: boolean;
}

export default function AnimatedTypewriter({
  phrases = [],
  className = "",
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenPhrases = 2000,
  cursorColor = "#3b82f6",
  onComplete,
  repeat = true,
}: AnimatedTypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDone, setIsDone] = useState(false);
  
  // Custom typing speeds per character
  const characterSpeedRef = useRef<Map<string, number>>(new Map([
    [" ", typingSpeed * 0.5],   // Spaces are faster
    [".", typingSpeed * 3],     // Punctuation is slower
    ["!", typingSpeed * 3],
    [",", typingSpeed * 2.5],
    ["?", typingSpeed * 3],
    [":", typingSpeed * 2.5],
    [";", typingSpeed * 2.5],
  ]));

  // Handle the typing animation
  useEffect(() => {
    if (phrases.length === 0) return;
    
    let timeout: NodeJS.Timeout;
    const currentPhrase = phrases[phraseIndex];
    
    if (isTyping) {
      // If we're still typing the current phrase
      if (displayedText.length < currentPhrase.length) {
        const nextChar = currentPhrase[displayedText.length];
        const charSpeed = characterSpeedRef.current.get(nextChar) || typingSpeed;
        
        // Random slight variation in typing speed to make it feel more human
        const humanVariation = Math.random() * 50 - 25; // -25ms to +25ms
        
        timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
        }, charSpeed + humanVariation);
      } else {
        // We've completed typing this phrase, wait before deleting
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenPhrases);
      }
    } else {
      // We're deleting
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
        }, deletingSpeed);
      } else {
        // Move to next phrase
        const nextPhraseIndex = (phraseIndex + 1) % phrases.length;
        
        // If we've completed a full cycle and we're not repeating
        if (nextPhraseIndex === 0 && !repeat) {
          setIsDone(true);
          onComplete?.();
          return;
        }
        
        timeout = setTimeout(() => {
          setPhraseIndex(nextPhraseIndex);
          setIsTyping(true);
        }, typingSpeed * 2);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayedText, phraseIndex, isTyping, phrases, typingSpeed, deletingSpeed, delayBetweenPhrases, repeat, onComplete]);
  
  return (
    <div className={`inline-flex items-center ${className}`}>
      <span>{displayedText}</span>
      {!isDone && (
        <motion.span
          className="inline-block w-0.5 h-6 ml-1"
          style={{ backgroundColor: cursorColor }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          }}
        />
      )}
    </div>
  );
} 