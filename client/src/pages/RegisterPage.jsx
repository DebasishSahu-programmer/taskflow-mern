import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice.js";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth,
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isAuthenticated) return <Navigate to="/" replace />;

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      navigate("/", { replace: true });
    } catch {
      // The rejected thunk stores and displays the error from the API.
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="grid w-full max-w-md gap-4 rounded-2xl bg-white p-8 shadow-sm"
      >
        <div>
          <p className="font-bold text-indigo-700">TaskFlow</p>
          <h1 className="mt-2 text-2xl font-bold">Create your account</h1>
        </div>

        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}

        <label className="grid gap-1 text-sm font-medium">
          Name
          <input
            autoComplete="name"
            required
            maxLength={80}
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>

        <label className="grid gap-1 text-sm font-medium">
          Email
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>

        <label className="grid gap-1 text-sm font-medium">
          Password
          <input
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        <p className="text-sm text-slate-600">
          Already registered? <Link className="text-indigo-700 underline" to="/login">Log in</Link>
        </p>
      </form>
    </main>
  );
}