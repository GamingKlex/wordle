export function formatTime(time) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;
  let formatted = "";
  if (hours > 0) formatted += hours + " hrs, ";
  if (minutes > 0) formatted += minutes + " mins and ";
  formatted += seconds + " secs";
  return formatted;
}
