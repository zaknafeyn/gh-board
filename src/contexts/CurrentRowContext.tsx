import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface CurrentRowContextType<TRow = Record<string, unknown>> {
  currentRow: TRow | null;
  setCurrentRow: (row: TRow | null) => void;
}

const CurrentRowContext = createContext<CurrentRowContextType | undefined>(undefined);

interface CurrentRowProviderProps {
  children: ReactNode;
}

export const CurrentRowProvider: React.FC<CurrentRowProviderProps> = ({ children }) => {
  const [currentRow, setCurrentRowState] = useState<Record<string, unknown> | null>(null);

  const setCurrentRow = useCallback((row: Record<string, unknown> | null) => {
    setCurrentRowState(row);
  }, []);

  return (
    <CurrentRowContext.Provider value={{ currentRow, setCurrentRow }}>
      {children}
    </CurrentRowContext.Provider>
  );
};

export const useCurrentRow = <TRow = Record<string, unknown>>(): CurrentRowContextType<TRow> => {
  const context = useContext(CurrentRowContext);
  if (context === undefined) {
    throw new Error('useCurrentRow must be used within a CurrentRowProvider');
  }
  return context as CurrentRowContextType<TRow>;
};
