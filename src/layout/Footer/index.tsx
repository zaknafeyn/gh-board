import { FC } from 'react';
import { Box, Text } from 'ink';
import { colors } from '../../styles/theme';
import { Icon } from '../../components/Icon';
import { githubService, PullRequest } from '../../services/githubService';
import { formatCompactDistanceToNow } from '../../utils/formatCompactDistanceToNow';
import { FilledBox } from '../../components/FilledBox';

interface FooterProps {
  currentPullRequest?: PullRequest;
  totalPrNumber?: number;
  fetchedPrNumber?: number;
  currentPrOrder?: number;
}

export const Footer: FC<FooterProps> = ({
  currentPullRequest,
  totalPrNumber = 0,
  fetchedPrNumber = 0,
  currentPrOrder = 0,
}) => {

  const timeSinceLastUpdate = currentPullRequest ? formatCompactDistanceToNow(new Date(currentPullRequest.updatedAt)) : '';
  const { owner, name } = githubService.getRepository() || {};

  return (
    <Box borderStyle="round" display='flex' borderColor={colors.border.primary} alignItems='stretch' justifyContent='space-between' {...styles.mainBox}>
      <Box>
        <Box paddingX={1}>
          <Text color={colors.text.primary} bold italic backgroundColor={colors.text.inverted}>
            <Icon icon='pull_request'  />&nbsp;PRs
          </Text>
        </Box>
        {owner && name && (
          <Box paddingX={1}>
            <Text color={colors.text.primary} bold italic backgroundColor={colors.text.inverted}>
              <Icon icon='repo' />&nbsp;{name} * {owner}
            </Text>
          </Box>
        )}
        {timeSinceLastUpdate && (
          <Box paddingX={1}>
            <Text color={colors.text.primary} bold italic backgroundColor={colors.text.inverted}>
              <Icon icon='update' />&nbsp;Updated {timeSinceLastUpdate} * PR {currentPrOrder}/{totalPrNumber} (fetched {fetchedPrNumber})
            </Text>
          </Box>
        )}
      </Box>
      <Box>
        <FilledBox width={10} height={1} padding={5} backgroundColor={colors.text.inverted}>
          <Text color={colors.text.primary} bold italic backgroundColor={colors.text.inverted}>
            Help&nbsp;<Icon icon='help' />
          </Text>
        </FilledBox>
      </Box>
    </Box>
  );
};

const styles = {
  mainBox: {
    width: '100%',

    borderBottom: false,
    borderTop: false,
    borderLeft: false,
    borderRight: false,
  },
};
