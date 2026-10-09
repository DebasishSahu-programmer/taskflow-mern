import { useEffect, useState } from "react";

const emptyTask = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
};

export default function TaskForm({
  initialTask,
  onSave,
  onCancel,
  saving = false,
}) {
  const [form, setForm] = useState(emptyTask);

  useEffect(() => {
    if (!initialTask) {
      setForm(emptyTask);
      return;
    }

    setForm({
      title: initialTask.title || "",
      description: initialTask.description || "",
      status: initialTask.status || "todo",
      priority: initialTask.priority || "medium",
      dueDate: initialTask.dueDate
        ? new Date(initialTask.dueDate).toISOString().slice(0, 10)
        : "",
    });
  }, [initialTask]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const saved = await onSave({
      ...form,
      title: form.title.trim(),
      dueDate: form.dueDate || null,
    });

    if (saved && !initialTask) {
      setForm(emptyTask);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4"
    >
      <label className="grid gap-1 text-sm font-medium">
        Task title
        <input
          required
          maxLength={120}
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="What needs to get done?"
          className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
        />
      </label>

      <label className="grid gap-1 text-sm font-medium">
        Description
        <textarea
          maxLength={1000}
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="grid gap-1 text-sm font-medium">
          Status
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="todo">To do</option>
            <option value="in_progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </label>

        <label className="grid gap-1 text-sm font-medium">
          Priority
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label className="grid gap-1 text-sm font-medium">
          Due date
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : initialTask ? "Save changes" : "Add task"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-4 py-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}