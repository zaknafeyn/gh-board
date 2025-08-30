import { gql } from '@apollo/client';
import { apolloClient } from '../lib/apollo-client';
import type { PullRequest } from './githubService';

export interface PullRequestQueryVariables {
  owner: string;
  name: string;
  first?: number;
  after?: string;
}

interface GraphQLPullRequest {
  id: string;
  number: number;
  title: string;
  url: string;
  state: 'OPEN' | 'CLOSED' | 'MERGED';
  author: {
    login: string;
    avatarUrl: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  mergeable: 'MERGEABLE' | 'CONFLICTING' | 'UNKNOWN';
  reviewDecision: 'CHANGES_REQUESTED' | 'APPROVED' | 'REVIEW_REQUIRED' | null;
  labels: {
    nodes: Array<{
      name: string;
      color: string;
    }> | null;
  };
  assignees: {
    nodes: Array<{
      login: string;
    }> | null;
  };
  reviewRequests: {
    nodes: Array<{
      requestedReviewer: {
        login: string;
      } | null;
    }> | null;
  };
}

interface PullRequestsQueryResult {
  repository: {
    pullRequests: {
      nodes: GraphQLPullRequest[];
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
      };
    };
  } | null;
}

const GET_PULL_REQUESTS = gql`
  query GetPullRequests($owner: String!, $name: String!, $first: Int = 20, $after: String) {
    repository(owner: $owner, name: $name) {
      pullRequests(first: $first, after: $after, states: [OPEN]) {
        nodes {
          id
          number
          title
          url
          state
          author {
            login
            ... on User {
              avatarUrl
            }
          }
          createdAt
          updatedAt
          mergeable
          reviewDecision
          labels(first: 10) {
            nodes {
              name
              color
            }
          }
          assignees(first: 10) {
            nodes {
              login
            }
          }
          reviewRequests(first: 10) {
            nodes {
              requestedReviewer {
                ... on User {
                  login
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

function transformGraphQLPullRequest(gqlPr: GraphQLPullRequest): PullRequest {
  return {
    id: gqlPr.id,
    number: gqlPr.number,
    title: gqlPr.title,
    url: gqlPr.url,
    state: gqlPr.state as PullRequest['state'],
    author: gqlPr.author ? {
      login: gqlPr.author.login,
    } : null,
    createdAt: gqlPr.createdAt,
    updatedAt: gqlPr.updatedAt,
  };
}

class GraphQLPullRequestService {
  async fetchPullRequests(variables: PullRequestQueryVariables): Promise<PullRequest[]> {
    try {
      const result = await apolloClient.query<PullRequestsQueryResult, PullRequestQueryVariables>({
        query: GET_PULL_REQUESTS,
        variables,
        errorPolicy: 'all',
        fetchPolicy: 'cache-first',
      });

      if (!result.data?.repository?.pullRequests?.nodes) {
        return [];
      }

      return result.data.repository.pullRequests.nodes.map(transformGraphQLPullRequest);
    } catch (error) {
      console.error('Error fetching pull requests via GraphQL:', error);
      throw error;
    }
  }

  async refetchPullRequests(variables: PullRequestQueryVariables): Promise<PullRequest[]> {
    try {
      const result = await apolloClient.query<PullRequestsQueryResult, PullRequestQueryVariables>({
        query: GET_PULL_REQUESTS,
        variables,
        errorPolicy: 'all',
        fetchPolicy: 'network-only', // Force refetch from network
      });

      if (!result.data?.repository?.pullRequests?.nodes) {
        return [];
      }

      return result.data.repository.pullRequests.nodes.map(transformGraphQLPullRequest);
    } catch (error) {
      console.error('Error refetching pull requests via GraphQL:', error);
      throw error;
    }
  }

  async clearCache(): Promise<void> {
    await apolloClient.clearStore();
  }
}

export const graphqlPullRequestService = new GraphQLPullRequestService();
