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
    to: "/paciente/historial", // ✅
    icon: FileText,
  },
  {
    label: "Recetas",
    to: "/paciente/recetas", // ✅
    icon: FilePlus,
  },
  {
    label: "Archivos",
    to: "/paciente/archivos", // ✅
    icon: Folder,
  },
  {
    label: "Mis Citas",
    to: "/paciente/citas", // ✅
    icon: Calendar,
  },
];
