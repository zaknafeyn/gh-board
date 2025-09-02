import { ReactNode } from 'react';
import { getIcon } from '../styles/icons';

export const columnTextFormatter = (text: string | ReactNode, width: number) => {
  if (typeof text !== 'string') return text;

  return text.length > width
    ? text.substring(0, width - 1) + getIcon('ellipsis')
    : text;
};
