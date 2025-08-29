import { graphql } from '@octokit/graphql';
import { authService } from './authService';
import { execCommand } from '../utils/execCommand';

export interface Repository {
  owner: string;
  name: string;
}

export interface PullRequest {
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
}

class GitHubService {
  private graphqlWithAuth: typeof graphql | null = null;
  private currentRepo: Repository | null = null;

  async initialize(): Promise<void> {
    const token = await authService.getGithubToken();
    this.graphqlWithAuth = graphql.defaults({
      baseUrl: process.env.OCTOKIT_BASE_URL || 'https://api.github.com',
      headers: {
        authorization: `token ${token}`,
      },
    });

    this.currentRepo = await this.getCurrentRepository();
  }

  private async getCurrentRepository(): Promise<Repository> {
    const { stdout } = await execCommand('git remote get-url origin');
    const remoteUrl = stdout.toString().trim();

    // Parse GitHub URLs (both HTTPS and SSH)
    const match = remoteUrl.match(/github\.com[:/](.+)\/(.+?)(?:\.git)?$/);
    if (!match) {
      throw new Error('Could not parse GitHub repository URL');
    }

    return {
      owner: match[1],
      name: match[2],
    };
  }

  async query<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    if (!this.graphqlWithAuth) {
      await this.initialize();
    }

    if (!this.graphqlWithAuth) {
      throw new Error('GitHub service not initialized');
    }

    return this.graphqlWithAuth<T>(query, variables);
  }

  getRepository(): Repository | null {
    return this.currentRepo;
  }
}

export const githubService = new GitHubService();
