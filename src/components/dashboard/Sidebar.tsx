import { LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import logo from "@/assets/LogoMedarkia.png";
import { textButton } from "@/styles/buttons";
import { useState } from "react";
import { CambiarPasswordModal } from "@/components/usuarios/CambiarPasswordModal";

// Menús dinámicos por rol
import { menuAdmin } from "@/components/dashboard/menus/menuAdmin";
import { menuDoctor } from "@/components/dashboard/menus/menuDoctor";
import { menuAsistente } from "@/components/dashboard/menus/menuAsistente";
import { menuPaciente } from "@/components/dashboard/menus/menuPaciente";

type SidebarProps = {
  cerrarMenu?: () => void;
};

export default function Sidebar({ cerrarMenu }: SidebarProps) {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const usuario = useAuthStore((state) => state.user);
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleClick = () => {
    if (cerrarMenu) cerrarMenu();
  };

  const handleLogout = () => {
  logout();
  window.location.href = "/";
};


  const rol = usuario?.rol;
  const menu =
    rol === "admin"
      ? menuAdmin
      : rol === "doctor"
      ? menuDoctor
      : rol === "asistente"
      ? menuAsistente
      : menuPaciente;

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-zinc-950 shadow-md flex flex-col justify-between p-4">
      {/* Logo */}
      <div className="hidden md:flex justify-start items-center mb-6">
        <img src={logo} alt="Medarkia" className="h-20 w-auto object-contain" />
      </div>

      {/* Menú dinámico por rol */}
      <nav className="flex flex-col gap-3">
        {menu.map(({ label, to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-2 ${
              location.pathname === to
                ? "text-primary font-semibold"
                : "text-gray-700 dark:text-gray-200"
            } hover:text-primary`}
            onClick={handleClick}
          >
            <Icon size={20} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="flex flex-col items-center gap-2 mt-6">
        <button
          onClick={() => setModalAbierto(true)}
          className="text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 transition"
        >
          🔒 Cambiar contraseña
        </button>

        <button
          onClick={handleLogout}
          className={`flex items-center gap-2 ${textButton}`}
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>

        <CambiarPasswordModal
          abierto={modalAbierto}
          onClose={() => setModalAbierto(false)}
          onSuccess={() => setModalAbierto(false)}
        />

        <p className="text-xs text-zinc-400 mt-2">
          &copy; {new Date().getFullYear()} Medarkia
        </p>
      </div>
    </aside>
  );
}
