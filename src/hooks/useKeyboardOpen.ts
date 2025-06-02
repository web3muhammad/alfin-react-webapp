import { useEffect, useState } from "react";

export function useKeyboardOpen(threshold = 150) {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    let initialHeight = window.innerHeight;

    const handleResize = () => {
      const heightDiff = initialHeight - window.innerHeight;
      setKeyboardOpen(heightDiff > threshold);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [threshold]);

  return keyboardOpen;
}
