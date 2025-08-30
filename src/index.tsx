#!/usr/bin/env node
import 'dotenv/config';
import { render } from 'ink';
import { ApolloProvider } from '@apollo/client';
import { App } from './App';
import { ModeProvider } from './contexts/ModeContext';
import { apolloClient } from './lib/apollo-client';

render(
  <ApolloProvider client={apolloClient}>
    <ModeProvider>
      <App />
    </ModeProvider>
  </ApolloProvider>,
);
