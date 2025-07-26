import { create } from "zustand";

interface Avatar {
  url: string;
  public_id?: string;
}

interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  avatar?: Avatar;
}

interface AuthState {
  token: string | null;
  user: Usuario | null;
  login: (data: { token: string; usuario: Usuario }) => void;
  logout: () => void;
}

const getInitialAuthState = (): Pick<AuthState, "token" | "user"> => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  return {
    token,
    user: userString ? JSON.parse(userString) : null,
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialAuthState(),

  login: ({ token, usuario }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(usuario));
    set({ token, user: usuario });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null });
  },
}));
