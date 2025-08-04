import axios from "axios";


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // solo si usas cookies
});

// ✅ Interceptor para adjuntar token JWT automáticamente
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // o desde Zustand si lo prefieres
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
