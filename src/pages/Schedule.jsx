import { useEffect, useState } from "react";

import Button from "../components/Button";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import ScheduleCard from "../components/ScheduleCard";
import ScheduleForm from "../components/ScheduleForm";

function Schedule() {
  const [schedules, setSchedules] = useState(() => {
    const saved = localStorage.getItem("schedules");
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "schedules",
      JSON.stringify(schedules)
    );
  }, [schedules]);

  function handleCreate(schedule) {
    setSchedules((prev) => [...prev, schedule]);
    setIsModalOpen(false);
  }

  function handleUpdate(updatedSchedule) {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === updatedSchedule.id
          ? updatedSchedule
          : schedule
      )
    );

    setEditingSchedule(null);
    setIsModalOpen(false);
  }

  function handleDelete(id) {
    setSchedules((prev) =>
      prev.filter((schedule) => schedule.id !== id)
    );
  }

  function openCreateModal() {
    setEditingSchedule(null);
    setIsModalOpen(true);
  }

  function openEditModal(schedule) {
    setEditingSchedule(schedule);
    setIsModalOpen(true);
  }

  function closeModal() {
    setEditingSchedule(null);
    setIsModalOpen(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Schedule"
        subtitle="Manage your recurring schedules."
      >
        <Button onClick={openCreateModal}>
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
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        title={
          editingSchedule
            ? "Edit Schedule"
            : "Create Schedule"
        }
        onClose={closeModal}
      >
        <ScheduleForm
          initialData={editingSchedule}
          onSubmit={
            editingSchedule
              ? handleUpdate
              : handleCreate
          }
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}

export default Schedule;