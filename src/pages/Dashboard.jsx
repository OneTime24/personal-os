import { useEffect, useState } from "react";

import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import TaskCard from "../components/TaskCard";

import {
  getCompletedCount,
  getProgress,
  getTodaysSchedules,
} from "../utils/dashboard";

import {
  getGreeting,
  getTodayDate,
  getTodayKey,
} from "../utils/date";

function Dashboard() {
  const [schedules, setSchedules] = useState([]);

  const greeting = getGreeting();
  const todayDate = getTodayDate();
  const todayKey = getTodayKey();

  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem("dailyCompletions");

    if (!saved) return {};

    const all = JSON.parse(saved);

    return all[todayKey] || {};
  });

  useEffect(() => {
    const saved = localStorage.getItem("schedules");

    if (saved) {
      setSchedules(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const all = JSON.parse(
      localStorage.getItem("dailyCompletions") || "{}"
    );

    all[todayKey] = completedTasks;

    localStorage.setItem(
      "dailyCompletions",
      JSON.stringify(all)
    );
  }, [completedTasks, todayKey]);

  const todaysSchedules = getTodaysSchedules(schedules);

  const completedCount = getCompletedCount(
    todaysSchedules,
    completedTasks
  );

  const progress = getProgress(
    todaysSchedules,
    completedTasks
  );

  function toggleTask(id) {
    setCompletedTasks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={greeting}
        subtitle={todayDate}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Schedules"
          value={schedules.length}
        />

        <StatCard
          title="Today's Tasks"
          value={todaysSchedules.length}
        />

        <StatCard
          title="Completed"
          value={`${progress}%`}
        />
      </div>

      <Card>
        <h2 className="text-xl font-semibold">
          Today's Progress
        </h2>

        <div className="w-full h-3 rounded-full bg-slate-200 mt-5">
          <div
            className="h-3 rounded-full bg-blue-600 transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="mt-3 text-slate-500">
          {completedCount} of {todaysSchedules.length} completed
        </p>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-5">
          Today's Tasks
        </h2>

        {todaysSchedules.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            🎉 Nothing scheduled for today.
          </div>
        ) : (
          <div className="space-y-4">
            {todaysSchedules.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                completed={completedTasks[task.id] || false}
                onToggle={toggleTask}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default Dashboard;