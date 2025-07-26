import {
  User,
  Stethoscope,
  Users,
  Calendar,
  FileText,
  FilePlus,
  Folder,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";

export const menuAdmin = [
  {
    label: "Dashboard",
    to: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Usuarios",
    to: "/usuarios",
    icon: User,
  },
  {
    label: "Doctores",
    to: "/doctores",
    icon: Stethoscope,
  },
  {
    label: "Pacientes",
    to: "/pacientes",
    icon: Users,
  },
  {
    label: "Citas",
    to: "/citas",
    icon: Calendar,
  },
  {
    label: "Historial",
    to: "/historial",
    icon: FileText,
  },
  {
    label: "Recetas",
    to: "/recetas",
    icon: FilePlus,
  },
  {
    label: "Archivos",
    to: "/archivos",
    icon: Folder,
  },
  {
    label: "Bloqueos",
    to: "/bloqueos",
    icon: Calendar,
  },
  {
    label: "Auditoría",
    to: "/auditoria",
    icon: ShieldCheck,
  },
];
