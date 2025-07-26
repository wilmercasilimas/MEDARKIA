import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function RutaProtegidaDoctor() {
  const { token, user } = useAuthStore();

  if (!token) return <Navigate to="/login" replace />;
  if (user?.rol !== "doctor") return <Navigate to="/no-autorizado" replace />;

  return <Outlet />;
}
