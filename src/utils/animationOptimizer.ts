"use client";

import { useState, useEffect } from 'react';

// Check if the device is low-end based on memory and processor constraints
export const useLowPowerMode = () => {
  const [isLowPower, setIsLowPower] = useState(false);
  
  useEffect(() => {
    // Check if the device has limited resources
    const checkDeviceCapabilities = () => {
      // Check if the device has reduced motion preference
      const prefersReducedMotion = 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Check device memory if available (Chrome-only feature)
      const hasLimitedMemory = 
        // @ts-expect-error - deviceMemory is not in standard TypeScript DOM types
        navigator.deviceMemory !== undefined && navigator.deviceMemory < 4;
      
      // Check hardware concurrency (CPU cores) if available
      const hasLimitedCPU = 
        navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4;
      
      // Check if the device is a mobile device
      const isMobileDevice = 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Set low power mode if any condition is met
      setIsLowPower(prefersReducedMotion || hasLimitedMemory || (hasLimitedCPU && isMobileDevice));
    };

    checkDeviceCapabilities();
    
    // Add listener for changes in reduced motion preference
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreferenceChange = () => {
      checkDeviceCapabilities();
    };
    
    // Add event listener for preference changes
    if (motionMediaQuery.addEventListener) {
      motionMediaQuery.addEventListener('change', handleMotionPreferenceChange);
    } else {
      // Fallback for older browsers
      motionMediaQuery.addListener(handleMotionPreferenceChange);
    }
    
    return () => {
      // Clean up event listener
      if (motionMediaQuery.removeEventListener) {
        motionMediaQuery.removeEventListener('change', handleMotionPreferenceChange);
      } else {
        // Fallback for older browsers
        motionMediaQuery.removeListener(handleMotionPreferenceChange);
      }
    };
  }, []);
  
  return isLowPower;
};

// Get appropriate animation settings based on device capabilities
export const getOptimizedAnimationProps = <T extends Record<string, unknown>>(
  isLowPower: boolean, 
  defaultProps: T, 
  reducedProps: Partial<T>
): T => {
  return isLowPower ? { ...defaultProps, ...reducedProps } : defaultProps;
};

// Utility for optimizing particle counts based on device
export const getOptimizedParticleCount = (isLowPower: boolean, defaultCount: number): number => {
  if (isLowPower) {
    return Math.max(5, Math.floor(defaultCount * 0.3)); // Reduce to 30% with minimum of 5
  }
  return defaultCount;
};

// Check if the device supports WebGL for complex canvas animations
export const checkWebGLSupport = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};

// Controls which animations to show based on device capabilities
export const shouldEnableAnimation = (animationType: 'essential' | 'decorative' | 'complex', isLowPower: boolean): boolean => {
  if (isLowPower) {
    // On low-power devices, only show essential animations
    return animationType === 'essential';
  }
  
  // On regular devices, show everything except complex animations if WebGL not supported
  if (animationType === 'complex') {
    return checkWebGLSupport();
  }
  
  return true;
}; 