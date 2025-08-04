import { useEffect, useState, useCallback } from "react";
import axios from "@/api/axiosInstance";
import { toast } from "sonner";
import { primaryButton } from "@/styles/buttons";
import { format, parseISO } from "date-fns";
import { Paginacion } from "@/components/ui/Paginacion";

interface Cita {
  _id: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: string;
  observaciones?: string;
  paciente: {
    usuario: {
      nombre: string;
      apellido: string;
    };
  };
}

export default function CitasDoctorPage() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [limitePorPagina, setLimitePorPagina] = useState(10);
  const [totalCitas, setTotalCitas] = useState(0);

  const obtenerCitas = useCallback(async () => {
    try {
      const { data } = await axios.get("/citas", {
        params: {
          page: paginaActual,
          limit: limitePorPagina,
        },
      });

      if (Array.isArray(data?.citas)) {
        setCitas(data.citas);
        setTotalCitas(data.total || 0);
      } else if (Array.isArray(data)) {
        setCitas(data);
        setTotalCitas(data.length);
      } else {
        console.warn("Respuesta inesperada en /citas:", data);
        toast.error("No se pudieron cargar tus citas.");
        setCitas([]);
        setTotalCitas(0);
      }
    } catch (error) {
      console.error("Error al obtener citas:", error);
      toast.error("Error al cargar tus citas");
      setCitas([]);
      setTotalCitas(0);
    }
  }, [paginaActual, limitePorPagina]);

  useEffect(() => {
    obtenerCitas();
  }, [obtenerCitas]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Mis Citas con Pacientes</h2>
        <button onClick={obtenerCitas} className={primaryButton}>
          🔄 Actualizar
        </button>
      </div>

      {citas.length === 0 ? (
        <p className="text-gray-600">No tienes citas programadas.</p>
      ) : (
        <ul className="space-y-4">
          {citas.map((cita) => {
            let fechaTexto = "Fecha inválida";
            try {
              const fecha = parseISO(cita.fecha);
              if (!isNaN(fecha.getTime())) {
                fechaTexto = format(fecha, "PPP");
              }
            } catch {
              //
            }

            return (
              <li
                key={cita._id}
                className="border rounded p-4 shadow-sm bg-white dark:bg-zinc-900"
              >
                <p className="font-medium text-lg">
                  {fechaTexto}, de {cita.horaInicio} a {cita.horaFin}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Paciente: {cita.paciente?.usuario?.nombre}{" "}
                  {cita.paciente?.usuario?.apellido}
                </p>
                <p className="text-sm text-gray-500">
                  Estado: <span className="font-semibold">{cita.estado}</span>
                </p>
                {cita.observaciones && (
                  <p className="text-sm text-gray-500">
                    Observaciones: {cita.observaciones}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {citas.length > 0 && (
        <Paginacion
          paginaActual={paginaActual}
          setPaginaActual={setPaginaActual}
          limitePorPagina={limitePorPagina}
          setLimitePorPagina={setLimitePorPagina}
          totalElementos={totalCitas}
        />
      )}
    </div>
  );
}
