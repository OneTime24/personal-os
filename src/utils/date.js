export function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

export function getTodayShort() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "short",
  });
}

export function getTodayDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning ☀️";
  if (hour < 18) return "Good Afternoon 🌤️";

  return "Good Evening 🌙";
}

export function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}