import { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  isNavigationVisible: boolean;
  setIsNavigationVisible: (visible: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isNavigationVisible, setIsNavigationVisible] = useState(true);

  return (
    <NavigationContext.Provider value={{ isNavigationVisible, setIsNavigationVisible }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
} 