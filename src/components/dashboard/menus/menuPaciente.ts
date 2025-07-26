// src/components/dashboard/menus/menuPaciente.ts
import {
  LayoutDashboard,
  FileText,
  FilePlus,
  Folder,
  Calendar,
} from "lucide-react";

export const menuPaciente = [
  {
    label: "Dashboard",
    to: "/dashboard/paciente",
    icon: LayoutDashboard,
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
    label: "Citas",
    to: "/citas",
    icon: Calendar,
  },
];
