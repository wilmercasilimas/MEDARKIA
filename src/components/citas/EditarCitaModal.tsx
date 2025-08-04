// src/components/citas/EditarCitaModal.tsx
import { useState } from "react";
import axios from "@/api/axiosInstance";
import { toast } from "sonner";
import { primaryButton } from "@/styles/buttons";
import { Modal } from "@/components/ui/Modal";
import { useAuthStore } from "@/store/authStore";

interface EditarCitaModalProps {
  abierta: boolean;
  onClose: () => void;
  onCitaActualizada: () => void;
  cita: {
    _id: string;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    observaciones?: string;
    paciente: { _id: string }; // ✅ corregido
    doctor: { _id: string };   // ✅ corregido
  };
}

export default function EditarCitaModal({
  abierta,
  onClose,
  cita,
  onCitaActualizada,
}: EditarCitaModalProps) {
  const [fecha, setFecha] = useState(cita.fecha.slice(0, 10));
  const [horaInicio, setHoraInicio] = useState(cita.horaInicio.trim());
  const [horaFin, setHoraFin] = useState(cita.horaFin.trim());
  const [observaciones, setObservaciones] = useState(cita.observaciones || "");
  const [cargando, setCargando] = useState(false);
  const user = useAuthStore((state) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    if (!user) {
      toast.error("No se pudo actualizar la cita");
      return;
    }

    try {
      await axios.put(`/citas/${cita._id}`, {
        paciente: cita.paciente._id, // ✅ correcto
        doctor: cita.doctor._id,     // ✅ correcto
        fecha,
        horaInicio,
        horaFin,
        observaciones,
      });

      toast.success("Cita actualizada correctamente");
      onCitaActualizada();
      onClose();
    } catch (error) {
      console.error("Error al actualizar cita:", error);
      toast.error("No se pudo actualizar la cita");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Modal isOpen={abierta} onClose={onClose} titulo="Editar Cita">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">Hora Inicio</label>
            <input
              type="time"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Hora Fin</label>
            <input
              type="time"
              value={horaFin}
              onChange={(e) => setHoraFin(e.target.value)}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Observaciones</label>
          <textarea
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            className="w-full border px-2 py-1 rounded resize-none"
            rows={3}
          />
        </div>

        <div className="text-right">
          <button type="submit" disabled={cargando} className={primaryButton}>
            {cargando ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
