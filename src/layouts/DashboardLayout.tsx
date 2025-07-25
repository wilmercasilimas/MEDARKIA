import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-100">
      {/* Overlay oscuro cuando el menú está abierto en móvil */}
      {menuAbierto && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden"
          onClick={() => setMenuAbierto(false)}
        />
      )}

      {/* Sidebar lateral (drawer en móvil, fijo en desktop) */}
      <aside
        className={`fixed z-50 md:static h-full md:h-auto w-64 transform transition-transform duration-300 ease-in-out
          ${menuAbierto ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          bg-white dark:bg-zinc-950`}
      >
        <Sidebar cerrarMenu={() => setMenuAbierto(false)} />
      </aside>

      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar abrirMenu={() => setMenuAbierto(true)} />
        <main className="flex-1 p-4 bg-gray-50 dark:bg-zinc-900 transition-colors">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
