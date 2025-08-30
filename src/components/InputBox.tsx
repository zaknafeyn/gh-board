import { FC, useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { useMode } from '../contexts/ModeContext';
import { colors } from '../styles/theme';

interface InputBoxProps {
  initialValue?: string;
  isFocused?: boolean;
  icon?: string;
}

export const InputBox: FC<InputBoxProps> = ({ initialValue = '', isFocused = false, icon }) => {
  const [value, setValue] = useState(initialValue);
  const { mode, switchToCommand } = useMode();

  const boxColor = isFocused ? colors.accent.blue : colors.border.faint;

  useInput((input, key) => {
    if (mode !== 'edit' || !isFocused) return;

    switch (true) {
    case key.return || key.escape:
      switchToCommand();
      break;
    case key.backspace || key.delete:
      setValue(value.slice(0, -1));
      break;
    default:
      setValue(value + input);
    }
  });

  return (
    <Box display='flex' width='100%' borderStyle='single' minHeight={3} borderColor={boxColor}>
      <Text>{icon}{value}</Text>
    </Box>);
};
