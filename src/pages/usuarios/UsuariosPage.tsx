// src/pages/usuarios/UsuariosPage.tsx
import { useEffect, useState, useCallback, useRef } from "react";
import axios, { AxiosError } from "axios";
import { primaryButton } from "@/styles/buttons";
import { getAvatarUrl } from "@/utils/getAvatarUrl";
import { UserCircle, Pencil, Trash, UserPlus } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { CrearUsuarioModal } from "@/components/usuarios/CrearUsuarioModal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { FormularioUsuarioModal } from "@/components/usuarios/FormularioUsuarioModal";
import { UsuarioCard } from "@/components/usuarios/UsuarioCard";
import { asegurarId } from "@/utils/asegurarId";
import type { Usuario } from "@/types/Usuario";
import { FiltroUsuarios } from "@/components/usuarios/FiltroUsuarios";
import { Paginacion } from "@/components/ui/Paginacion";
import {
  exportarUsuariosCSV,
  exportarUsuariosPDF,
} from "@/helpers/exportarUsuarios";
import { AsignarDoctorModal } from "./components/AsignarDoctorModal";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioEnEdicion, setUsuarioEnEdicion] = useState<Usuario | null>(
    null
  );
  const [usuarioAEliminar, setUsuarioAEliminar] = useState<Usuario | null>(
    null
  );
  const [errorEliminar, setErrorEliminar] = useState("");
  const { user, token } = useAuthStore();
  const [filtros, setFiltros] = useState<{
    rol?: string;
    cedula?: string;
    texto?: string;
  }>({});
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);
  const [limitePorPagina, setLimitePorPagina] = useState(10);
  const [mostrarOpcionesExportar, setMostrarOpcionesExportar] = useState(false);
  const exportarRef = useRef<HTMLDivElement>(null);

  const [asistenteSeleccionado, setAsistenteSeleccionado] =
    useState<Usuario | null>(null);

  const obtenerUsuarios = useCallback(() => {
    if (!token) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/usuarios`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          ...filtros,
          page: paginaActual,
          limit: limitePorPagina,
        },
      })
      .then((res) => {
        const usuariosConId = res.data.usuarios.map(asegurarId);
        setUsuarios(usuariosConId);
        setTotalUsuarios(res.data.total);
      })
      .catch((err) => console.error("Error al obtener usuarios", err));
  }, [token, filtros, paginaActual, limitePorPagina]);

  const eliminarUsuario = async () => {
    if (!usuarioAEliminar || !usuarioAEliminar.id || !token) {
      console.error("No se puede eliminar: ID inválido o token faltante.");
      return;
    }
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/usuarios/${usuarioAEliminar.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      obtenerUsuarios();
    } catch (error) {
      const axiosErr = error as AxiosError<{ message?: string }>;
      setErrorEliminar(
        axiosErr.response?.data?.message || "Error al eliminar usuario."
      );
    } finally {
      setUsuarioAEliminar(null);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, [obtenerUsuarios]);

  useEffect(() => {
    const manejarClickFuera = (event: MouseEvent) => {
      if (
        exportarRef.current &&
        !exportarRef.current.contains(event.target as Node)
      ) {
        setMostrarOpcionesExportar(false);
      }
    };
    document.addEventListener("mousedown", manejarClickFuera);
    return () => {
      document.removeEventListener("mousedown", manejarClickFuera);
    };
  }, []);

  const handleAsignarDoctor = (usuario: Usuario) => {
    if (usuario.rol === "asistente") {
      setAsistenteSeleccionado(usuario);
    }
  };

  if (!user) {
    return (
      <div className="text-center text-gray-500 mt-10">Cargando usuario...</div>
    );
  }

  if (user.rol !== "admin") {
    return (
      <div className="text-center text-red-500 mt-10 font-semibold">
        No tienes permiso para acceder a esta sección.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">
          Gestión de Usuarios
        </h2>

        <div className="flex items-center gap-2">
          <div ref={exportarRef} className="relative inline-block text-left">
            <button
              className="bg-green-700 text-white text-sm font-medium px-4 py-2 rounded hover:bg-green-800 transition"
              onClick={() =>
                setMostrarOpcionesExportar(!mostrarOpcionesExportar)
              }
            >
              Exportar ⬇️
            </button>

            {mostrarOpcionesExportar && (
              <div className="absolute right-0 z-10 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => exportarUsuariosCSV(usuarios)}
                  >
                    📊 Exportar a CSV
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => exportarUsuariosPDF(usuarios)}
                  >
                    📄 Exportar a PDF
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            className={`${primaryButton} flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2`}
            onClick={() => {
              setMostrarModal(true);
              setErrorEliminar("");
            }}
          >
            <span className="sm:hidden">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </span>
            <span className="hidden sm:inline">+ Crear usuario</span>
          </button>
        </div>
      </div>

      <FiltroUsuarios onFiltrar={setFiltros} />

      {errorEliminar && (
        <p className="text-red-500 text-sm font-medium -mt-4 mb-2">
          {errorEliminar}
        </p>
      )}

      <div className="hidden sm:block overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white dark:bg-zinc-900 text-sm">
          <thead>
            <tr className="text-left text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-zinc-700">
              <th className="p-3">Avatar</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Correo</th>
              <th className="p-3">Rol</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-5 text-center text-gray-500 dark:text-gray-400"
                >
                  No hay usuarios registrados.
                </td>
              </tr>
            ) : (
              usuarios.map((usuario) => (
                <tr
                  key={`${usuario.id}-${usuario.email}`}
                  className="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                >
                  <td className="p-3">
                    {usuario.avatar?.public_id ? (
                      <img
                        src={getAvatarUrl(usuario.avatar.public_id)}
                        alt={`Avatar de ${usuario.nombre}`}
                        className="w-8 h-8 rounded-full object-cover border border-green-500"
                      />
                    ) : (
                      <UserCircle className="w-8 h-8 text-zinc-400" />
                    )}
                  </td>
                  <td className="p-3 text-wrap">
                    {usuario.apellido} {usuario.nombre}
                    {usuario.rol === "asistente" &&
                      usuario.asociado_a?.nombre && (
                        <div className="mt-1">
                          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                            Asociado a: Dr. {usuario.asociado_a.nombre}{" "}
                            {usuario.asociado_a.apellido}
                          </span>
                        </div>
                      )}
                  </td>

                  <td className="p-3">{usuario.email}</td>
                  <td className="p-3 capitalize">{usuario.rol}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => {
                        setUsuarioEnEdicion(usuario);
                        setErrorEliminar("");
                      }}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (!usuario.id) {
                          console.error(
                            "Este usuario no tiene un id válido:",
                            usuario
                          );
                          return;
                        }
                        setUsuarioAEliminar(usuario);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash size={16} />
                    </button>
                    {usuario.rol === "asistente" && (
                      <button
                        onClick={() => setAsistenteSeleccionado(usuario)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Asignar doctor"
                      >
                        <UserPlus size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-4">
        {usuarios.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No hay usuarios registrados.
          </p>
        ) : (
          usuarios.map((usuario) => (
            <UsuarioCard
              key={usuario.id}
              usuario={usuario}
              onEditar={setUsuarioEnEdicion}
              onEliminar={setUsuarioAEliminar}
              onAsignarDoctor={handleAsignarDoctor}
            />
          ))
        )}
      </div>

      {usuarios.length > 0 && (
        <Paginacion
          paginaActual={paginaActual}
          setPaginaActual={setPaginaActual}
          limitePorPagina={limitePorPagina}
          setLimitePorPagina={setLimitePorPagina}
          totalElementos={totalUsuarios}
        />
      )}

      <CrearUsuarioModal
        abierto={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onUsuarioCreado={obtenerUsuarios}
      />

      {usuarioEnEdicion && (
        <FormularioUsuarioModal
          abierto={!!usuarioEnEdicion}
          onClose={() => setUsuarioEnEdicion(null)}
          onSuccess={() => {
  setUsuarioEnEdicion(null);
  obtenerUsuarios();
}}

          usuario={usuarioEnEdicion}
        />
      )}

      <ConfirmDialog
        abierto={!!usuarioAEliminar}
        onClose={() => {
          setUsuarioAEliminar(null);
          setErrorEliminar("");
        }}
        onConfirm={eliminarUsuario}
        titulo="Eliminar usuario"
        mensaje={`¿Deseas eliminar a ${usuarioAEliminar?.nombre} ${usuarioAEliminar?.apellido}? Esta acción no se puede deshacer.`}
        textoConfirmar="Eliminar"
      />

      {asistenteSeleccionado && (
        <AsignarDoctorModal
          abierto={!!asistenteSeleccionado}
          onClose={() => setAsistenteSeleccionado(null)}
          onSuccess={() => {
            setAsistenteSeleccionado(null);
            obtenerUsuarios();
          }}
          asistente={asistenteSeleccionado}
        />
      )}
    </div>
  );
}
