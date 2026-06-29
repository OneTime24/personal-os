import { useEffect, useState } from "react";

import Card from "../components/Card";
import PageHeader from "../components/PageHeader";

import {
  calculateCategoryStats,
  calculateScheduledMinutes,
  formatMinutes,
  calculateStreak,
  getWeeklyStats,
} from "../utils/analytics";

import {
  getCompletedCount,
  getProgress,
  getTodaysSchedules,
} from "../utils/dashboard";

function Analytics() {
  const [schedules, setSchedules] = useState([]);
  const [completedTasks, setCompletedTasks] = useState({});

  useEffect(() => {
    const savedSchedules = JSON.parse(
      localStorage.getItem("schedules") || "[]"
    );

    const todayKey = new Date().toISOString().split("T")[0];

    const completions = JSON.parse(
      localStorage.getItem("dailyCompletions") || "{}"
    );

    setSchedules(savedSchedules);
    setCompletedTasks(completions[todayKey] || {});
  }, []);

  const todaysSchedules = getTodaysSchedules(schedules);

  const completed = getCompletedCount(
    todaysSchedules,
    completedTasks
  );

  const progress = getProgress(
    todaysSchedules,
    completedTasks
  );

  const totalMinutes =
    calculateScheduledMinutes(todaysSchedules);

  const categoryStats =
    calculateCategoryStats(schedules);

  const streak = calculateStreak();

  const weeklyStats = getWeeklyStats();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        subtitle="Track your productivity."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h2 className="text-lg font-semibold">
            🔥 Current Streak
          </h2>

          <p className="text-4xl font-bold mt-3">
            {streak}
          </p>

          <p className="text-slate-500">
            Days
          </p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">
            ✅ Completion
          </h2>

          <p className="text-4xl font-bold mt-3">
            {progress}%
          </p>

          <p className="text-slate-500">
            {completed} / {todaysSchedules.length} tasks
          </p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">
            ⏰ Scheduled
          </h2>

          <p className="text-4xl font-bold mt-3">
            {formatMinutes(totalMinutes)}
          </p>

          <p className="text-slate-500">
            Today
          </p>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-5">
          📚 Categories
        </h2>

        <div className="space-y-3">
          {Object.entries(categoryStats).map(
            ([category, count]) => (
              <div
                key={category}
                className="flex justify-between border-b pb-2"
              >
                <span>{category}</span>

                <span className="font-semibold">
                  {count}
                </span>
              </div>
            )
          )}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-5">
          📅 Last 7 Days
        </h2>

        <div className="space-y-4">
          {weeklyStats.map((day) => (
            <div key={day.day}>
              <div className="flex justify-between mb-1">
                <span>{day.day}</span>
                <span>{day.progress}%</span>
              </div>

              <div className="w-full h-2 bg-slate-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{
                    width: `${day.progress}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Analytics;