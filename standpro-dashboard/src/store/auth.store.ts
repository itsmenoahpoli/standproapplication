import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/models";

interface AuthState {
  user?: User;
  token?: string;
  SET_USER: (user: User) => void;
  SET_TOKEN: (token: string) => void;
  RESET_AUTH: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: undefined,
      token: undefined,
      SET_USER: (user: User) => set({ user }),
      SET_TOKEN: (token: string) => set({ token }),
      RESET_AUTH: () => set({ user: undefined, token: undefined }),
    }),
    {
      name: "auth-storage",
    }
  )
);
