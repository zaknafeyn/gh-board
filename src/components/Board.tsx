import React, { useMemo, useEffect, useState } from 'react';
import { Box, Text } from 'ink';
import { Column } from './Column';
import { InputBox } from './InputBox';
import { LoadingSpinner } from './LoadingSpinner';
import { useLogger } from '../hooks/useLogger';
import { useMode } from '../contexts/ModeContext';
import { colors } from '../styles/theme';
import { InteractiveTable, TableField } from './InteractiveTable';
import { prIconFormatter } from '../formatters/prIconFormatter';
import { getIcon } from '../styles/icons';
import open from 'open';
import { useGetPullRequestsQuery } from '../__generated__/graphql';
import { githubService } from '../services/githubService';
import { useLoadingState } from '../hooks/useLoadingState';
import { compactRelative } from '../utils/formatCompactDistanceToNow';

interface BoardProps {
  selectedIndex: number;
}

export const Board: React.FC<BoardProps> = ({ selectedIndex }) => {
  const logger = useLogger();
  const { mode } = useMode();
  const [repo, setRepo] = useState<{owner: string; name: string} | null>(null);
  const loadingState = useLoadingState();

  // Initialize GitHub service and get repository info
  useEffect(() => {
    const initializeService = async () => {
      try {
        await githubService.initialize();
        const repoInfo = githubService.getRepository();
        setRepo(repoInfo);
      } catch (error) {
        logger.error('Failed to initialize GitHub service:', error);
      }
    };

    initializeService();
  }, [logger]);

  // Use generated GraphQL hook
  const { data, loading, error, refetch } = useGetPullRequestsQuery({
    variables: {
      owner: repo?.owner || 'owner',
      name: repo?.name || 'repo',
      first: 20,
    },
    skip: !repo, // Skip query if repo info is not available
    fetchPolicy: 'cache-and-network', // Ensure refetch works properly
  });

  // Handle refetch with loading state
  const handleRefetch = async () => {
    loadingState.start();
    logger.debug('Refetching pull requests...');
    try {
      await refetch();
      logger.debug('Refetch completed successfully');
    } catch (error) {
      logger.error('Refetch failed:', error);
    } finally {
      loadingState.finish();
    }
  };

  logger.debug('Rendering board', { data, loading, error });

  const pullRequests = useMemo(() => {
    return data?.repository?.pullRequests?.nodes?.filter(Boolean) || [];
  }, [data]);

  // Transform PRs into items for the Review column
  const prItems = pullRequests.map(pr => pr ? `#${pr.number}: ${pr.title}` : '');

  type EnhancedPullRequest = NonNullable<typeof pullRequests[0]> & {
    icon: string;
  };

  const prData = useMemo(() => {
    return pullRequests.filter((pr): pr is NonNullable<typeof pr> => Boolean(pr)).map(pr => ({
      ...pr,
      icon: prIconFormatter(pr),
    })) as EnhancedPullRequest[];
  }, [pullRequests]);

  const isLoading = loading || loadingState.isLoading;

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

  if (isLoading) {
    return (
      <Box flexDirection="column" alignItems="center" justifyContent="center" padding={2}>
        <LoadingSpinner text={loadingState.isLoading ? 'Refreshing pull requests...' : 'Loading pull requests...'} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box flexDirection="column" alignItems="center" justifyContent="center" padding={2}>
        <Text color={colors.text.error}>
          Error loading pull requests: {error.message}
        </Text>
      </Box>
    );
  }

  const fields: TableField<EnhancedPullRequest>[] = [
    {
      value: (row: EnhancedPullRequest) => {
        return row.isDraft ? getIcon('pull_request_draft') : getIcon('pull_request');
      },
      header: getIcon('pull_request'),
      minWidth: 2,
    },
    {
      value: (row: EnhancedPullRequest) => `#${row.number} ${row.title}`,
      header: 'Title',
      minWidth: 25,
    },
    {
      // created
      value: (row: EnhancedPullRequest) => compactRelative(new Date(row.createdAt)),
      header: 'Created',
      minWidth: 7,
    },
    {
      // updated
      value: (row: EnhancedPullRequest) => compactRelative(new Date(row.updatedAt)),
      header: 'Updated',
      minWidth: 7,
    },
  ];

  return (
    <Box flexDirection="column" padding={1} width="100%">
      <InputBox isFocused={mode === 'edit'} />
      <InteractiveTable
        fields={fields}
        data={prData}
        isLoading={isLoading}
        onOpen={(row) => open(row.url)}
        onReloadRequested={handleRefetch}
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
