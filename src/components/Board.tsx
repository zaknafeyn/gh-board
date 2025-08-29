import React from 'react';
import { Box } from 'ink';
import { Column } from './Column';
import { InputBox } from './InputBox';
import { useLogger } from '../hooks/useLogger';
import { useMode } from '../contexts/ModeContext';

interface BoardProps {
  selectedIndex: number;
}

export const Board: React.FC<BoardProps> = ({ selectedIndex }) => {
  const columns = [
    {
      title: 'To Do',
      items: ['Setup project structure', 'Add authentication', 'Create tests'],
      color: 'red',
    },
    {
      title: 'In Progress',
      items: ['Implement board layout', 'Add keyboard navigation'],
      color: 'yellow',
    },
    {
      title: 'Review',
      items: ['Code review PR #123'],
      color: 'blue',
    },
    {
      title: 'Done',
      items: ['Initialize React app', 'Setup TypeScript', 'Configure Webpack'],
      color: 'green',
    },
  ];

  const logger = useLogger();
  const { mode } = useMode();

  logger.error('Show board');

  return (
    <Box flexDirection="row" padding={1}>
      <InputBox isFocused={mode === 'edit' }></InputBox>
      {columns.map((column, index) => (
        <Column
          key={column.title}
          title={column.title}
          items={column.items}
          color={column.color}
          isSelected={index === selectedIndex}
        />
      ))}
    </Box>
  );
};
