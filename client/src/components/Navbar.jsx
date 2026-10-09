import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser, resetAuthState } from "../features/auth/authSlice.js";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);

    try {
      await dispatch(logoutUser()).unwrap();
    } catch {
      // Clear local auth state even if the server session has expired.
      dispatch(resetAuthState());
    } finally {
      setLoggingOut(false);
      navigate("/login", { replace: true });
    }
  }

  return (
    <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
      <a href="/" className="text-xl font-bold text-indigo-700">
        TaskFlow
      </a>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">
          {user?.name || "Your tasks"}
        </span>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100 disabled:opacity-60"
        >
          {loggingOut ? "Logging out..." : "Log out"}
        </button>
      </div>
    </header>
  );
}