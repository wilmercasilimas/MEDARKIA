import { useEffect } from "react";
import axios from "@/api/axiosInstance";

function App() {
  useEffect(() => {
    axios.get("/ping")
      .then(res => console.log("✅ Backend OK:", res.data))
      .catch(err => console.error("❌ Error de conexión:", err));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">¡Medarkia Frontend activo! 🚀</h1>
    </div>
  );
}

export default App;
