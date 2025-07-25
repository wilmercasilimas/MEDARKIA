import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Usuario {
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  asociado_a?: {
    nombre: string;
    apellido: string;
  };
}

/**
 * Exporta usuarios a un archivo CSV
 */
export function exportarUsuariosCSV(usuarios: Usuario[]) {
  const encabezados = ["Nombre", "Correo", "Rol", "Doctor Asociado"];

  const filas = usuarios.map((u) => {
    const nombreCompleto = `${u.apellido} ${u.nombre}`;
    const doctor = u.rol === "asistente" && u.asociado_a?.nombre
      ? `Dr. ${u.asociado_a.nombre} ${u.asociado_a.apellido}`
      : "";
    return [nombreCompleto, u.email, u.rol, doctor];
  });

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [encabezados, ...filas]
      .map((fila) => fila.map((campo) => `"${campo}"`).join(","))
      .join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "usuarios_medarkia.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exporta usuarios a un archivo PDF usando jsPDF + autoTable
 */
export function exportarUsuariosPDF(usuarios: Usuario[]) {
  const doc = new jsPDF();

  const filas = usuarios.map((u) => {
    const nombreCompleto = `${u.apellido} ${u.nombre}`;
    const doctor = u.rol === "asistente" && u.asociado_a?.nombre
      ? `Dr. ${u.asociado_a.nombre} ${u.asociado_a.apellido}`
      : "";
    return [nombreCompleto, u.email, u.rol, doctor];
  });

  autoTable(doc, {
    head: [["Nombre", "Correo", "Rol", "Doctor Asociado"]],
    body: filas,
    styles: { fontSize: 10 },
    theme: "striped",
  });

  doc.save("usuarios_medarkia.pdf");
}
