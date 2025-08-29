#!/usr/bin/env node
import { render } from 'ink';
import { App } from './App';
import { ModeProvider } from './contexts/ModeContext';

render(
  <ModeProvider>
    <App />
  </ModeProvider>,
);
