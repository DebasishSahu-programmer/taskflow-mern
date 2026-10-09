import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../features/auth/authSlice.js";

export default function AuthBootstrap({ children }) {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    dispatch(getCurrentUser()).finally(() => setReady(true));
  }, [dispatch]);

  if (!ready) {
    return <p className="p-8 text-center">Checking your session...</p>;
  }

  return children;
}