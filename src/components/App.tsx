import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import Header from './Header';
import Board from './Board';
import Footer from './Footer';

const App: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showHelp, setShowHelp] = useState(false);

  useInput((input, key) => {
    if (key.leftArrow) {
      setSelectedIndex(prev => Math.max(0, prev - 1));
    } else if (key.rightArrow) {
      setSelectedIndex(prev => prev + 1);
    } else if (input === 'h') {
      setShowHelp(!showHelp);
    } else if (input === 'q') {
      process.exit(0);
    }
  });

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

export default App;
