import React, { useState, useEffect } from 'react';
import { Text } from 'ink';
import { colors } from '../styles/theme';

interface LoadingSpinnerProps {
  text?: string;
  color?: string;
}

const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = 'Loading...',
  color = colors.accent.blue,
}) => {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex(prev => (prev + 1) % SPINNER_FRAMES.length);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text color={color}>
      {SPINNER_FRAMES[frameIndex]} {text}
    </Text>
  );
};
