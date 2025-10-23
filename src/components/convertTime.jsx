export function convertTime(time) {
  if (!time) return "";
  return new Date(time).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
