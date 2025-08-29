import React from 'react';
import { TIconsType, getIcon } from '../styles/icons';
import { Text, TextProps } from 'ink';

interface IconProps extends TextProps {
  icon: TIconsType;
}

export const Icon: React.FC<IconProps> = ({ icon, ...textStyles }) => {
  return <Text {...textStyles}>{getIcon(icon)}</Text>;
};
