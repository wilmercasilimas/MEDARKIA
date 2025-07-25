import React from "react";

interface Props {
  paginaActual: number;
  setPaginaActual: (pagina: number) => void;
  limitePorPagina: number;
  setLimitePorPagina: (limite: number) => void;
  totalElementos: number;
}

export const Paginacion: React.FC<Props> = ({
  paginaActual,
  setPaginaActual,
  limitePorPagina,
  setLimitePorPagina,
  totalElementos,
}) => {
  const totalPaginas = Math.ceil(totalElementos / limitePorPagina) || 1;

  const manejarCambioLimite = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimitePorPagina(Number(e.target.value));
    setPaginaActual(1); // Reinicia a la primera página
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 text-sm">
      {/* Selector de cantidad por página */}
      <div className="flex items-center gap-2">
        <select
          id="limite"
          value={limitePorPagina}
          onChange={manejarCambioLimite}
          className="border px-2 py-1 rounded text-sm"
        >
          {[5, 10, 20, 50, 100].map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
        <span className="text-gray-500">por página</span>
      </div>

      {/* Controles de navegación */}
      <div className="flex items-center gap-2">
        {/* ✅ Botones numerados */}
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            onClick={() => setPaginaActual(i + 1)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors
      ${
        paginaActual === i + 1
          ? "bg-green-600 text-white font-semibold"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
