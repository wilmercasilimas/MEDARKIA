import { useState } from "react";
import { Select } from "@/components/ui/Select"; // corregido: en minúsculas
import { Input } from "@/components/ui/Input"; // corregido: en minúsculas
import { outlineButton } from "@/styles/buttons"; // ✅ usamos outlineButton como reemplazo
import { Filter, Search, X } from "lucide-react";

interface Props {
  onFiltrar: (filtros: {
    rol?: string;
    cedula?: string;
    texto?: string;
  }) => void;
}

export function FiltroUsuarios({ onFiltrar }: Props) {
  const [mostrar, setMostrar] = useState(false);
  const [criterio, setCriterio] = useState("");
  const [valor, setValor] = useState("");
  const [filtrosActivos, setFiltrosActivos] = useState(false);

  const aplicarFiltro = () => {
    const filtros: { rol?: string; cedula?: string; texto?: string } = {};
    if (criterio === "rol") filtros.rol = valor;
    if (criterio === "cedula") filtros.cedula = valor.replace(/[^0-9]/g, "");
    if (criterio === "texto") filtros.texto = valor;
    setFiltrosActivos(true);
    onFiltrar(filtros);
  };

  const limpiarFiltros = () => {
    setCriterio("");
    setValor("");
    setFiltrosActivos(false);
    onFiltrar({});
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          className={`${outlineButton} flex items-center gap-1 text-sm px-3 py-2`}
          onClick={() => setMostrar(!mostrar)}
        >
          <Filter size={16} />
          <span className="hidden sm:inline">
            {mostrar ? "Ocultar filtros" : "Mostrar filtros"}
          </span>
        </button>

        {filtrosActivos && (
          <button
            onClick={limpiarFiltros}
            className="text-sm text-green-600 hover:underline flex items-center gap-1"
          >
            <X size={16} />
            <span className="hidden sm:inline">Ver todos</span>
          </button>
        )}
      </div>

      {mostrar && (
        <div className="flex flex-col sm:flex-row items-start gap-2">
          <Select
            value={criterio}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCriterio(e.target.value)
            }
            className="w-40"
          >
            <option value="">Filtrar por...</option>
            <option value="rol">Rol</option>
            <option value="cedula">Cédula</option>
            <option value="texto">Nombre o Apellido</option>
          </Select>

          <div className="relative w-full sm:w-auto">
            <Input
              type="text"
              placeholder="Valor a buscar"
              value={valor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValor(e.target.value)
              }
              disabled={!criterio}
              className="pr-10"
            />
            <button
              type="button"
              onClick={aplicarFiltro}
              disabled={!criterio || !valor}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-green-600 disabled:text-zinc-400"
            >
              <Search size={16} />
            </button>
          </div>

          
        </div>
      )}
    </div>
  );
}
