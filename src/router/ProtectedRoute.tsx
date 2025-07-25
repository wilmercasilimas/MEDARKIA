import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const location = useLocation(); // ✅ Aquí se obtiene la ubicación actual

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Solo permitir acceso a /usuarios si es admin
  if (location.pathname.startsWith("/usuarios") && user?.rol !== "admin") {
    return <Navigate to="/no-autorizado" replace />;
  }

  return <Outlet />;
}
