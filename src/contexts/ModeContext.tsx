import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useLogger } from '../hooks/useLogger';

export type AppMode = 'command' | 'edit';

interface ModeContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  switchToEdit: () => void;
  switchToCommand: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

interface ModeProviderProps {
  children: ReactNode;
}

export const ModeProvider: React.FC<ModeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<AppMode>('command');
  const logger = useLogger();
  logger.debug(`Current mode: ${mode}`);

  const switchToEdit = useCallback(() => {
    setMode('edit');
  }, []);

  const switchToCommand = useCallback(() => {
    setMode('command');
  }, []);

  return (
    <ModeContext.Provider value={{ mode, setMode, switchToEdit, switchToCommand }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = (): ModeContextType => {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};
