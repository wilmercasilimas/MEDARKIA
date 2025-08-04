import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function RutaProtegidaPaciente() {
  const { token, user } = useAuthStore();

  if (!token || user === null) return <div>Cargando...</div>;

  if (user?.rol?.toLowerCase?.() !== "paciente")
    return <Navigate to="/no-autorizado" replace />;

  return <Outlet />;
}
