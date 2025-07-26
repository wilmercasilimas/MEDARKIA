// src/pages/usuarios/components/AsignarDoctorModal.tsx
import { useEffect, useState } from "react";
import axios from "@/api/axiosInstance";
import type { Usuario } from "@/types/Usuario";
import { primaryButton, secondaryButton } from "@/styles/buttons";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

interface Props {
  abierto: boolean;
  onClose: () => void;
  onSuccess: () => void;
  asistente: Usuario | null;
}

const DOCTOR_MARCADOR = {
  id: "688415ae5c10ca943f882874",
  nombre: "Doctor del pecado",
  apellido: "asignado",
  email: "sin-doctor@medarkia.com",
};

export function AsignarDoctorModal({
  abierto,
  onClose,
  onSuccess,
  asistente,
}: Props) {
  const { token } = useAuthStore();
  const [doctores, setDoctores] = useState<Usuario[]>([]);
  const [doctorId, setDoctorId] = useState("");

  useEffect(() => {
    if (abierto && token) {
      axios
        .get("/usuarios?rol=doctor", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const docs = res.data.usuarios as Usuario[];

          // Insertar el marcador al inicio
          const conMarcador = [DOCTOR_MARCADOR as Usuario, ...docs];

          setDoctores(conMarcador);
        })
        .catch(() => toast.error("Error al cargar doctores"));
    }
  }, [abierto, token]);

  const handleAsignar = async () => {
    if (!asistente) return;
    try {
      await axios.put(
        `/usuarios/${asistente.id}/asignar-doctor`,
        { doctorId: doctorId || null },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Doctor asignado correctamente");
      onClose();
      onSuccess();
      
    } catch {
      toast.error("Error al asignar doctor");
    }
  };

  if (!abierto || !asistente) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4 text-green-700 dark:text-green-300">
          Asignar doctor a {asistente.nombre} {asistente.apellido}
        </h3>

        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Seleccione un doctor</option>
          {doctores.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.id === DOCTOR_MARCADOR.id
                ? "❌ Sin doctor asignado"
                : `Dr. ${doc.nombre} ${doc.apellido}`}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button className={secondaryButton} onClick={onClose}>
            Cancelar
          </button>
          <button
            className={primaryButton}
            onClick={handleAsignar}
            disabled={!doctorId || doctorId === asistente.asociado_a?.id}
          >
            Asignar
          </button>
        </div>
      </div>
    </div>
  );
}
