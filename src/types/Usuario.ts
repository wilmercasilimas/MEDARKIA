export interface Usuario {
  id: string;
  _id?: string; // ✅ necesario para mapear doctores correctamente
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  telefono: string;
  rol: "admin" | "doctor" | "asistente" | "paciente";
  avatar?: {
    url?: string;
    public_id?: string;
  };
  asociado_a?: {
    id: string;
    nombre: string;
    apellido: string;
  };
}
