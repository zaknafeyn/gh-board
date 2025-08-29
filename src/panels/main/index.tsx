import { useState } from 'react';
import { Board } from '../../components/Board';
import { useInput } from 'ink';
import { useMode } from '../../contexts/ModeContext';

export const MainPanel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { mode } = useMode();

  useInput((_, key) => {
    if (mode !== 'command') return;

    switch (true) {
    case key.leftArrow:
      setSelectedIndex(prev => Math.max(0, prev - 1));
      break;
    case key.rightArrow:
      setSelectedIndex(prev => prev + 1);
      break;
    }
  });

  return (
    <Board selectedIndex={selectedIndex} />
  );
};
