import { PullRequest } from '../services/githubService';
import { getIcon } from '../styles/icons';

export const prIconFormatter = (pr: PullRequest) => {
  switch (pr.state) {
  case 'OPEN':
    return getIcon('pull_request');
  case 'CLOSED':
    return getIcon('pull_request_closed');
  case 'MERGED':
    return getIcon('merged');
  default:
    return getIcon('pull_request');
  }
};
