"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

const API_URL = "http://localhost:5000/api";

export const useHydrateAuth = () => {
  const { setAuth, token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      fetch(`${API_URL}/auth/hydrate`, {
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to hydrate auth");
          return res.json();
        })
        .then((data) => {
          if (data.token) {
            setAuth(data.token, data.user);
          }
        })
        .catch((e) => {
          console.error("Hydrate fetch error:", e);
        });
    }
  }, [token, setAuth]);
};
