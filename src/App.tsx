import React, { useState } from 'react';
import { Box, useInput } from 'ink';
import { Header } from './layout/Header';
import { Board } from './components/Board';
import { Footer } from './layout/Footer';
import { useMode } from './contexts/ModeContext';
import { SidePanel } from './layout/Side';
import { Help } from './components/Help';
import { BottomPanel } from './layout/Bottom';

export const App: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [showBottomPanel, setShowBottomPanel] = useState(false);
  const { mode, switchToEdit } = useMode();

  useInput((input, key) => {
    if (mode !== 'command') return;
    switch (true) {
    case key.leftArrow:
      setSelectedIndex(prev => Math.max(0, prev - 1));
      break;
    case key.rightArrow:
      setSelectedIndex(prev => prev + 1);
      break;
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
    case input === 'q':
      process.exit(0);
      break;
    }
  });

  return (
    <Box flexDirection="column" height="100%">
      <Header />
      <Box flexGrow={1}>
        {showHelp ? (
          <Help />
        ) : (
          <Box width="100%" minHeight={25} display='flex' flexDirection='column'>
            <Box width="100%" display='flex' flexDirection='row'>
              <Board selectedIndex={selectedIndex} />
              {showSidePanel && <SidePanel />}
            </Box>
            {showBottomPanel && <BottomPanel />}
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  );
};
