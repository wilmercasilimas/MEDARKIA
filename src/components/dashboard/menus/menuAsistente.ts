// src/components/dashboard/menus/menuAsistente.ts
import {
  LayoutDashboard,
  Users,
  Calendar,
} from "lucide-react";

export const menuAsistente = [
  {
    label: "Dashboard",
    to: "/dashboard/asistente",
    icon: LayoutDashboard,
  },
  {
    label: "Pacientes",
    to: "/asistente/pacientes", // ✅ corregido
    icon: Users,
  },
  {
    label: "Citas Asistidas",
    to: "/asistente/citas", // ✅ corregido
    icon: Calendar,
  },
];
