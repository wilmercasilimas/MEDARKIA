import axios from "@/api/axiosInstance";

export const asignarDoctorAAsistente = (asistenteId: string, doctorId: string) => {
  return axios.put(`/usuarios/${asistenteId}/asignar-doctor`, { doctorId });
};
