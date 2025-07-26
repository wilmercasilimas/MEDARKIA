export const rutaDashboardPorRol = (rol: string): string => {
  switch (rol) {
    case 'admin':
      return '/dashboard/admin';
    case 'doctor':
      return '/dashboard/doctor';
    case 'asistente':
      return '/dashboard/asistente';
    case 'paciente':
      return '/dashboard/paciente';
    default:
      return '/';
  }
};
