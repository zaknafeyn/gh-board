import React from 'react';
import { Box, Text } from 'ink';
import { colors } from '../styles/theme';
import { Icon } from './Icon';

export const Footer: React.FC = () => {
  return (
    <Box borderStyle="round" borderColor={colors.border.primary} padding={1}>
      <Text color={colors.text.primary}>
        Press 'h' for help | 'q' to quit | ← → to navigate <Icon icon='pull_request' color={colors.accent.purple} />
      </Text>
    </Box>
  );
};
