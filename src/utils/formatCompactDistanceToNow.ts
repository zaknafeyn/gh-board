import {
  differenceInSeconds,
  formatDistanceToNow,
  formatDistanceToNowStrict,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';

export const formatCompactDistanceToNow = (date: Date): string => {
  let diff = differenceInSeconds(new Date(), date);

  const units = [
    { label: 'y', seconds: 60 * 60 * 24 * 365 },
    { label: 'mo', seconds: 60 * 60 * 24 * 30 },
    { label: 'd', seconds: 60 * 60 * 24 },
    { label: 'h', seconds: 60 * 60 },
    { label: 'm', seconds: 60 },
    { label: 's', seconds: 1 },
  ];

  const parts: string[] = [];

  for (const unit of units) {
    if (diff >= unit.seconds) {
      const value = Math.floor(diff / unit.seconds);
      diff -= value * unit.seconds;
      parts.push(`${value}${unit.label}`);
    }
    if (parts.length === 2) break; // keep it short: up to 2 units
  }

  return parts.length > 0 ? parts.join(' ') + ' ago' : 'just now';
};

export const formatCompactDistanceToNowStandard = (
  date: Date,
  addSuffix = true,
): string => {
  return formatDistanceToNow(date, { addSuffix });
};

export const compactRelative = (date: Date, suffix = '') => {
  const now = new Date();

  const years = differenceInYears(now, date);
  if (years >= 1) return `${suffix}${years}y`;

  const months = differenceInMonths(now, date);
  if (months >= 1) return `${suffix}${months}mo`;

  const weeks = differenceInWeeks(now, date);
  if (weeks >= 1) return `${suffix}${weeks}w`;

  const days = differenceInDays(now, date);
  if (days >= 1) return `${suffix}${days}d`;

  // fallback to hours/minutes if less than a day
  const diffText = formatDistanceToNowStrict(date, { unit: 'hour' });
  const [value, unit] = diffText.split(' ');
  if (unit.startsWith('hour')) return `${suffix}${value}h`;

  const diffTextMin = formatDistanceToNowStrict(date, { unit: 'minute' });
  const [val] = diffTextMin.split(' ');
  return `${suffix}${val}m`;
};
