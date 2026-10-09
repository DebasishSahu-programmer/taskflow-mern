import { Link, Navigate } from "react-router";
import { useSelector } from "react-redux";

export default function HomePage() {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated,
  );

  if (isAuthenticated) {
    return <Navigate to="/tasks" replace />;
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4">
      <section className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm sm:p-12">
        <p className="font-semibold text-indigo-700">TaskFlow</p>

        <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
          Make space for what matters.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-slate-600">
          Organize your tasks, track your progress, and stay focused.
          Please log in or create an account to get started.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/login"
            className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
          >
            Sign up
          </Link>
        </div>
      </section>
    </main>
  );
}