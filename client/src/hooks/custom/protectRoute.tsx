import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const RequireAuth = () => {
  const { user, token } = useContext(UserContext);
  if (!user || !token) return <Navigate to="/auth" replace />;
  return <Outlet />;
};

export const RequireNoAuth = () => {
  const { user, token } = useContext(UserContext);
  if (user && token) return <Navigate to="/" replace />;
  return <Outlet />;
};
