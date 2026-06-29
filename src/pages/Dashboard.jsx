import { useEffect, useState } from "react";

import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

function Dashboard() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const savedSchedules = localStorage.getItem("schedules");

    if (savedSchedules) {
      setSchedules(JSON.parse(savedSchedules));
    }
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
  weekday: "short",
});

const todaysSchedules = schedules.filter((schedule) =>
  schedule.repeatDays.includes(today)
);
  return (
    <div className="space-y-6">
      <PageHeader
        title="Good Morning 👋"
        subtitle="Welcome back to PersonalOS."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Schedules"
          value={schedules.length}
        />

        <StatCard
          title="Today's Tasks"
          value={todaysSchedules.length}
        />
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">
       Today's Tasks
        </h2>
        {todaysSchedules.length === 0 ? (
          <p className="text-slate-500">
            No tasks scheduled for today.
          </p>
        ) : (
          <div className="space-y-3">
            {todaysSchedules.map((schedule) => (
              <div
                key={schedule.id}
                className="border rounded-xl p-4"
              >
                <h3 className="font-semibold">
                  {schedule.title}
                </h3>

                <p className="text-slate-500 text-sm">
                  {schedule.startTime} → {schedule.endTime}
                </p>

                <p className="text-sm mt-2">
                  {schedule.repeatDays.join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default Dashboard;