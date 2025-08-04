// src/router/index.ts
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import LoginLayout from "@/layouts/LoginLayout";
import ErrorPage from "@/pages/ErrorPage";
import App from "@/pages/App";
import LoginPage from "@/pages/LoginPage";
import NoAutorizadoPage from "@/pages/NoAutorizadoPage";

// Protecciones por rol
import RutaProtegidaAdmin from "@/router/protegidas/RutaProtegidaAdmin";
import RutaProtegidaDoctor from "@/router/protegidas/RutaProtegidaDoctor";
import RutaProtegidaAsistente from "@/router/protegidas/RutaProtegidaAsistente";
import RutaProtegidaPaciente from "@/router/protegidas/RutaProtegidaPaciente";

// Módulos
import UsuariosPage from "@/pages/usuarios/UsuariosPage";
import DoctoresPage from "@/pages/doctores/DoctoresPage";
import PacientesPage from "@/pages/pacientes/PacientePage";
import CitasPacientePage from "@/pages/citas/CitasPacientePage";
import CitasAdminPage from "@/pages/citas/CitasAdminPage";
import CitasDoctorPage from "@/pages/citas/CitasDoctorPage";
import CitasAsistentePage from "@/pages/citas/CitasAsistentePage";
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
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      // ADMIN
      {
        element: <RutaProtegidaAdmin />,
        children: [
          { path: "admin/usuarios", element: <UsuariosPage /> },
          { path: "admin/doctores", element: <DoctoresPage /> },
          { path: "admin/pacientes", element: <PacientesPage /> },
          { path: "admin/citas", element: <CitasAdminPage /> },
          { path: "admin/historial", element: <HistorialPage /> },
          { path: "admin/recetas", element: <RecetasPage /> },
          { path: "admin/archivos", element: <ArchivosPage /> },
          { path: "admin/bloqueos", element: <BloqueosPage /> },
          { path: "admin/auditoria", element: <AuditoriaPage /> },
          { path: "dashboard/admin", element: <AdminDashboardPage /> },
        ],
      },
      // DOCTOR
      {
        element: <RutaProtegidaDoctor />,
        children: [
          { path: "doctor/citas", element: <CitasDoctorPage /> },
          { path: "doctor/historial", element: <HistorialPage /> },
          { path: "doctor/recetas", element: <RecetasPage /> },
          { path: "doctor/archivos", element: <ArchivosPage /> },
          { path: "doctor/bloqueos", element: <BloqueosPage /> },
          { path: "dashboard/doctor", element: <DoctorDashboardPage /> },
        ],
      },
      // ASISTENTE
      {
        element: <RutaProtegidaAsistente />,
        children: [
          { path: "asistente/pacientes", element: <PacientesPage /> },
          { path: "asistente/citas", element: <CitasAsistentePage /> },
          { path: "dashboard/asistente", element: <AsistenteDashboardPage /> },
        ],
      },
      // PACIENTE
      {
        element: <RutaProtegidaPaciente />,
        children: [
          { path: "paciente/historial", element: <HistorialPage /> },
          { path: "paciente/recetas", element: <RecetasPage /> },
          { path: "paciente/archivos", element: <ArchivosPage /> },
          { path: "paciente/citas", element: <CitasPacientePage /> },
          { path: "dashboard/paciente", element: <PacienteDashboardPage /> },
        ],
      },
      // Ruta global para accesos no permitidos
      {
        path: "/no-autorizado",
        element: <NoAutorizadoPage />,
      },
    ],
  },
]);
