import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function RutaProtegidaAdmin() {
  const { token, user } = useAuthStore();

  if (!token) return <Navigate to="/login" replace />;
  if (user?.rol !== "admin") return <Navigate to="/no-autorizado" replace />;

  return <Outlet />;
}
