import { useAuthStore } from "@/store/authStore";
import { getAvatarUrl } from "@/utils/getAvatarUrl";
import { UserCircle } from "lucide-react";
import logo from "@/assets/LogoMedarkia.png";


type TopbarProps = {
  abrirMenu?: () => void;
};

export default function Topbar({ abrirMenu }: TopbarProps) {
  const usuario = useAuthStore((state) => state.user);
  const avatarUrl = getAvatarUrl(usuario?.avatar?.public_id);

  return (
    <header className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-3 flex items-center justify-between shadow-sm">
      {/* Botón hamburguesa (visible solo en móvil) */}
      <div className="flex items-center gap-4">
  {abrirMenu && (
    <button
      onClick={abrirMenu}
      className="md:hidden text-gray-700 dark:text-gray-200"
      aria-label="Abrir menú lateral"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  )}

  {/* Logo + texto */}
  <div className="flex items-center gap-2">
    <img src={logo} alt="Logo Medarkia" className="h-8 w-auto" />
    <span className="text-lg font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
      
    </span>
  </div>
</div>


      {/* Perfil de usuario */}
      <div className="flex items-center gap-3">
        {/* Avatar (real o ícono) */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`Avatar de ${usuario?.nombre}`}
            className="w-12 h-12 rounded-full object-cover border border-green-500"
          />
        ) : (
          <UserCircle size={36} className="text-green-600 dark:text-green-400" />
        )}

        {/* Nombre + Apellido con mismo color */}
        <div className="flex flex-col leading-tight text-right text-green-600 dark:text-green-400 font-medium">
          <span className="text-sm">{usuario?.nombre || ""}</span>
          <span className="text-sm">{usuario?.apellido || ""}</span>
        </div>
      </div>
    </header>
  );
}
