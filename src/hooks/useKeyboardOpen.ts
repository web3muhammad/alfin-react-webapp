import { useEffect, useState } from "react";

export function useKeyboardOpen(threshold = 150) {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [initialHeight, setInitialHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Set initial height after a small delay to ensure proper initialization
    const timer = setTimeout(() => {
      setInitialHeight(window.innerHeight);
    }, 100);

    let resizeTimeout: number;
    const handleResize = () => {
      // Debounce the resize handler
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const heightDiff = initialHeight - window.innerHeight;
        setKeyboardOpen(heightDiff > threshold);
      }, 50);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
      clearTimeout(resizeTimeout);
    };
  }, [threshold, initialHeight]);

  return keyboardOpen;
}
