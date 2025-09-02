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
  | 'chevron-right'
  | 'octocat'
  | 'verified'
  | 'ellipsis'
  | 'created_at'
  | 'updated_at'
  | 'minus_plus';

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
  'octocat': 0xeb27,
  'verified': 0xeb77,
  'ellipsis': 0x2026,
  'created_at': [0xdb86,0xdee3],
  'updated_at': [0xdb86, 0xded3],
  'minus_plus': [0xdb82,0xdd92],
};

export const getIcon = (icon: TIconsType) => {
  const iconCode = icons[icon];
  return Array.isArray(iconCode) ? String.fromCharCode(...iconCode) : String.fromCharCode(iconCode);
};
