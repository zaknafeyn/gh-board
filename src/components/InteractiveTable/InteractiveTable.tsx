import React, { useState, useEffect } from 'react';
import { Text, Box, useInput } from 'ink';
import { colors } from '../../styles/theme';
import { LoadingSpinner } from '../LoadingSpinner';
import { useLogger } from '../../hooks/useLogger';

export interface TableField {
  fieldName: string;
  header: string;
  color?: string;
}

export interface InteractiveTableProps {
  fields: TableField[];
  data: Array<Record<string, any>>;
  isLoading?: boolean;
}

export const InteractiveTable: React.FC<InteractiveTableProps> = ({
  fields,
  data,
  isLoading = false,
}) => {
  const [selectedRow, setSelectedRow] = useState(0);
  const logger = useLogger();

  useInput((_, key) => {
    if (isLoading || data.length === 0) return;

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
          {fields.map((field, index) => (
            <Box key={field.fieldName} marginRight={index < fields.length - 1 ? 2 : 0} minWidth={15}>
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
              {fields.map((field, fieldIndex) => (
                <Box key={field.fieldName} marginRight={fieldIndex < fields.length - 1 ? 2 : 0} minWidth={15}>
                  <Text
                    color={rowIndex === selectedRow ? colors.text.primary : colors.text.secondary}
                    inverse={rowIndex === selectedRow}
                  >
                    {String(row[field.fieldName] || '')}
                  </Text>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      <Box marginTop={1}>
        <Text color={colors.text.faint}>
          Use ↑/↓ to navigate, Enter to log selected row
        </Text>
      </Box>
    </Box>
  );
};
