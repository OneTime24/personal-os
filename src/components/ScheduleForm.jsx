import { useState } from "react";
import Button from "./Button";

function ScheduleForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Study");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [repeatDays, setRepeatDays] = useState([]);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  function toggleDay(day) {
    if (repeatDays.includes(day)) {
      setRepeatDays(repeatDays.filter((d) => d !== day));
    } else {
      setRepeatDays([...repeatDays, day]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !title.trim() ||
      !startTime ||
      !endTime ||
      repeatDays.length === 0
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    onSubmit({
      id: crypto.randomUUID(),
      title,
      category,
      startTime,
      endTime,
      repeatDays,
    });

    // Reset form
    setTitle("");
    setCategory("Study");
    setStartTime("");
    setEndTime("");
    setRepeatDays([]);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Task Name */}
      <div>
        <label className="block mb-2 font-medium">
          Task Name
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Deep Work"
          className="w-full border rounded-xl p-3"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-2 font-medium">
          Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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

      {/* Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">
            Start Time
          </label>

          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            End Time
          </label>

          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border rounded-xl p-3"
          />
        </div>
      </div>

      {/* Repeat Days */}
      <div>
        <label className="block mb-2 font-medium">
          Repeat Days
        </label>

        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={`px-4 py-2 rounded-xl border transition ${
                repeatDays.includes(day)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <Button type="submit">
        Save Schedule
      </Button>
    </form>
  );
}

export default ScheduleForm;