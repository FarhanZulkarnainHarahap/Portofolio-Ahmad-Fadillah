"use client";

import { useCallback, useState } from "react";
import { login, logout } from "@/services/auth.service";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);

  const signIn = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      return await login({ email, password });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      return await logout();
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, signIn, signOut };
}
