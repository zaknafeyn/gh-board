import React, { useMemo } from 'react';
import { Box, Text } from 'ink';
import { Column } from './Column';
import { InputBox } from './InputBox';
import { LoadingSpinner } from './LoadingSpinner';
import { useLogger } from '../hooks/useLogger';
import { useMode } from '../contexts/ModeContext';
import { useData } from '../contexts/DataContext';
import { colors } from '../styles/theme';
import { InteractiveTable } from './InteractiveTable';
import { prIconFormatter } from '../formatters/prIconFormatter';
import { getIcon } from '../styles/icons';
import open from 'open';
import { PullRequest } from '../services/githubService';

interface BoardProps {
  selectedIndex: number;
}

export const Board: React.FC<BoardProps> = ({ selectedIndex }) => {
  const logger = useLogger();
  const { mode } = useMode();
  const { state } = useData();

  logger.debug('Rendering board');

  const { pullRequests } = state;
  const { data, loading, error } = pullRequests;

  logger.debug(JSON.stringify(pullRequests));

  // Transform PRs into items for the Review column
  const prItems = data.map(pr => `#${pr.number}: ${pr.title}`);

  const prData = useMemo(() => {
    return data.map(pr => ({
      ...pr,
      icon: prIconFormatter(pr),
    }));
  }, [data]);

  const columns = [
    {
      title: 'To Do',
      items: ['Setup project structure', 'Add authentication', 'Create tests'],
      color: colors.accent.red,
    },
    {
      title: 'In Progress',
      items: ['Implement board layout', 'Add keyboard navigation'],
      color: colors.accent.yellow,
    },
    {
      title: 'Review',
      items: prItems.length > 0 ? prItems : ['No pull requests assigned'],
      color: colors.accent.blue,
    },
    {
      title: 'Done',
      items: ['Initialize React app', 'Setup TypeScript', 'Configure Webpack'],
      color: colors.accent.green,
    },
  ];

  if (loading) {
    return (
      <Box flexDirection="column" alignItems="center" justifyContent="center" padding={2}>
        <LoadingSpinner text="Loading pull requests..." />
      </Box>
    );
  }

  if (error) {
    return (
      <Box flexDirection="column" alignItems="center" justifyContent="center" padding={2}>
        <Text color={colors.text.error}>
          Error loading pull requests: {error}
        </Text>
      </Box>
    );
  }

  const fields = [
    {
      fieldName: 'icon',
      header: getIcon('pull_request'),
    },
    {
      fieldName: 'title',
      header: 'title',
    },
  ];

  return (
    <Box flexDirection="column" padding={1} width="100%">
      <InputBox isFocused={mode === 'edit'} />
      <InteractiveTable
        fields={fields}
        data={prData}
        onOpen={(row: PullRequest) => open(row.url)}
        showSelectionIndicator
      />
      <Box flexDirection="row">
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
    </Box>
  );
};
