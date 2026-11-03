const TIME_ZONE = 'America/New_York';

export function formatDate(date: string | Date) {
  const iso =
    typeof date === 'string'
      ? date.slice(0, 10)
      : date.toISOString().slice(0, 10);
  const [year, month, day] = iso.split('-').map(Number);
  const instant = new Date(Date.UTC(year, month - 1, day, 12));

  return instant.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: TIME_ZONE,
  });
}

export function dateValue(date: string | Date) {
  const iso =
    typeof date === 'string'
      ? date.slice(0, 10)
      : date.toISOString().slice(0, 10);
  return iso;
}
