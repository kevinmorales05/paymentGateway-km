'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextProps {
  user: string | null;
  setUser: (user: string | null) => void;
  userCards: string;
  logged: boolean;
  

}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
