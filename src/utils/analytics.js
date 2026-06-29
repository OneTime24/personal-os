import { timeToMinutes, getTodayKey } from "./date";

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
  const data = JSON.parse(
    localStorage.getItem("dailyCompletions") || "{}"
  );

  const dates = Object.keys(data).sort().reverse();

  let streak = 0;

  for (const date of dates) {
    const tasks = Object.values(data[date]);

    if (
      tasks.length > 0 &&
      tasks.every((completed) => completed)
    ) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function getWeeklyStats() {
  const data = JSON.parse(
    localStorage.getItem("dailyCompletions") || "{}"
  );

  const result = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date();
    day.setDate(day.getDate() - i);

    const key = day.toISOString().split("T")[0];

    const tasks = Object.values(data[key] || {});

    const progress =
      tasks.length === 0
        ? 0
        : Math.round(
            (tasks.filter(Boolean).length /
              tasks.length) *
              100
          );

    result.push({
      day: day.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      progress,
    });
  }

  return result;
}