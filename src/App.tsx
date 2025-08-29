import React, { useEffect, useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { Header } from './components/Header';
import { Board } from './components/Board';
import { Footer } from './components/Footer';
import { useLogger } from './hooks/useLogger';
import { useMode } from './contexts/ModeContext';
import { useData } from './contexts/DataContext';
import { pullRequestService } from './services/pullRequestService';
import { githubService } from './services/githubService';
import { SidePanel } from './panels/side';

const help = `Help:
← → : Navigate columns
h   : Toggle help
/   : Enter edit mode
s   : Show side panel
q   : Quit`;

export const App: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const { mode, switchToEdit } = useMode();
  const { actions } = useData();

  const logger = useLogger();

  useInput((input, key) => {
    if (mode !== 'command') return;

    switch (true) {
    case key.leftArrow:
      setSelectedIndex(prev => Math.max(0, prev - 1));
      break;
    case key.rightArrow:
      setSelectedIndex(prev => prev + 1);
      break;
    case input === 'h':
      setShowHelp(prev => !prev);
      break;
    case input === 's':
      setShowSidePanel(prev => !prev);
      break;
    case input === '/':
      switchToEdit();
      break;
    case input === 'q':
      process.exit(0);
      break;
    }
  });

  useEffect(() => {
    const fetchPullRequests = async () => {
      try {
        actions.setPullRequestsLoading(true);
        logger.debug('Initializing GitHub service...');

        await githubService.initialize();
        logger.debug('GitHub service initialized');

        const pullRequests = await pullRequestService.getAssignedPullRequests();
        logger.debug(`Fetched ${pullRequests.length} pull requests`);

        actions.setPullRequestsData(pullRequests);
      } catch (error) {
        logger.error('Failed to fetch pull requests:', error);
        actions.setPullRequestsError(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    fetchPullRequests();
  }, []);

  return (
    <Box flexDirection="column" height="100%">
      <Header />
      <Box flexGrow={1}>
        {showHelp ? (
          <Box display='flex' padding={1}>
            <Text>{help}</Text>
          </Box>
        ) : (
          <Box width="100%" display='flex' flexDirection='row'>
            <Board selectedIndex={selectedIndex} />
            {showSidePanel && <SidePanel />}
          </Box>
        )}
      </Box>
      <Footer repo='test_repo' user='username' />
    </Box>
  );
};
