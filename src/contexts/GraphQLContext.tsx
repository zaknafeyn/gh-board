import React, { createContext, useContext, ReactNode } from 'react';
import { apolloClient } from '../lib/apollo-client';

interface GraphQLContextValue {
  client: typeof apolloClient;
  refetch: () => Promise<void>;
}

const GraphQLContext = createContext<GraphQLContextValue | null>(null);

export const useGraphQLContext = () => {
  const context = useContext(GraphQLContext);
  if (!context) {
    throw new Error('useGraphQLContext must be used within a GraphQLProvider');
  }
  return context;
};

interface GraphQLProviderProps {
  children: ReactNode;
}

export const GraphQLProvider: React.FC<GraphQLProviderProps> = ({ children }) => {
  const refetch = async () => {
    await apolloClient.refetchQueries({ include: 'active' });
  };

  const contextValue: GraphQLContextValue = {
    client: apolloClient,
    refetch,
  };

  return (
    <GraphQLContext.Provider value={contextValue}>
      {children}
    </GraphQLContext.Provider>
  );
};
