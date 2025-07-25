// src/pages/ErrorPage.tsx
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-12 text-center dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">¡Algo salió mal!</h1>
      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
        {isRouteErrorResponse(error)
          ? `${error.status} - ${error.statusText}`
          : "No pudimos cargar la página."}
      </p>
      {error instanceof Error && (
        <pre className="mt-6 max-w-md overflow-auto rounded bg-gray-100 p-4 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200">
          {error.message}
        </pre>
      )}
      <a
        href="/"
        className="mt-8 inline-block rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Volver al inicio
      </a>
    </div>
  );
}
