import { differenceInSeconds } from 'date-fns';
import { formatDistanceToNow } from 'date-fns';

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

export const formatCompactDistanceToNowStandard = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true });
};
