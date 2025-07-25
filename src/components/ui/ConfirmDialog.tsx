import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { AxiosError } from "axios";
import { primaryButton } from "@/styles/buttons";

interface ConfirmDialogProps {
  abierto: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  titulo?: string;
  mensaje?: string;
  textoConfirmar?: string;
}

export function ConfirmDialog({
  abierto,
  onClose,
  onConfirm,
  titulo = "¿Estás seguro?",
  mensaje = "Esta acción no se puede deshacer.",
  textoConfirmar = "Sí, eliminar",
}: ConfirmDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (err: unknown) {
      let msg = "Ocurrió un error inesperado.";
      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        (err as AxiosError).response?.data
      ) {
        const axiosError = err as AxiosError<{ message?: string }>;
        msg = axiosError.response?.data?.message || msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  return (
    <Dialog open={abierto} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-xl space-y-4">
          <Dialog.Title className="text-lg font-bold text-red-600 dark:text-red-400">
            {titulo}
          </Dialog.Title>

          <p className="text-sm text-gray-700 dark:text-gray-300">{mensaje}</p>

          {error && (
            <p className="text-sm text-red-500 mt-2 whitespace-pre-line">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={handleClose}
              className="text-sm text-gray-500 hover:underline"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className={`${primaryButton} bg-red-600 hover:bg-red-700 text-white`}
            >
              {loading ? "Eliminando..." : textoConfirmar}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
