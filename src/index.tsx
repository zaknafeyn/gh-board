#!/usr/bin/env node
import 'dotenv/config';
import { render } from 'ink';
import { App } from './App';
import { ModeProvider } from './contexts/ModeContext';
import { DataProvider } from './contexts/DataContext';

render(
  <ModeProvider>
    <DataProvider>
      <App />
    </DataProvider>
  </ModeProvider>,
);
