import { useState } from "react";
import { Search, X } from "lucide-react";

interface Filtros {
  fecha?: string;
  cedula?: string;
}

interface Props {
  onFiltrar: (filtros: Filtros) => void;
}

export const FiltrosCitas: React.FC<Props> = ({ onFiltrar }) => {
  const [busqueda, setBusqueda] = useState("");

  const detectarFiltro = (valor: string): Filtros => {
    const limpio = valor.trim();

    // 📅 DD-MM-YYYY → YYYY-MM-DD
    if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(limpio)) {
      const [dd, mm, yyyy] = limpio.split("-");
      return {
        fecha: `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`,
      };
    }

    // 📅 DD/MM/YYYY → YYYY-MM-DD
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(limpio)) {
      const [dd, mm, yyyy] = limpio.split("/");
      return {
        fecha: `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`,
      };
    }

    // 📅 YYYY-MM-DD (válido directamente)
    if (/^\d{4}-\d{2}-\d{2}$/.test(limpio)) {
      return { fecha: limpio };
    }

    // 🧾 Cédula
    if (/^\d{6,12}$/.test(limpio)) {
      return { cedula: limpio };
    }

    return {};
  };

  const manejarFiltrado = () => {
    const filtrosDetectados = detectarFiltro(busqueda);
    onFiltrar(filtrosDetectados);
  };

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    manejarFiltrado();
  };

  const limpiarBusqueda = () => {
    setBusqueda("");
    onFiltrar({});
  };

  return (
    <form
      onSubmit={manejarSubmit}
      className="flex items-center gap-2 mb-4 max-w-md"
    >
      <div className="relative w-full">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por fecha (DD/MM/YYYY) o cédula"
          className="w-full border rounded pl-10 pr-10 py-2 text-sm shadow-sm dark:bg-zinc-800 dark:text-white"
        />
        <Search
          size={18}
          className="absolute left-3 top-2.5 text-gray-400 cursor-pointer"
          onClick={manejarFiltrado}
        />
        {busqueda && (
          <X
            size={18}
            className="absolute right-3 top-2.5 text-gray-400 cursor-pointer hover:text-red-500"
            onClick={limpiarBusqueda}
          />
        )}
      </div>
    </form>
  );
};
