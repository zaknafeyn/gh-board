import React from 'react';
import { Box, Text } from 'ink';

export const Header: React.FC = () => {
  return (
    <Box borderStyle="round" borderColor="cyan" padding={1}>
      <Text bold color="cyan">
        📋 GitHub Board - Console Interface
      </Text>
    </Box>
  );
};
