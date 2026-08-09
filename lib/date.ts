// Explicit locale + timeZone so server-rendered and client-hydrated output
// always match, regardless of the server's or visitor's runtime locale
// (the previous bare toLocaleString()/toLocaleDateString() caused hydration
// mismatches whenever they differed).
const TIME_ZONE = "Asia/Kolkata";

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: TIME_ZONE,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: TIME_ZONE,
});

export function formatDateTime(timestamp: number): string {
  return dateTimeFormatter.format(new Date(timestamp));
}

export function formatDate(timestamp: number): string {
  return dateFormatter.format(new Date(timestamp));
}
