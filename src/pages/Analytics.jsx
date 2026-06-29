import Card from "../components/Card";
import PageHeader from "../components/PageHeader";

import {
  calculateCategoryStats,
  calculateScheduledMinutes,
  formatMinutes,
} from "../utils/analytics";

import {
  getCompletedCount,
  getProgress,
  getTodaysSchedules,
} from "../utils/dashboard";

import { useEffect, useState } from "react";

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

  const categoryStats =
    calculateCategoryStats(schedules);

  const totalMinutes =
    calculateScheduledMinutes(
      todaysSchedules
    );

  return (
    <div className="space-y-6">

      <PageHeader
        title="Analytics"
        subtitle="Your productivity overview."
      />

      <div className="grid md:grid-cols-2 gap-6">

        <Card>
          <h2 className="font-semibold text-xl mb-4">
            Today's Progress
          </h2>

          <p className="text-4xl font-bold">
            {progress}%
          </p>

          <p className="text-slate-500 mt-2">
            {completed} of {todaysSchedules.length} tasks completed
          </p>
        </Card>

        <Card>
          <h2 className="font-semibold text-xl mb-4">
            Scheduled Time
          </h2>

          <p className="text-4xl font-bold">
            {formatMinutes(totalMinutes)}
          </p>

          <p className="text-slate-500 mt-2">
            Total planned today
          </p>
        </Card>

      </div>

      <Card>

        <h2 className="font-semibold text-xl mb-5">
          Category Breakdown
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

    </div>
  );
}

export default Analytics;