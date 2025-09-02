import { Box, Text, useInput } from 'ink';
import React, { useState } from 'react';
import { Help } from './components/Help';
import { Modal } from './components/Modal';
import { useMode } from './contexts/ModeContext';
import { useRepoInfo } from './hooks/useRepoInfo';
import { BottomPanel } from './layout/Bottom';
import { Footer } from './layout/Footer';
import { Header } from './layout/Header';
import { MainPanel } from './layout/Main';
import { SidePanel } from './layout/Side';

export const App: React.FC = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [showBottomPanel, setShowBottomPanel] = useState(false);
  const { mode, switchToEdit } = useMode();
  const [isOpen, setIsOpen] = useState(false);

  const { owner, name } = useRepoInfo();

  useInput((input) => {
    if (mode !== 'command') return;
    switch (true) {
    case input === 'h' || input === '?':
      setShowHelp(prev => !prev);
      break;
    case input === 's':
      setShowSidePanel(prev => !prev);
      break;
    case input === 'b' || input === '`':
      setShowBottomPanel(prev => !prev);
      break;
    case input === '/':
      switchToEdit();
      break;
    case input === 'm':
      setIsOpen(true);
      break;
    case input === 'q':
      process.exit(0);
      break;
    }
  });

  return (
    <Box flexDirection="column" minHeight={10} >
      <Header />
      <Box flexGrow={1}>
        {showHelp ? (
          <Help />
        ) : (
          <Box width="100%" minHeight={25} display='flex' flexDirection='column'>
            <Box width="100%" display='flex' flexDirection='row'>
              <MainPanel />
              {showSidePanel && <SidePanel />}
            </Box>
            {showBottomPanel && <BottomPanel />}
          </Box>
        )}
      </Box>
      <Footer owner={owner} name={name} />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}><Text>Modal text</Text></Modal>
    </Box>

  );
};
