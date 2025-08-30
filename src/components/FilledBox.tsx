import { FC, ReactNode } from 'react';
import { Box, Text } from 'ink';
import { LiteralUnion } from 'type-fest';
import { ForegroundColorName } from 'chalk';

interface FilledBoxProps {
  backgroundColor?: LiteralUnion<ForegroundColorName, string>;
  color?: LiteralUnion<ForegroundColorName, string>;
  width: number;
  height: number,
  children?: ReactNode;
  padding: number,
}
export const FilledBox: FC<FilledBoxProps> = ({
  backgroundColor = 'blue',
  color = 'white',
  width = 20,
  height = 1,
  children,
  padding = 1,
}) => {
  const contentLineIndex = Math.floor(height / 2);

  return (
    <Box flexDirection="column">
      {Array(height).fill(null).map((_, i) => {
        const isContentLine = i === contentLineIndex;

        if (isContentLine && children) {
          return (
            <Box key={i} flexDirection="row">
              <Text backgroundColor={backgroundColor} color={color}>
                {' '.repeat(padding)}
              </Text>
              <Box>
                {children}
              </Box>
              <Text backgroundColor={backgroundColor} color={color}>
                {' '.repeat(Math.max(0, width - padding * 2))}
              </Text>
            </Box>
          );
        }

        return (
          <Text key={i} backgroundColor={backgroundColor} color={color}>
            {' '.repeat(width)}
          </Text>
        );
      })}
    </Box>
  );
};
