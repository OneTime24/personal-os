function TaskCard({
  task,
  completed,
  onToggle,
}) {
  return (
    <div
      className={`border rounded-2xl p-5 transition-all ${
        completed
          ? "bg-green-50 border-green-300"
          : "bg-white border-slate-200 hover:border-blue-400"
      }`}
    >
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 mt-1"
        />

        <div className="flex-1">
          <h3
            className={`text-lg font-semibold ${
              completed
                ? "line-through text-slate-400"
                : ""
            }`}
          >
            {task.title}
          </h3>

          <p className="text-slate-500 mt-1">
            {task.category}
          </p>

          <p className="text-sm text-slate-400 mt-2">
            {task.startTime} → {task.endTime}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;