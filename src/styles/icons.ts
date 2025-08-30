export type TIconsType =
  'pull_request'
  | 'pull_request_closed'
  | 'pull_request_draft'
  | 'merged'
  | 'changes'
  | 'search'
  | 'repo'
  | 'ok'
  | 'error'
  | 'help'
  | 'update'
  | 'chevron-right';

export const icons: Record<TIconsType, number | number[]> = {
  'pull_request': 0xea64,
  'pull_request_closed': 0xebda,
  'pull_request_draft': 0xebdb,
  'merged': 0xeafe,
  'changes': 0xec0b,
  'search': 0xf422,
  'repo': 0xea62,
  'ok': 0xf058,
  'error': 0xea87,
  'help': [0xdb80, 0xded6],
  'update': [0xdb81, 0xdeb0],
  'chevron-right': 0xf460,
};

export const getIcon = (icon: TIconsType) => {
  const iconCode = icons[icon];
  return Array.isArray(iconCode) ? String.fromCharCode(...iconCode) : String.fromCharCode(iconCode);
};
