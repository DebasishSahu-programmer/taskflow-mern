import { useState } from "react";
import TaskForm from "./TaskForm.jsx";

const statusLabels = {
  todo: "To do",
  in_progress: "In progress",
  done: "Done",
};

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSave(taskData) {
    setBusy(true);

    try {
      await onUpdate(task._id, taskData);
      setEditing(false);
      return true;
    } finally {
      setBusy(false);
    }
  }

  async function handleStatusChange(event) {
    setBusy(true);

    try {
      await onUpdate(task._id, { status: event.target.value });
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Delete "${task.title}"?`)) return;

    setBusy(true);
    try {
      await onDelete(task._id);
    } finally {
      setBusy(false);
    }
  }

  if (editing) {
    return (
      <TaskForm
        initialTask={task}
        onSave={handleSave}
        onCancel={() => setEditing(false)}
        saving={busy}
      />
    );
  }

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3
            className={`font-semibold ${
              task.status === "done" ? "text-slate-400 line-through" : ""
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">
              {task.description}
            </p>
          )}
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs capitalize text-slate-700">
          {task.priority} priority
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <label className="sr-only" htmlFor={`status-${task._id}`}>
          Task status
        </label>
        <select
          id={`status-${task._id}`}
          value={task.status}
          onChange={handleStatusChange}
          disabled={busy}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          {Object.entries(statusLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        {task.dueDate && (
          <span className="text-sm text-slate-500">
            Due {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}

        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={() => setEditing(true)}
            disabled={busy}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}