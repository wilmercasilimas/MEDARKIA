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
    to: "/pacientes",
    icon: Users,
  },
  {
    label: "Citas",
    to: "/citas",
    icon: Calendar,
  },
];
