export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function formatDateTask(date?: string) {
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function formatMeetingTime(time?: string) {
  if (!time) return "N/A";

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(`1970-01-01T${time}`));
}


export function timeAgo(date: string) {
  const seconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  );

  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;

  return new Date(date).toLocaleDateString("en-GB");
}



export function formatTimeRange(start: string, end: string) {
  const format = (value: string) =>
    new Date(value).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

  const from = format(start);
  const to = format(end);

  const samePeriod = from.slice(-2) === to.slice(-2);

  return `${samePeriod ? from.slice(0, -3) : from} - ${to}`;
}