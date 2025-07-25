import { Outlet } from "react-router-dom";

export default function LoginLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-teal-700 dark:text-white mb-6">
          Medarkia
        </h1>
        <Outlet />
      </div>
    </div>
  );
}
