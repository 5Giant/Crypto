export function percentDiff(a, b) {
  return Math.round(10000 * Math.abs((a - b) / ((a + b) / 2))) / 100;
}

export function capitalize(str) {
  return str[0].toUpperCase() + str.substr(1);
}

export function dateFormat(timestamp) {
  let date = new Date(timestamp);
  const formatted = {
    year: date.toLocaleDateString("en-GB", {
      year: "numeric",
    }),
    month: date.toLocaleDateString("en-GB", {
      month: "short",
    }),
    day: date.toLocaleDateString("en-GB", {
      day: "numeric",
    }),
    time: date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  };
  return formatted;
}
