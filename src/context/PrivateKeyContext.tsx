// src/context/PrivateKeyContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

type PrivateKeyContextType = {
  privateKey: string;
  setPrivateKey: (key: string) => void;
};

const PrivateKeyContext = createContext<PrivateKeyContextType | undefined>(undefined);

export const PrivateKeyProvider = ({ children }: { children: ReactNode }) => {
  const [privateKey, setPrivateKey] = useState<string>('');

  return (
    <PrivateKeyContext.Provider value={{ privateKey, setPrivateKey }}>
      {children}
    </PrivateKeyContext.Provider>
  );
};

export const usePrivateKey = () => {
  const context = useContext(PrivateKeyContext);
  if (context === undefined) {
    throw new Error('usePrivateKey must be used within a PrivateKeyProvider');
  }
  return context;
};
