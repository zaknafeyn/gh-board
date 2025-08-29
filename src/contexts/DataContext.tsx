import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { PullRequest } from '../services/githubService';

export interface DataState {
  pullRequests: {
    data: PullRequest[];
    loading: boolean;
    error: string | null;
  };
}

interface DataContextType {
  state: DataState;
  actions: {
    setPullRequestsLoading: (loading: boolean) => void;
    setPullRequestsData: (data: PullRequest[]) => void;
    setPullRequestsError: (error: string | null) => void;
    clearPullRequestsError: () => void;
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

const initialState: DataState = {
  pullRequests: {
    data: [],
    loading: false,
    error: null,
  },
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [state, setState] = useState<DataState>(initialState);

  const setPullRequestsLoading = useCallback((loading: boolean) => {
    setState(prev => ({
      ...prev,
      pullRequests: {
        ...prev.pullRequests,
        loading,
      },
    }));
  }, []);

  const setPullRequestsData = useCallback((data: PullRequest[]) => {
    setState(prev => ({
      ...prev,
      pullRequests: {
        ...prev.pullRequests,
        data,
        loading: false,
        error: null,
      },
    }));
  }, []);

  const setPullRequestsError = useCallback((error: string | null) => {
    setState(prev => ({
      ...prev,
      pullRequests: {
        ...prev.pullRequests,
        loading: false,
        error,
      },
    }));
  }, []);

  const clearPullRequestsError = useCallback(() => {
    setState(prev => ({
      ...prev,
      pullRequests: {
        ...prev.pullRequests,
        error: null,
      },
    }));
  }, []);

  const actions = useMemo(() => {
    return {
      setPullRequestsLoading,
      setPullRequestsData,
      setPullRequestsError,
      clearPullRequestsError,
    };
  }, [
    setPullRequestsLoading,
    setPullRequestsData,
    setPullRequestsError,
    clearPullRequestsError,
  ]);

  return (
    <DataContext.Provider value={{ state, actions }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
