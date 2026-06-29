import Button from "./Button";

function ScheduleCard({ schedule, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">
            {schedule.title}
          </h2>

          <p className="text-slate-500 mt-1">
            {schedule.category}
          </p>
        </div>

        <Button
          variant="danger"
          onClick={() => onDelete(schedule.id)}
        >
          Delete
        </Button>
      </div>

      <div className="mt-5 space-y-3">
        <p>
          <span className="font-medium">Time:</span>{" "}
          {schedule.startTime} → {schedule.endTime}
        </p>

        <div>
          <p className="font-medium mb-2">
            Repeat
          </p>

          <div className="flex flex-wrap gap-2">
            {schedule.repeatDays.map((day) => (
              <span
                key={day}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleCard;