import { githubService, PullRequest } from './githubService';

interface PullRequestsResponse {
  repository: {
    pullRequests: {
      nodes: Array<{
        id: string;
        number: number;
        title: string;
        url: string;
        state: 'OPEN' | 'CLOSED' | 'MERGED';
        author: {
          login: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      }>;
      totalCount: number;
    };
  };
}

const ASSIGNED_PRS_QUERY = `
  query GetAssignedPullRequests($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      pullRequests(
        first: 50
        states: [OPEN]
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        totalCount
        nodes {
          id
          number
          title
          url
          state
          author {
            login
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;

class PullRequestService {
  async getAssignedPullRequests(): Promise<PullRequest[]> {
    const repo = githubService.getRepository();
    if (!repo) {
      throw new Error('Repository not initialized');
    }

    const response = await githubService.query<PullRequestsResponse>(
      ASSIGNED_PRS_QUERY,
      {
        owner: repo.owner,
        name: repo.name,
      },
    );

    return response.repository.pullRequests.nodes.map(pr => ({
      id: pr.id,
      number: pr.number,
      title: pr.title,
      url: pr.url,
      state: pr.state,
      author: pr.author,
      createdAt: pr.createdAt,
      updatedAt: pr.updatedAt,
    }));
  }
}

export const pullRequestService = new PullRequestService();
