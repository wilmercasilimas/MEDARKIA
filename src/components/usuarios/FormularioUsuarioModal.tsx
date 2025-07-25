import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/store/authStore";
import { primaryButton } from "@/styles/buttons";

import type { Usuario } from "@/types/Usuario";

interface Props {
  abierto: boolean;
  onClose: () => void;
  onSuccess: () => void;
  usuario?: Usuario;
}

export function FormularioUsuarioModal({
  abierto,
  onClose,
  onSuccess,
  usuario,
}: Props) {
  const { token } = useAuthStore();
  const editando = !!usuario;

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    email: "",
    telefono: "",
    rol: "paciente",
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editando && usuario) {
      setForm({
        nombre: usuario.nombre || "",
        apellido: usuario.apellido || "",
        cedula: usuario.cedula || "",
        email: usuario.email || "",
        telefono: usuario.telefono || "",
        rol: usuario.rol || "paciente",
      });
    }
  }, [usuario, editando]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== "") formData.append(key, value);
    });
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      if (editando) {
        if (!usuario?.id || usuario.id.length !== 24) {
          setError("ID de usuario inválido.");
          setLoading(false);
          return;
        }

        await axios.put(
          `${import.meta.env.VITE_API_URL}/usuarios/${usuario.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/usuarios`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      onSuccess();
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setError(axiosErr.response?.data?.message || "Ocurrió un error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={abierto} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-xl space-y-4 overflow-hidden">
          <Dialog.Title className="text-lg font-bold text-green-700 dark:text-green-300">
            {editando ? "Editar usuario" : "Crear nuevo usuario"}
          </Dialog.Title>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <input
              name="nombre"
              placeholder="Nombre"
              required
              onChange={handleChange}
              value={form.nombre}
              className="input w-full"
            />
            <input
              name="apellido"
              placeholder="Apellido"
              required
              onChange={handleChange}
              value={form.apellido}
              className="input w-full"
            />
            <input
              name="cedula"
              placeholder="Cédula"
              required
              onChange={handleChange}
              value={form.cedula}
              className="input w-full"
            />
            <input
              name="telefono"
              placeholder="Teléfono"
              required
              onChange={handleChange}
              value={form.telefono}
              className="input w-full"
            />
            <input
              name="email"
              type="email"
              placeholder="Correo"
              required
              onChange={handleChange}
              value={form.email}
              className="input w-full"
            />

            <select
              name="rol"
              value={form.rol}
              onChange={handleChange}
              className="input w-full"
            >
              <option value="paciente">Paciente</option>
              <option value="doctor">Doctor</option>
              <option value="asistente">Asistente</option>
              <option value="admin">Administrador</option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
              className="input w-full col-span-1 sm:col-span-2"
            />

            <div className="col-span-1 sm:col-span-2 flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-gray-500 hover:underline"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={primaryButton}
                disabled={loading}
              >
                {loading
                  ? editando
                    ? "Guardando..."
                    : "Creando..."
                  : editando
                  ? "Guardar cambios"
                  : "Crear usuario"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}