import { useEffect, useState } from "react";

export function useKeyboardOpen() {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    if (!window.visualViewport) {
      console.warn('VisualViewport API не поддерживается в этом браузере');
      return;
    }

    const handleVisualViewportResize = () => {
      const isKeyboardOpen = window.visualViewport!.height < window.innerHeight;
      setKeyboardOpen(isKeyboardOpen);
    };

    window.visualViewport?.addEventListener('resize', handleVisualViewportResize);
    
    return () => {
      window.visualViewport?.removeEventListener('resize', handleVisualViewportResize);
    };
  }, []);

  return keyboardOpen;
}
