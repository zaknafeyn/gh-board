import { Box, Text } from 'ink';
import open from 'open';
import { FC, useMemo } from 'react';
import { useGetPullRequestsQuery } from '../__generated__/graphql';
import { useMode } from '../contexts/ModeContext';
import { prIconFormatter } from '../formatters/prIconFormatter';
import { useLoadingState } from '../hooks/useLoadingState';
import { useLogger } from '../hooks/useLogger';
import { useRepoInfo } from '../hooks/useRepoInfo';
import { getIcon } from '../styles/icons';
import { colors } from '../styles/theme';
import { compactRelative } from '../utils/formatCompactDistanceToNow';
import { InputBox } from './InputBox';
import { InteractiveTable, TableField } from './InteractiveTable';
import { LoadingSpinner } from './LoadingSpinner';

// interface BoardProps {
// }

export const Board: FC = () => {
  const logger = useLogger();
  const { mode } = useMode();
  // const [repo, setRepo] = useState<{owner: string; name: string} | null>(null);
  const loadingState = useLoadingState();

  const { name, owner } = useRepoInfo();

  // Use generated GraphQL hook
  const { data, loading, error, refetch } = useGetPullRequestsQuery({
    variables: {
      owner,
      name,
      first: 20,
    },
    skip: name === '' || owner === '', // Skip query if repo info is not available
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
      width: 2,
    },
    {
      value: (row: EnhancedPullRequest) => `#${row.number} ${row.title}`,
      header: 'Title',
      width: 25,
    },
    {
      value: (row: EnhancedPullRequest) => (
      <>
          {row.additions !== 0 && <Text color={colors.text.success}>{`+${row.additions}`}</Text>}
          {row.deletions !== 0 && (<>&nbsp;<Text color={colors.text.error}>{`-${row.deletions}`}</Text></>)}
      </>
      ),
      header: getIcon('minus_plus'),
      width: 11,
      justifyContent: 'center'
    },

    {
      // created
      value: (row: EnhancedPullRequest) => compactRelative(new Date(row.createdAt)),
      header: getIcon('created_at'),
      width: 7,
      justifyContent: 'center'
    },
    {
      // updated
      value: (row: EnhancedPullRequest) => compactRelative(new Date(row.updatedAt)),
      header: getIcon('updated_at'),
      width: 7,
      justifyContent: 'center'
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
    </Box>
  );
};
