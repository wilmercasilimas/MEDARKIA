import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import LoginLayout from "@/layouts/LoginLayout";
import ErrorPage from "@/pages/ErrorPage";
import App from "@/pages/App";
import LoginPage from "@/pages/LoginPage";

// Protecciones por rol
import RutaProtegidaAdmin from "@/router/protegidas/RutaProtegidaAdmin";
import RutaProtegidaDoctor from "@/router/protegidas/RutaProtegidaDoctor";
import RutaProtegidaAsistente from "@/router/protegidas/RutaProtegidaAsistente";
import RutaProtegidaPaciente from "@/router/protegidas/RutaProtegidaPaciente";

// Módulos (rutas privadas)
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
  // Página pública principal
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },

  // Página de login
  {
    path: "/login",
    element: <LoginLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <LoginPage /> }],
  },

  // Layout protegido con rutas internas por rol
  {
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      // ADMIN
      {
        element: <RutaProtegidaAdmin />,
        children: [
          { path: "usuarios", element: <UsuariosPage /> },
          { path: "doctores", element: <DoctoresPage /> },
          { path: "pacientes", element: <PacientesPage /> },
          { path: "auditoria", element: <AuditoriaPage /> },
          { path: "dashboard/admin", element: <AdminDashboardPage /> },
        ],
      },

      // DOCTOR
      {
        element: <RutaProtegidaDoctor />,
        children: [
          { path: "citas", element: <CitasPage /> },
          { path: "historial", element: <HistorialPage /> },
          { path: "recetas", element: <RecetasPage /> },
          { path: "bloqueos", element: <BloqueosPage /> },
          { path: "dashboard/doctor", element: <DoctorDashboardPage /> },
        ],
      },

      // ASISTENTE
      {
        element: <RutaProtegidaAsistente />,
        children: [
          { path: "pacientes", element: <PacientesPage /> },
          { path: "citas", element: <CitasPage /> },
          { path: "dashboard/asistente", element: <AsistenteDashboardPage /> },
        ],
      },

      // PACIENTE
      {
        element: <RutaProtegidaPaciente />,
        children: [
          { path: "historial", element: <HistorialPage /> },
          { path: "recetas", element: <RecetasPage /> },
          { path: "archivos", element: <ArchivosPage /> },
          { path: "citas", element: <CitasPage /> },
          { path: "dashboard/paciente", element: <PacienteDashboardPage /> },
        ],
      },
    ],
  },
]);
