import { FC } from 'react';
import { Box, Text } from 'ink';
import { colors } from '../../styles/theme';
import { Icon } from '../../components/Icon';
import { PullRequest } from '../../services/githubService';
import { formatCompactDistanceToNow } from '../../utils/formatCompactDistanceToNow';

interface FooterProps {
  currentPullRequest?: PullRequest;
  totalPrNumber?: number;
  fetchedPrNumber?: number;
  currentPrOrder?: number;
  owner: string;
  name: string;
}

export const Footer: FC<FooterProps> = ({
  currentPullRequest,
  totalPrNumber = 0,
  fetchedPrNumber = 0,
  currentPrOrder = 0,
  owner,
  name,
}) => {

  const timeSinceLastUpdate = currentPullRequest ? formatCompactDistanceToNow(new Date(currentPullRequest.updatedAt)) : '';

  return (
    <Box borderStyle="round" display='flex' alignItems='stretch' justifyContent='space-between' {...styles.mainBox}>
      <Box backgroundColor={colors.text.secondary}>
        <Box paddingX={1}>
          <Text color={colors.text.primary} bold italic>
            <Icon icon='pull_request' />&nbsp;PRs
          </Text>
        </Box>
        {owner && name && (
          <Box paddingX={1}>
            <Text color={colors.text.primary} bold italic>
              <Icon icon='repo' />&nbsp;{name} * {owner}
            </Text>
          </Box>
        )}
        {timeSinceLastUpdate && (
          <Box paddingX={1}>
            <Text color={colors.text.primary} bold italic>
              <Icon icon='update' />&nbsp;Updated {timeSinceLastUpdate} * PR {currentPrOrder}/{totalPrNumber} (fetched {fetchedPrNumber})
            </Text>
          </Box>
        )}
      </Box>
      <Box>
        <Box width={10} height={1} paddingX={5}>
          <Text color={colors.text.primary} bold italic>
            Help&nbsp;<Icon icon='help' />
          </Text>
        </Box>
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
    backgroundColor: colors.text.secondary,
    borderColor: colors.border.primary,
  },
};
