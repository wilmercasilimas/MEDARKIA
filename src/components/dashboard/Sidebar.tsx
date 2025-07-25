import { Home, User, Calendar, ClipboardList, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import logo from "@/assets/LogoMedarkia.png";
import { textButton } from "@/styles/buttons";
import { useState } from "react";
import { CambiarPasswordModal } from "@/components/usuarios/CambiarPasswordModal";

type SidebarProps = {
  cerrarMenu?: () => void;
};

export default function Sidebar({ cerrarMenu }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const usuario = useAuthStore((state) => state.user);
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleClick = () => {
    if (cerrarMenu) cerrarMenu();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-zinc-950 shadow-md flex flex-col justify-between p-4">
      {/* Logo solo visible en desktop */}
      <div className="hidden md:flex justify-start items-center mb-6">
        <img src={logo} alt="Medarkia" className="h-20 w-auto object-contain" />
      </div>

      {/* Menú lateral (siempre debajo del logo) */}
      <nav className="flex flex-col gap-3">
        <Link
          to="/dashboard"
          className={`flex items-center gap-2 ${
            location.pathname === "/dashboard"
              ? "text-primary font-semibold"
              : "text-gray-700 dark:text-gray-200"
          } hover:text-primary`}
          onClick={handleClick}
        >
          <Home size={20} /> Inicio
        </Link>

        {usuario?.rol === "admin" && (
          <Link
            to="/usuarios"
            className={`flex items-center gap-2 ${
              location.pathname === "/usuarios"
                ? "text-primary font-semibold"
                : "text-gray-700 dark:text-gray-200"
            } hover:text-primary`}
            onClick={handleClick}
          >
            <User size={20} /> Usuarios
          </Link>
        )}

        <Link
          to="/citas"
          className={`flex items-center gap-2 ${
            location.pathname === "/citas"
              ? "text-primary font-semibold"
              : "text-gray-700 dark:text-gray-200"
          } hover:text-primary`}
          onClick={handleClick}
        >
          <Calendar size={20} /> Citas
        </Link>

        <Link
          to="/historial"
          className={`flex items-center gap-2 ${
            location.pathname === "/historial"
              ? "text-primary font-semibold"
              : "text-gray-700 dark:text-gray-200"
          } hover:text-primary`}
          onClick={handleClick}
        >
          <ClipboardList size={20} /> Historial
        </Link>
      </nav>

      {/* Pie del sidebar */}
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
