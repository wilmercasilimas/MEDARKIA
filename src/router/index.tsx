import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import LoginLayout from "@/layouts/LoginLayout";
import ErrorPage from "@/pages/ErrorPage";
import App from "@/pages/App";
import LoginPage from "@/pages/LoginPage";
import ProtectedRoute from "@/router/ProtectedRoute";

// Módulos (rutas privadas - protegidas)
import UsuariosPage from "@/pages/usuarios/UsuariosPage";
import DoctoresPage from "@/pages/doctores/DoctoresPage";
import PacientesPage from "@/pages/pacientes/PacientesPage";
import CitasPage from "@/pages/citas/CitasPage";
import HistorialPage from "@/pages/historiales/HistorialesPage";
import RecetasPage from "@/pages/recetas/RecetasPage";
import ArchivosPage from "@/pages/archivos/ArchivosPage";
import BloqueosPage from "@/pages/bloqueos/BloqueosPage";
import AuditoriaPage from "@/pages/auditoria/AuditoriaPage";
import AdminDashboardPage from "@/pages/dashboard/AdminDashboardPage";
import DoctorDashboardPage from "@/pages/dashboard/DoctorDashboardPage";
import AsistenteDashboardPage from "@/pages/dashboard/AsistenteDashboardPage";
import PacienteDashboardPage from "@/pages/dashboard/PacienteDashboardPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    element: <ProtectedRoute />, // 🔒 Protege todo lo que está debajo
    children: [
      {
        path: "/",
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <App /> },
          { path: "usuarios", element: <UsuariosPage /> },
          { path: "doctores", element: <DoctoresPage /> },
          { path: "pacientes", element: <PacientesPage /> },
          { path: "citas", element: <CitasPage /> },
          { path: "historial", element: <HistorialPage /> },
          { path: "recetas", element: <RecetasPage /> },
          { path: "archivos", element: <ArchivosPage /> },
          { path: "bloqueos", element: <BloqueosPage /> },
          { path: "auditoria", element: <AuditoriaPage /> },
          { path: "dashboard/admin", element: <AdminDashboardPage /> },
          { path: "dashboard/doctor", element: <DoctorDashboardPage /> },
          { path: "dashboard/asistente", element: <AsistenteDashboardPage /> },
          { path: "dashboard/paciente", element: <PacienteDashboardPage /> },
        ],
      },
    ],
  },
]);
