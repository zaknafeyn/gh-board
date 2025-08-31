import { useState, useEffect } from 'react';
import { Text, Box, useInput } from 'ink';
import { colors } from '../../styles/theme';
import { LoadingSpinner } from '../LoadingSpinner';
import { useLogger } from '../../hooks/useLogger';
import { useMode } from '../../contexts/ModeContext';
import { Icon } from '../Icon';

export interface TableField<TRow = Record<string, unknown>> {
  value: keyof TRow | ((row: TRow, index: number, data: TRow[]) => string);
  header: string;
  color?: string;
  minWidth?: number;
}

export interface InteractiveTableProps<TRow = Record<string, unknown>> {
  fields: TableField<TRow>[];
  data: Array<TRow>;
  isLoading?: boolean;
  onOpen?: (row: TRow) => void,
  onReloadRequested?: () => void;
  showSelectionIndicator?: boolean;
}

export const InteractiveTable = <TRow extends Record<string, unknown> = Record<string, unknown>>({
  fields,
  data,
  isLoading = false,
  onOpen,
  onReloadRequested,
  showSelectionIndicator = false,
}: InteractiveTableProps<TRow>) => {
  const [selectedRow, setSelectedRow] = useState(0);
  const { mode } = useMode();

  const logger = useLogger();

  useInput((input, key) => {
    if (isLoading || data.length === 0) return;

    if (mode !== 'command') return;

    switch (true) {
    case key.upArrow:
      setSelectedRow(prev => Math.max(0, prev - 1));
      break;
    case key.downArrow:
      setSelectedRow(prev => Math.min(data.length - 1, prev + 1));
      break;
    case key.return:
      logger.info('Selected row data:', data[selectedRow]);
      break;
    case input === 'o':
      onOpen?.(data[selectedRow]);
      break;
    case input === 'r':
      onReloadRequested?.();
      break;
    default:
      break;
    }
  });

  useEffect(() => {
    if (data.length > 0 && selectedRow >= data.length) {
      setSelectedRow(data.length - 1);
    } else if (data.length > 0 && selectedRow < 0) {
      setSelectedRow(0);
    }
  }, [data.length, selectedRow]);

  if (isLoading) {
    return <LoadingSpinner text="Loading table data..." />;
  }

  if (data.length === 0) {
    return (
      <Box flexDirection="column">
        <Box borderStyle="single" borderColor={colors.border.primary}>
          <Text color={colors.text.faint}>No data available</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box flexDirection="column">
      <Box borderStyle="single" borderColor={colors.border.primary}>
        <Box flexDirection="row" paddingX={1}>
          {showSelectionIndicator && (
            <Box marginRight={1} minWidth={1}>
              <Text color={colors.text.primary} bold>
                {' '}
              </Text>
            </Box>
          )}
          {fields.map((field, index) => (
            <Box key={index} marginRight={index < fields.length - 1 ? 2 : 0} minWidth={field.minWidth ?? 15}>
              <Text color={field.color || colors.text.primary} bold>
                {field.header}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>

      <Box borderStyle="single" borderColor={colors.border.primary}>
        <Box flexDirection="column">
          {data.map((row, rowIndex) => (
            <Box
              key={rowIndex}
              flexDirection="row"
              paddingX={1}
            >
              {showSelectionIndicator && (
                <Box marginRight={1} minWidth={1}>
                  <Text color={rowIndex === selectedRow ? colors.text.primary : colors.text.secondary}>
                    {rowIndex === selectedRow ? <Icon icon='chevron-right'/> : ' '}
                  </Text>
                </Box>
              )}
              {fields.map((field, fieldIndex) => (
                <Box key={fieldIndex} marginRight={fieldIndex < fields.length - 1 ? 2 : 0} minWidth={field.minWidth ?? 15}>
                  <Text color={rowIndex === selectedRow ? colors.text.primary : colors.text.secondary}>
                    {typeof field.value === 'function' ? field.value(row, rowIndex, data) : String(row[field.value])}
                  </Text>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
