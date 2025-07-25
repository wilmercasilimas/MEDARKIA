// src/components/usuarios/UsuarioCard.tsx

import { getAvatarUrl } from "@/utils/getAvatarUrl";
import { UserCircle, Pencil, Trash } from "lucide-react";
import type { Usuario } from "@/types/Usuario";

interface Props {
  usuario: Usuario;
  onEditar: (usuario: Usuario) => void;
  onEliminar: (usuario: Usuario) => void;
}

export function UsuarioCard({ usuario, onEditar, onEliminar }: Props) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 space-y-3 border border-gray-200 dark:border-zinc-700">
      <div className="flex items-center gap-3">
        {usuario.avatar?.public_id ? (
          <img
            src={getAvatarUrl(usuario.avatar.public_id)}
            alt={`Avatar de ${usuario.nombre}`}
            className="w-10 h-10 rounded-full object-cover border border-green-500"
          />
        ) : (
          <UserCircle className="w-10 h-10 text-zinc-400" />
        )}
        <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          {usuario.apellido} {usuario.nombre}
          {usuario.rol === "asistente" && usuario.asociado_a?.nombre && (
            <div className="mt-1">
              <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                Asociado a: Dr. {usuario.asociado_a.nombre}{" "}
                {usuario.asociado_a.apellido}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          <strong>Correo:</strong> {usuario.email}
        </p>
        <p>
          <strong>Rol:</strong> {usuario.rol}
        </p>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => onEditar(usuario)}
          className="text-green-600 hover:text-green-800"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => onEliminar(usuario)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
}
