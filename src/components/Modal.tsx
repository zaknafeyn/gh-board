import React, { ReactNode } from 'react';
import { Box, Text, useInput } from 'ink';
import { colors } from '../styles/theme';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  width?: number | string;
  height?: number | string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = 60,
  height = 20,
}) => {
  useInput((input, key) => {
    if (!isOpen) return;

    if (key.escape || input === 'q') {
      onClose();
    }
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Box
      position="absolute"
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        flexDirection="column"
        borderStyle="double"
        borderColor={colors.border.primary}
        backgroundColor={colors.background.primary}
        width={width}
        height={height}
        paddingX={2}
        paddingY={1}
      >
        {title && (
          <Box marginBottom={1}>
            <Text color={colors.text.primary} bold>
              {title}
            </Text>
          </Box>
        )}
        <Box flexGrow={1}>
          {children}
        </Box>
        <Box justifyContent="center" marginTop={1}>
          <Text color={colors.text.faint}>
            Press ESC or 'q' to close
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
