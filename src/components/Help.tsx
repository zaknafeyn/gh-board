import React from 'react';

import { Box, Text } from 'ink';
import { Icon } from './Icon';

const help = `Help:
←/→   : Navigate columns
↑/↓   : Navigate rows
o     : Open PR
h,?   : Toggle help
/     : Enter edit mode
s     : Show side panel
b,${'`'}   : Show bottom panel
r     : Reload data
q     : Quit`;

export const Help: React.FC = () => (
  <Box display='flex' padding={1}>
    <Text><Icon icon='help'/>&nbsp;{help}</Text>
  </Box>
);
