import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
}

export interface Actor {
  login: Scalars['String']['output'];
}

export interface Label {
  __typename?: 'Label';
  color: Scalars['String']['output'];
  name: Scalars['String']['output'];
}

export interface LabelConnection {
  __typename?: 'LabelConnection';
  nodes?: Maybe<Array<Maybe<Label>>>;
}

export enum MergeableState {
  Conflicting = 'CONFLICTING',
  Mergeable = 'MERGEABLE',
  Unknown = 'UNKNOWN'
}

export interface Organization extends RepositoryOwner {
  __typename?: 'Organization';
  login: Scalars['String']['output'];
}

export interface PageInfo {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
}

export interface PullRequest {
  __typename?: 'PullRequest';
  assignees: UserConnection;
  author?: Maybe<Actor>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isDraft: Scalars['Boolean']['output'];
  labels: LabelConnection;
  mergeable: MergeableState;
  number: Scalars['Int']['output'];
  reviewDecision?: Maybe<PullRequestReviewDecision>;
  reviewRequests: ReviewRequestConnection;
  state: PullRequestState;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  url: Scalars['String']['output'];
}

export interface PullRequestAssigneesArgs {
  first?: InputMaybe<Scalars['Int']['input']>;
}

export interface PullRequestLabelsArgs {
  first?: InputMaybe<Scalars['Int']['input']>;
}

export interface PullRequestReviewRequestsArgs {
  first?: InputMaybe<Scalars['Int']['input']>;
}

export interface PullRequestConnection {
  __typename?: 'PullRequestConnection';
  nodes?: Maybe<Array<Maybe<PullRequest>>>;
  pageInfo: PageInfo;
}

export enum PullRequestReviewDecision {
  Approved = 'APPROVED',
  ChangesRequested = 'CHANGES_REQUESTED',
  ReviewRequired = 'REVIEW_REQUIRED'
}

export enum PullRequestState {
  Closed = 'CLOSED',
  Merged = 'MERGED',
  Open = 'OPEN'
}

export interface Query {
  __typename?: 'Query';
  repository?: Maybe<Repository>;
}

export interface QueryRepositoryArgs {
  name: Scalars['String']['input'];
  owner: Scalars['String']['input'];
}

export interface Ref {
  __typename?: 'Ref';
  name: Scalars['String']['output'];
}

export interface Repository {
  __typename?: 'Repository';
  defaultBranchRef?: Maybe<Ref>;
  description?: Maybe<Scalars['String']['output']>;
  forkCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  owner: RepositoryOwner;
  pullRequests: PullRequestConnection;
  stargazerCount: Scalars['Int']['output'];
  url: Scalars['String']['output'];
}

export interface RepositoryPullRequestsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  states?: InputMaybe<Array<PullRequestState>>;
}

export interface RepositoryOwner {
  login: Scalars['String']['output'];
}

export type RequestedReviewer = User;

export interface ReviewRequest {
  __typename?: 'ReviewRequest';
  requestedReviewer?: Maybe<RequestedReviewer>;
}

export interface ReviewRequestConnection {
  __typename?: 'ReviewRequestConnection';
  nodes?: Maybe<Array<Maybe<ReviewRequest>>>;
}

export interface User extends Actor, RepositoryOwner {
  __typename?: 'User';
  avatarUrl: Scalars['String']['output'];
  login: Scalars['String']['output'];
}

export interface UserConnection {
  __typename?: 'UserConnection';
  nodes?: Maybe<Array<Maybe<User>>>;
}

export type GetPullRequestsQueryVariables = Exact<{
  owner: Scalars['String']['input'];
  name: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetPullRequestsQuery = { __typename?: 'Query', repository?: { __typename?: 'Repository', pullRequests: { __typename?: 'PullRequestConnection', nodes?: Array<{ __typename?: 'PullRequest', id: string, number: number, title: string, url: string, state: PullRequestState, isDraft: boolean, createdAt: string, updatedAt: string, mergeable: MergeableState, reviewDecision?: PullRequestReviewDecision | null, author?: { __typename?: 'User', avatarUrl: string, login: string } | null, labels: { __typename?: 'LabelConnection', nodes?: Array<{ __typename?: 'Label', name: string, color: string } | null> | null }, assignees: { __typename?: 'UserConnection', nodes?: Array<{ __typename?: 'User', login: string } | null> | null }, reviewRequests: { __typename?: 'ReviewRequestConnection', nodes?: Array<{ __typename?: 'ReviewRequest', requestedReviewer?: { __typename?: 'User', login: string } | null } | null> | null } } | null> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } } | null };

export type GetRepositoryQueryVariables = Exact<{
  owner: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;

export type GetRepositoryQuery = { __typename?: 'Query', repository?: { __typename?: 'Repository', id: string, name: string, url: string, description?: string | null, stargazerCount: number, forkCount: number, owner: { __typename?: 'Organization', login: string } | { __typename?: 'User', login: string }, defaultBranchRef?: { __typename?: 'Ref', name: string } | null } | null };

export const GetPullRequestsDocument = gql`
    query GetPullRequests($owner: String!, $name: String!, $first: Int = 20, $after: String) {
  repository(owner: $owner, name: $name) {
    pullRequests(first: $first, after: $after, states: [OPEN]) {
      nodes {
        id
        number
        title
        url
        state
        isDraft
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

/**
 * __useGetPullRequestsQuery__
 *
 * To run a query within a React component, call `useGetPullRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPullRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPullRequestsQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *      name: // value for 'name'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetPullRequestsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetPullRequestsQuery, GetPullRequestsQueryVariables> & ({ variables: GetPullRequestsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetPullRequestsQuery, GetPullRequestsQueryVariables>(GetPullRequestsDocument, options);
}
export function useGetPullRequestsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPullRequestsQuery, GetPullRequestsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetPullRequestsQuery, GetPullRequestsQueryVariables>(GetPullRequestsDocument, options);
}
export function useGetPullRequestsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetPullRequestsQuery, GetPullRequestsQueryVariables>) {
  const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<GetPullRequestsQuery, GetPullRequestsQueryVariables>(GetPullRequestsDocument, options);
}
export type GetPullRequestsQueryHookResult = ReturnType<typeof useGetPullRequestsQuery>;
export type GetPullRequestsLazyQueryHookResult = ReturnType<typeof useGetPullRequestsLazyQuery>;
export type GetPullRequestsSuspenseQueryHookResult = ReturnType<typeof useGetPullRequestsSuspenseQuery>;
export type GetPullRequestsQueryResult = ApolloReactCommon.QueryResult<GetPullRequestsQuery, GetPullRequestsQueryVariables>;
export const GetRepositoryDocument = gql`
    query GetRepository($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    id
    name
    owner {
      login
    }
    url
    description
    stargazerCount
    forkCount
    defaultBranchRef {
      name
    }
  }
}
    `;

/**
 * __useGetRepositoryQuery__
 *
 * To run a query within a React component, call `useGetRepositoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRepositoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRepositoryQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetRepositoryQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetRepositoryQuery, GetRepositoryQueryVariables> & ({ variables: GetRepositoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetRepositoryQuery, GetRepositoryQueryVariables>(GetRepositoryDocument, options);
}
export function useGetRepositoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRepositoryQuery, GetRepositoryQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetRepositoryQuery, GetRepositoryQueryVariables>(GetRepositoryDocument, options);
}
export function useGetRepositorySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetRepositoryQuery, GetRepositoryQueryVariables>) {
  const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<GetRepositoryQuery, GetRepositoryQueryVariables>(GetRepositoryDocument, options);
}
export type GetRepositoryQueryHookResult = ReturnType<typeof useGetRepositoryQuery>;
export type GetRepositoryLazyQueryHookResult = ReturnType<typeof useGetRepositoryLazyQuery>;
export type GetRepositorySuspenseQueryHookResult = ReturnType<typeof useGetRepositorySuspenseQuery>;
export type GetRepositoryQueryResult = ApolloReactCommon.QueryResult<GetRepositoryQuery, GetRepositoryQueryVariables>;
