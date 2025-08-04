// src/components/dashboard/menus/menuDoctor.ts
import {
  LayoutDashboard,
  Calendar,
  FileText,
  FilePlus,
  CalendarX,
} from "lucide-react";

export const menuDoctor = [
  {
    label: "Dashboard",
    to: "/dashboard/doctor",
    icon: LayoutDashboard,
  },
  {
    label: "Mis Citas",
    to: "/doctor/citas", // ✅ Ruta absoluta correcta
    icon: Calendar,
  },
  {
    label: "Historial",
    to: "/doctor/historial", // ✅
    icon: FileText,
  },
  {
    label: "Recetas",
    to: "/doctor/recetas", // ✅
    icon: FilePlus,
  },
  {
    label: "Bloqueos",
    to: "/doctor/bloqueos", // ✅
    icon: CalendarX,
  },
];
