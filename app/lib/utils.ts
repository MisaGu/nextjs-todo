export function formatDate(date: string) {
  const now = new Date();
  const then = new Date(date);
  const diff = now.getTime() - then.getTime();
  const seconds = diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const months = days / 30;
  const years = months / 12;

  if (years >= 1) {
    return then.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } else if (months >= 1) {
    return then.toLocaleString("en-US", { month: "short", day: "numeric" });
  } else if (days >= 1) {
    return then.toLocaleString("en-US", {
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  } else if (hours >= 1) {
    return then.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });
  } else {
    return then.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });
  }
}
