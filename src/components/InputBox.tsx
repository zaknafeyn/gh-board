import { FC, useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { useLogger } from '../hooks/useLogger';
import { useMode } from '../contexts/ModeContext';

interface InputBoxProps {
  initialValue?: string;
  isFocused?: boolean;
}

export const InputBox: FC<InputBoxProps> = ({ initialValue = '', isFocused = false }) => {
  const [value, setValue] = useState(initialValue);
  const { mode, switchToCommand } = useMode();

  const logger = useLogger();

  useInput((input, key) => {
    if (mode !== 'edit' || !isFocused) return;

    logger.debug(`Input: ${input}, key: ${JSON.stringify(key)}`);
    switch (true) {
    case key.return:
      logger.debug(`You typed: ${value}`);
      switchToCommand();
      break;
    case key.backspace || key.delete:
      logger.debug('Backspace or delete pressed');
      setValue(value.slice(0, -1));
      break;
    default:
      logger.debug(`Input: ${input}`);
      setValue(value + input);
    }
  });

  return (
    <Box display='flex' width='100%' borderStyle='single'>
      <Text>{value}</Text>
    </Box>);
};
