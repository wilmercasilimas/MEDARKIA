// src/router/protegidas/RutaProtegidaDoctor.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function RutaProtegidaDoctor() {
  const { token, user } = useAuthStore();

  if (!token || user === null) {
    return <div className="p-6 text-sm">Cargando...</div>;
  }

  if (user?.rol !== "doctor") {
    return <Navigate to="/no-autorizado" replace />;
  }

  return <Outlet />;
}
