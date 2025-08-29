import React, { useEffect, useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { Header } from './components/Header';
import { Board } from './components/Board';
import { Footer } from './components/Footer';
import { authService } from './services/authService';
import { useLogger } from './hooks/useLogger';
import { useMode } from './contexts/ModeContext';

export const App: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const { mode, switchToEdit } = useMode();

  const logger = useLogger();

  useInput((input, key) => {
    if (mode !== 'command') return;

    switch (true) {
    case key.leftArrow:
      setSelectedIndex(prev => Math.max(0, prev - 1));
      break;
    case key.rightArrow:
      setSelectedIndex(prev => prev + 1);
      break;
    case input === 'h':
      setShowHelp(!showHelp);
      break;
    case input === '/':
      switchToEdit();
      break;
    case input === 'q':
      process.exit(0);
      break;
    }
  });

  useEffect(() => {
    (async () => {
      const token = await authService.getGithubToken();
      logger.debug(token);
    })();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box flexDirection="column" height="100%">
      <Header />
      <Box flexGrow={1}>
        {showHelp ? (
          <Box padding={1}>
            <Text>
              {`Help:
← → : Navigate columns
h   : Toggle help
/   : Enter edit mode
q   : Quit`}
            </Text>
          </Box>
        ) : (
          <Board selectedIndex={selectedIndex} />
        )}
      </Box>
      <Footer />
    </Box>
  );
};
