import { Dialog } from "@headlessui/react";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/store/authStore";
import { primaryButton } from "@/styles/buttons";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  abierto: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CambiarPasswordModal({ abierto, onClose, onSuccess }: Props) {
  const { token } = useAuthStore();

  const [form, setForm] = useState({
    password_actual: "",
    password_nueva: "",
    confirmar_password: "",
  });

  const [mostrar, setMostrar] = useState({
    actual: false,
    nueva: false,
    confirmar: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password_nueva !== form.confirmar_password) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        `${import.meta.env.VITE_API_URL}/usuarios/cambiar-password`,
        {
          password_actual: form.password_actual,
          password_nueva: form.password_nueva,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSuccess();
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setError(
        axiosErr.response?.data?.message || "Error al cambiar la contraseña."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={abierto} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-xl space-y-4">
          <Dialog.Title className="text-lg font-bold text-green-700 dark:text-green-300">
            Cambiar contraseña
          </Dialog.Title>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                name: "password_actual",
                label: "Contraseña actual",
                show: mostrar.actual,
                toggle: () =>
                  setMostrar((prev) => ({ ...prev, actual: !prev.actual })),
              },
              {
                name: "password_nueva",
                label: "Nueva contraseña",
                show: mostrar.nueva,
                toggle: () =>
                  setMostrar((prev) => ({ ...prev, nueva: !prev.nueva })),
              },
              {
                name: "confirmar_password",
                label: "Confirmar nueva contraseña",
                show: mostrar.confirmar,
                toggle: () =>
                  setMostrar((prev) => ({
                    ...prev,
                    confirmar: !prev.confirmar,
                  })),
              },
            ].map(({ name, label, show, toggle }) => (
              <div key={name} className="relative">
                <input
                  type={show ? "text" : "password"}
                  name={name}
                  placeholder={label}
                  required
                  value={form[name as keyof typeof form]}
                  onChange={handleChange}
                  className="input w-full pr-10"
                />
                <button
                  type="button"
                  onClick={toggle}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-300"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            ))}

            <div className="flex justify-end gap-4 pt-2">
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
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
