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
    to: "/admin/usuarios",
    icon: User,
  },
  {
    label: "Doctores",
    to: "/admin/doctores",
    icon: Stethoscope,
  },
  {
    label: "Pacientes",
    to: "/admin/pacientes",
    icon: Users,
  },
  {
    label: "Citas",
    to: "admin/citas",
    icon: Calendar,
  },
  {
    label: "Historial",
    to: "/admin/historial",
    icon: FileText,
  },
  {
    label: "Recetas",
    to: "/admin/recetas",
    icon: FilePlus,
  },
  {
    label: "Archivos",
    to: "/admin/archivos",
    icon: Folder,
  },
  {
    label: "Bloqueos",
    to: "/admin/bloqueos",
    icon: Calendar,
  },
  {
    label: "Auditoría",
    to: "/admin/auditoria",
    icon: ShieldCheck,
  },
];
