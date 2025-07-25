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

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  login: ({ token, usuario }) => set({ token, user: usuario }),
  logout: () => set({ token: null, user: null }),
}));
//aa
