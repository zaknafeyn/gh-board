import React from 'react';
import { Box, Text } from 'ink';

interface ColumnProps {
  title: string;
  items: string[];
  color: string;
  isSelected: boolean;
}

const Column: React.FC<ColumnProps> = ({ title, items, color, isSelected }) => {
  return (
    <Box
      flexDirection="column"
      marginRight={2}
      minWidth={25}
      borderStyle={isSelected ? 'double' : 'single'}
      borderColor={isSelected ? 'white' : 'gray'}
      padding={1}
    >
      <Text bold color={color} underline>
        {title}
      </Text>
      <Box flexDirection="column" marginTop={1}>
        {items.map((item, index) => (
          <Box key={index} marginY={0}>
            <Text>• {item}</Text>
          </Box>
        ))}
        {items.length === 0 && (
          <Text color="gray" italic>
            No items
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Column;
