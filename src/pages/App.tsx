// src/pages/App.tsx
import { useNavigate } from "react-router-dom";
import logo from "@/assets/LogoMedarkia.png";
import videoPresentacion from "@/assets/video-presentacion.mp4";
import { primaryButton } from "@/styles/buttons";

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-white via-blue-50 to-green-50 dark:from-zinc-900 dark:to-zinc-800 flex flex-col px-4">
      {/* Logo y texto - arriba */}
      <header className="pt-6 flex flex-col items-center">
        <img src={logo} alt="Logo Medarkia" className="h-24 w-auto object-contain mb-4" />

        <h1 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400 mb-2 text-center">
          Bienvenido a Medarkia
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base text-center mb-6 max-w-md">
          Plataforma médica integral para la gestión de pacientes, doctores y procesos clínicos.
        </p>
      </header>

      {/* Video centrado en el medio */}
      <main className="flex justify-center">
        <video
          className="rounded-lg shadow-lg w-full max-w-xl my-4"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoPresentacion} type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>
      </main>

      {/* Botón y footer abajo */}
      <footer className="pb-6 flex flex-col items-center gap-4 mt-auto">
        <button onClick={() => navigate("/login")} className={primaryButton}>
          Iniciar sesión
        </button>

        <p className="text-xs text-zinc-400">
          &copy; {new Date().getFullYear()} Medarkia. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
