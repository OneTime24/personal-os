import { useEffect, useState } from "react";
import Button from "./Button";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DEFAULT_FORM = {
  title: "",
  category: "Study",
  startTime: "",
  endTime: "",
  repeatDays: [],
};

function ScheduleForm({
  initialData = null,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState(DEFAULT_FORM);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(DEFAULT_FORM);
    }
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function toggleDay(day) {
    setFormData((prev) => ({
      ...prev,
      repeatDays: prev.repeatDays.includes(day)
        ? prev.repeatDays.filter((d) => d !== day)
        : [...prev.repeatDays, day],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.startTime ||
      !formData.endTime ||
      formData.repeatDays.length === 0
    ) {
      alert("Please complete all required fields.");
      return;
    }

    onSubmit({
      ...formData,
      id: initialData?.id ?? crypto.randomUUID(),
    });

    if (!initialData) {
      setFormData(DEFAULT_FORM);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="block mb-2 font-medium">
          Task Name
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Category
        </label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        >
          <option>Study</option>
          <option>Coding</option>
          <option>Health</option>
          <option>Religion</option>
          <option>Reading</option>
          <option>Personal</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">
            Start Time
          </label>

          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            End Time
          </label>

          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Repeat Days
        </label>

        <div className="flex flex-wrap gap-2">
          {DAYS.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={`px-4 py-2 rounded-xl border transition ${
                formData.repeatDays.includes(day)
                  ? "bg-blue-600 text-white border-blue-600"
                  : ""
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}

        <Button type="submit">
          {initialData ? "Update Schedule" : "Save Schedule"}
        </Button>
      </div>
    </form>
  );
}

export default ScheduleForm;