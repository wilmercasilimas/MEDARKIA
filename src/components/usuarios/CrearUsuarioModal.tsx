import { useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { useAuthStore } from "@/store/authStore";
import { primaryButton } from "@/styles/buttons";
import { Eye, EyeOff } from "lucide-react";
import type { AxiosError } from "axios";

interface Props {
  abierto: boolean;
  onClose: () => void;
  onUsuarioCreado: () => void;
}

export function CrearUsuarioModal({ abierto, onClose, onUsuarioCreado }: Props) {
  const { token } = useAuthStore();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    email: "",
    password: "",
    telefono: "",
    rol: "paciente",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verPassword, setVerPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/usuarios`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      onUsuarioCreado();
      onClose();
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setError(axiosErr.response?.data?.message || "Error al crear usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={abierto} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 overflow-auto">
        <Dialog.Panel className="w-full max-w-lg rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-xl space-y-4">
          <Dialog.Title className="text-lg font-bold text-green-700 dark:text-green-300">
            Crear nuevo usuario
          </Dialog.Title>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="nombre" placeholder="Nombre" required onChange={handleChange} className="input" />
            <input name="apellido" placeholder="Apellido" required onChange={handleChange} className="input" />
            <input name="cedula" placeholder="Cédula" required onChange={handleChange} className="input" />
            <input name="telefono" placeholder="Teléfono" required onChange={handleChange} className="input" />
            <input name="email" type="email" placeholder="Correo electrónico" required onChange={handleChange} className="input" />

            <div className="relative">
              <input
                name="password"
                type={verPassword ? "text" : "password"}
                placeholder="Contraseña"
                required
                onChange={handleChange}
                className="input pr-10"
              />
              <button
                type="button"
                onClick={() => setVerPassword(!verPassword)}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                tabIndex={-1}
              >
                {verPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <select name="rol" value={form.rol} onChange={handleChange} className="input">
              <option value="paciente">Paciente</option>
              <option value="doctor">Doctor</option>
              <option value="asistente">Asistente</option>
              <option value="admin">Administrador</option>
            </select>

            <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files?.[0] || null)} className="input" />

            <div className="col-span-1 sm:col-span-2 flex justify-end gap-2 mt-2">
              <button type="button" onClick={onClose} className="text-sm text-gray-500 hover:underline">
                Cancelar
              </button>
              <button type="submit" className={primaryButton} disabled={loading}>
                {loading ? "Creando..." : "Crear usuario"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
