import { getIcon } from '../styles/icons';
import type { PullRequestState } from '../__generated__/graphql';

interface PullRequestLike {
  state: PullRequestState;
}

export const prIconFormatter = (pr: PullRequestLike) => {
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
