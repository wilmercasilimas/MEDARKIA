// src/pages/NoAutorizadoPage.tsx
export default function NoAutorizadoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">
          🚫 Acceso no autorizado
        </h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          No tienes permisos para acceder a esta sección.
        </p>
        <a
          href="/"
          className="mt-4 inline-block text-sm text-blue-600 hover:underline"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
