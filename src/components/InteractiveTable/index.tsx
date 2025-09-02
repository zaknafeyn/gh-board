import { Box, DOMElement, measureElement, Text, useInput } from 'ink';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useCurrentRow } from '../../contexts/CurrentRowContext';
import { useMode } from '../../contexts/ModeContext';
import { columnTextFormatter } from '../../formatters/columnTextFormatter';
import { useLogger } from '../../hooks/useLogger';
import { colors } from '../../styles/theme';
import { Icon } from '../Icon';
import { LoadingSpinner } from '../LoadingSpinner';

const DEFAULT_COLUMN_WIDTH = 10;
export interface TableField<TRow = Record<string, unknown>> {
  value: keyof TRow | ((row: TRow, index: number, data: TRow[]) => string | ReactNode);
  header: string;
  color?: string;
  width?: number;
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | undefined;
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
  const { setCurrentRow } = useCurrentRow<TRow>();

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

  // Update current row context when selection changes
  useEffect(() => {
    if (data.length > 0 && selectedRow >= 0 && selectedRow < data.length) {
      setCurrentRow(data[selectedRow]);
    } else {
      setCurrentRow(null);
    }
  }, [selectedRow, data, setCurrentRow]);

  const ref = useRef<DOMElement>(null);
  if (ref.current)
  {
    logger.debug(JSON.stringify(measureElement(ref.current)));
  }

  if (isLoading) {
    return <LoadingSpinner text="Loading table data..." />;
  }

  if (data.length === 0) {
    return (
      <Box ref={ref} flexDirection="column">
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
            <Box
              key={index}
              marginRight={index < fields.length - 1 ? 1 : 0}
              minWidth={field.width ?? DEFAULT_COLUMN_WIDTH}
              justifyContent='center'
            >
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
                <Box
                  key={fieldIndex}
                  marginRight={fieldIndex < fields.length - 1 ? 1 : 0}
                  minWidth={field.width ?? DEFAULT_COLUMN_WIDTH}
                  justifyContent={field.justifyContent}
                >
                  <Text color={rowIndex === selectedRow ? colors.text.primary : colors.text.secondary}>
                    {columnTextFormatter(
                      typeof field.value === 'function' ? field.value(row, rowIndex, data) : String(row[field.value]),
                      field.width || DEFAULT_COLUMN_WIDTH,
                    )}
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
