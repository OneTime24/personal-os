import { timeToMinutes } from "./date";

export function calculateCategoryStats(schedules) {
  const stats = {};

  schedules.forEach((schedule) => {
    stats[schedule.category] =
      (stats[schedule.category] || 0) + 1;
  });

  return stats;
}

export function calculateScheduledMinutes(tasks) {
  let total = 0;

  tasks.forEach((task) => {
    total +=
      timeToMinutes(task.endTime) -
      timeToMinutes(task.startTime);
  });

  return total;
}

export function formatMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours}h ${mins}m`;
}

export function calculateStreak() {
  return 0;
}