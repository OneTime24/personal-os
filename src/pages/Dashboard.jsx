import { useEffect, useMemo, useState } from "react";

import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

function Dashboard() {
  const [schedules, setSchedules] = useState([]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
  });

  const todayKey = new Date().toISOString().split("T")[0];

  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem("dailyCompletions");

    if (!saved) return {};

    const allCompletions = JSON.parse(saved);

    return allCompletions[todayKey] || {};
  });

  useEffect(() => {
    const savedSchedules = localStorage.getItem("schedules");

    if (savedSchedules) {
      setSchedules(JSON.parse(savedSchedules));
    }
  }, []);

  useEffect(() => {
    const allCompletions = JSON.parse(
      localStorage.getItem("dailyCompletions") || "{}"
    );

    allCompletions[todayKey] = completedTasks;

    localStorage.setItem(
      "dailyCompletions",
      JSON.stringify(allCompletions)
    );
  }, [completedTasks, todayKey]);

  const todaysSchedules = schedules.filter((schedule) =>
    schedule.repeatDays.includes(today)
  );

  const completedCount = useMemo(() => {
    return todaysSchedules.filter(
      (task) => completedTasks[task.id]
    ).length;
  }, [todaysSchedules, completedTasks]);

  const progress =
    todaysSchedules.length === 0
      ? 0
      : Math.round(
          (completedCount / todaysSchedules.length) * 100
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
        title="Good Morning 👋"
        subtitle="Welcome back to PersonalOS."
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

        <div className="w-full h-3 bg-slate-200 rounded-full mt-5">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-slate-500">
          {completedCount} / {todaysSchedules.length} completed
        </p>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-5">
          Today's Tasks
        </h2>

        {todaysSchedules.length === 0 ? (
          <p className="text-slate-500">
            No tasks scheduled for today.
          </p>
        ) : (
          <div className="space-y-4">
            {todaysSchedules.map((task) => (
              <label
                key={task.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={completedTasks[task.id] || false}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5"
                />

                <div className="flex-1">
                  <h3
                    className={`font-semibold ${
                      completedTasks[task.id]
                        ? "line-through text-slate-400"
                        : ""
                    }`}
                  >
                    {task.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {task.startTime} → {task.endTime}
                  </p>
                </div>
              </label>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default Dashboard;

