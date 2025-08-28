import React from 'react';
import { Box, Text } from 'ink';

const Footer: React.FC = () => {
  return (
    <Box borderStyle="round" borderColor="gray" padding={1}>
      <Text color="gray">
        Press 'h' for help | 'q' to quit | ← → to navigate
      </Text>
    </Box>
  );
};

export default Footer;
