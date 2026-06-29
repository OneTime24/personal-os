import { getTodayShort } from "./date";

export function getTodaysSchedules(schedules) {
  const today = getTodayShort();

  return schedules.filter((schedule) =>
    schedule.repeatDays.includes(today)
  );
}

export function getCompletedCount(tasks, completedTasks) {
  return tasks.filter(
    (task) => completedTasks[task.id]
  ).length;
}

export function getProgress(tasks, completedTasks) {
  if (tasks.length === 0) return 0;

  const completed = getCompletedCount(
    tasks,
    completedTasks
  );

  return Math.round(
    (completed / tasks.length) * 100
  );
}