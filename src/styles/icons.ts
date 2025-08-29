export type TIconsType =
  'pull_request'
  | 'pull_request_closed'
  | 'pull_request_draft'
  | 'changes'
  | 'search'
  | 'repo'
  | 'ok'
  | 'error';

export const icons: Record<TIconsType, number> = {
  'pull_request': 0xea64,
  'pull_request_closed': 0xebda,
  'pull_request_draft': 0xebdb,
  'changes': 0xec0b,
  'search': 0xf422,
  'repo': 0xea62,
  'ok': 0xf058,
  'error': 0xea87,
};

export const getIcon = (icon: TIconsType) => String.fromCharCode(icons[icon]);
