// src/pages/citas/components/CrearCitaModal.tsx
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "@/api/axiosInstance";
import { toast } from "sonner";
import { primaryButton } from "@/styles/buttons";
import {
  modalOverlay,
  modalContainer,
  modalHeader,
  modalFooter,
  closeButton,
} from "@/styles/modals";

interface Props {
  onClose: () => void;
  onCitaCreada: () => void;
}

interface Doctor {
  _id: string;
  nombre: string;
  apellido: string;
}

export default function CrearCitaModal({ onClose, onCitaCreada }: Props) {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [motivo, setMotivo] = useState("");
  const [doctores, setDoctores] = useState<Doctor[]>([]);

  const cargarDoctores = async () => {
    try {
      const { data } = await axios.get("/usuarios?rol=doctor");
      setDoctores(data);
    } catch {
      toast.error("No se pudieron cargar los doctores");
    }
  };

  const crearCita = async () => {
    if (!fecha || !hora || !doctorId || !motivo) {
      toast.warning("Completa todos los campos");
      return;
    }

    try {
      await axios.post("/citas", {
        fecha: `${fecha}T${hora}`,
        doctor: doctorId,
        motivo,
      });
      toast.success("Cita agendada correctamente");
      onClose();
      onCitaCreada();
    } catch {
      toast.error("No se pudo agendar la cita");
    }
  };

  useEffect(() => {
    cargarDoctores();
  }, []);

  return (
    <div className={modalOverlay}>
      <div className={modalContainer}>
        <div className={modalHeader}>
          <h2 className="text-lg font-semibold">Agendar nueva cita</h2>
          <button onClick={onClose} className={closeButton}>
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm">Fecha:</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <div>
            <label className="block text-sm">Hora:</label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <div>
            <label className="block text-sm">Doctor:</label>
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-full border px-2 py-1 rounded"
            >
              <option value="">Selecciona un doctor</option>
              {doctores.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.nombre} {doc.apellido}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm">Motivo:</label>
            <textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="w-full border px-2 py-1 rounded"
              rows={3}
            />
          </div>
        </div>

        <div className={modalFooter}>
          <button onClick={crearCita} className={primaryButton}>
            Agendar
          </button>
        </div>
      </div>
    </div>
  );
}
