import { useState } from "react";

import Button from "../components/Button";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import ScheduleForm from "../components/ScheduleForm";
import ScheduleCard from "../components/ScheduleCard";

function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function addSchedule(schedule) {
    setSchedules((prev) => [...prev, schedule]);
    setIsModalOpen(false);
  }

  function deleteSchedule(id) {
    setSchedules((prev) =>
      prev.filter((schedule) => schedule.id !== id)
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Schedule"
        subtitle="Manage your recurring schedules."
      >
        <Button onClick={() => setIsModalOpen(true)}>
          + Add Schedule
        </Button>
      </PageHeader>

      {schedules.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold">
            No schedules yet
          </h2>

          <p className="text-slate-500 mt-2">
            Click "Add Schedule" to create your first schedule.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <ScheduleCard
              key={schedule.id}
              schedule={schedule}
              onDelete={deleteSchedule}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        title="Create Schedule"
        onClose={() => setIsModalOpen(false)}
      >
        <ScheduleForm onSubmit={addSchedule} />
      </Modal>
    </div>
  );
}

export default Schedule;