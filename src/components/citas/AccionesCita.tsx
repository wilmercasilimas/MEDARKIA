import { useState } from "react";
import EditarCitaModal from "./EditarCitaModal";
import { toast } from "sonner";
import axios from "@/api/axiosInstance";
import { useAuthStore } from "@/store/authStore";
import type { Usuario } from "@/types/Usuario";

interface AccionesCitaProps {
  cita: {
    _id: string;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    observaciones?: string;
    paciente: {
      usuario: {
        _id: string;
      };
    };
    doctor: {
      usuario: {
        _id: string;
      };
      asistentes?: {
        _id: string;
      }[];
    };
  };
  onActualizar: () => void;
}

export default function AccionesCita({ cita, onActualizar }: AccionesCitaProps) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const usuario = useAuthStore((s) => s.user) as Usuario | null;

  const puedeEditar =
    usuario?.rol === "admin" ||
    (usuario?.rol === "doctor" && usuario._id === cita.doctor?.usuario?._id) ||
    (usuario?.rol === "asistente" &&
      cita.doctor?.asistentes?.some((a) => a._id === usuario._id)) ||
    (usuario?.rol === "paciente" && usuario._id === cita.paciente?.usuario?._id);

  const handleEliminar = async () => {
    if (!confirm("¿Estás seguro de eliminar esta cita?")) return;
    try {
      await axios.delete(`/citas/${cita._id}`);
      toast.success("Cita eliminada");
      onActualizar();
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar cita");
    }
  };

  return (
    <div className="flex gap-2 mt-2">
      {puedeEditar && (
        <>
          <button
            onClick={() => setMostrarModal(true)}
            className="text-blue-600 hover:underline text-sm"
          >
            ✏️ Editar
          </button>
          <button
            onClick={handleEliminar}
            className="text-red-600 hover:underline text-sm"
          >
            🗑️ Eliminar
          </button>
        </>
      )}

      <EditarCitaModal
  abierta={mostrarModal}
  onClose={() => setMostrarModal(false)}
  cita={cita}
  onCitaActualizada={onActualizar}
/>


    </div>
  );
}
