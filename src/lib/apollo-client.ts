import { ApolloClient, InMemoryCache, ApolloLink, Observable } from '@apollo/client';
import { authService } from '../services/authService';

const httpLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    uri: process.env.OCTOKIT_BASE_URL || 'https://api.github.com/graphql',
  });
  return forward(operation);
});

const authLink = new ApolloLink((operation, forward) => {
  return new Observable(observer => {
    (async () => {
      try {
        const token = await authService.getGithubToken();
        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
          },
        }));
      } catch (error) {
        console.error('Error getting GitHub token:', error);
      }
      forward(operation).subscribe(observer);
    })();
  });
});

const cache = new InMemoryCache({
  typePolicies: {
    Repository: {
      fields: {
        pullRequests: {
          keyArgs: ['states'],
          merge(existing, incoming, { args }) {
            if (!existing || !args?.after) {
              return incoming;
            }

            return {
              ...incoming,
              nodes: [...(existing.nodes || []), ...(incoming.nodes || [])],
            };
          },
        },
      },
    },
  },
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-and-network',
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    },
  },
});
