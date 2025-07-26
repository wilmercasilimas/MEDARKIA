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
    label: "Bloqueos",
    to: "/bloqueos",
    icon: CalendarX,
  },
];
