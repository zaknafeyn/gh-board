import { useState, useEffect } from 'react';
import { graphqlPullRequestService, PullRequestQueryVariables } from '../services/graphqlPullRequestService';
import type { PullRequest } from '../services/githubService';

interface UsePullRequestsGraphQLResult {
  data: PullRequest[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  clearCache: () => Promise<void>;
}

export function usePullRequestsGraphQL(
  variables: PullRequestQueryVariables,
  skip = false,
): UsePullRequestsGraphQLResult {
  const [data, setData] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (useCache = true) => {
    if (skip) return;

    setLoading(true);
    setError(null);

    try {
      const pullRequests = useCache
        ? await graphqlPullRequestService.fetchPullRequests(variables)
        : await graphqlPullRequestService.refetchPullRequests(variables);

      setData(pullRequests);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchData(false);
  };

  const clearCache = async () => {
    await graphqlPullRequestService.clearCache();
    setData([]);
  };

  useEffect(() => {
    fetchData();
  }, [variables.owner, variables.name, variables.first, variables.after, skip]);

  return {
    data,
    loading,
    error,
    refetch,
    clearCache,
  };
}
