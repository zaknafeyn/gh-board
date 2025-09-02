import { Text, Box } from 'ink';
import { useCurrentRow } from '../../contexts/CurrentRowContext';
import { colors } from '../../styles/theme';
import { PullRequest } from '../../__generated__/graphql';

export const SidePanel = () => {
  const { currentRow } = useCurrentRow<PullRequest>();

  return (
    <Box flexDirection="column" borderStyle="single" borderColor={colors.border.primary} paddingX={1} minWidth={30}>
      <Text color={colors.text.primary} bold>Selected Row Details</Text>
      <Text> </Text>
      {currentRow ? (

        <Box flexDirection="row">
          <Text color={colors.text.secondary} bold>{currentRow.id}:</Text>
          <Box marginLeft={1}>
            <Text color={colors.text.primary}>
              {currentRow.title}
            </Text>
          </Box>
        </Box>
      ) : (
        <Text color={colors.text.faint}>No row selected</Text>
      )}
    </Box>
  );
};
