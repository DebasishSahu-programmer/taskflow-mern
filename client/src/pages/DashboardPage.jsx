import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar.jsx";
import TaskForm from "../components/tasks/TaskForm.jsx";
import TaskList from "../components/tasks/TaskList.jsx";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../features/tasks/taskSlice.js";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [statusFilter, setStatusFilter] = useState("all");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const visibleTasks = useMemo(
    () =>
      statusFilter === "all"
        ? tasks
        : tasks.filter((task) => task.status === statusFilter),
    [tasks, statusFilter],
  );

  async function handleCreate(taskData) {
    setSaving(true);
    try {
      await dispatch(createTask(taskData)).unwrap();
      return true;
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(taskId, taskData) {
    await dispatch(updateTask({ taskId, taskData })).unwrap();
  }

  async function handleDelete(taskId) {
    await dispatch(deleteTask(taskId)).unwrap();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto grid max-w-4xl gap-6 px-4 py-8">
        <section>
          <h1 className="text-3xl font-bold text-slate-900">Your tasks</h1>
          <p className="mt-1 text-slate-600">
            Keep track of what you need to get done.
          </p>
        </section>

        <section className="grid gap-3">
          <h2 className="text-lg font-semibold">Add a task</h2>
          <TaskForm onSave={handleCreate} saving={saving} />
        </section>

        <section className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Task list</h2>
            <label className="flex items-center gap-2 text-sm">
              Filter
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2"
              >
                <option value="all">All statuses</option>
                <option value="todo">To do</option>
                <option value="in_progress">In progress</option>
                <option value="done">Done</option>
              </select>
            </label>
          </div>

          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          {loading ? (
            <p className="text-slate-600">Loading tasks...</p>
          ) : (
            <TaskList
              tasks={visibleTasks}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  );
}