import { useCallback } from 'react';

export function useInputFocus() {
  const handleFocus = useCallback((event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTimeout(() => {
      event.target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center' 
      });
    }, 300);
  }, []);

  return { handleFocus };
} 