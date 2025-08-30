import { Box, Text } from 'ink';
import chalk from 'chalk';
import { FC } from 'react';

interface GradientBoxProps {
  children: string
}

export const GradientBox: FC<GradientBoxProps> = ({ children }) => {
  const colors = [
    [64, 64, 255],   // Start color
    [128, 64, 255],
    [192, 64, 255],
    [255, 64, 192],
    [255, 64, 128],  // End color
  ];

  return (
    <Box>
      {children.split('').map((char, i) => {
        const colorIndex = Math.floor((i / children.length) * colors.length);
        const [r, g, b] = colors[Math.min(colorIndex, colors.length - 1)];

        return (
          <Text key={i}>
            {chalk.bgRgb(r, g, b).white(char)}
          </Text>
        );
      })}
    </Box>
  );
};
