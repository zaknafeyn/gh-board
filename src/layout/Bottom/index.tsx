import { Box, Text } from 'ink';
import { useCurrentRow } from '../../contexts/CurrentRowContext';
import { colors } from '../../styles/theme';

export const BottomPanel = () => {
  const { currentRow } = useCurrentRow();

  return (
    <Box position='absolute'
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="flex-end"
    >
      <Box flexDirection="column" borderStyle="single" borderColor={colors.border.primary} width='100%' minHeight={8}>
        <Text color={colors.text.primary} bold>Selected Row Summary</Text>
        {currentRow ? (
          <Box flexDirection="row" flexWrap="wrap">
            {Object.entries(currentRow).slice(0, 6).map(([key, value]) => (
              <Box key={key} marginRight={3}>
                <Text color={colors.text.secondary}>{key}: </Text>
                <Text color={colors.text.primary}>
                  {typeof value === 'object' && value !== null
                    ? '[Object]'
                    : String(value).length > 20
                      ? String(value).substring(0, 20) + '...'
                      : String(value)
                  }
                </Text>
              </Box>
            ))}
          </Box>
        ) : (
          <Text color={colors.text.faint}>No row selected</Text>
        )}
      </Box>
    </Box>
  );
};
