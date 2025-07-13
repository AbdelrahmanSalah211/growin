import { create } from "zustand";
import { IUser } from "@/interfaces/IUser";

interface AuthState {
  token: string | null;
  user: IUser | null;
  setAuth: (token: string | null, user: IUser | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setAuth: (token, user) => set({ token, user }),
  clearAuth: () => set({ token: null, user: null }),
}));

export const getAccessToken = () => useAuthStore.getState().token;

export const isLoggedIn = () => !!getAccessToken();
