import { useState } from "react";

import Button from "../components/Button";
import Card from "../components/Card";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Good Morning 👋"
        subtitle="Welcome back to PersonalOS."
      >
        <Button onClick={() => setOpen(true)}>
          Add Schedule
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard title="Tasks Today" value="0" />
        <StatCard title="Completion" value="0%" />
      </div>

      <Card>
        <h2 className="text-xl font-semibold">
          Today's Progress
        </h2>

        <div className="w-full bg-slate-200 rounded-full h-3 mt-6">
          <div className="bg-blue-600 h-3 rounded-full w-0"></div>
        </div>

        <p className="text-slate-500 mt-4">
          No tasks yet.
        </p>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold">
          Upcoming Tasks
        </h2>

        <p className="text-slate-500 mt-4">
          No upcoming tasks.
        </p>
      </Card>

      <Modal
        isOpen={open}
        title="Create Schedule"
        onClose={() => setOpen(false)}
      >
        <p className="text-slate-500">
          Form coming in the next milestone...
        </p>
      </Modal>
    </div>
  );
}

export default Dashboard;