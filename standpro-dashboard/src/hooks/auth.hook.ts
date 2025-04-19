import { useAuthStore } from "@/store";

export const useAuthHook = () => {
  const { user } = useAuthStore();

  const isAuthenticated = user !== undefined;

  return {
    user,
    isAuthenticated,
  };
};
