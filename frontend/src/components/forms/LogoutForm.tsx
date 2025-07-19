// components/LogoutForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/services/authService";
import { removeAuth } from "@/lib/auth-actions";

export function LogoutForm({ token }: { token: string | null }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      if (!token) {
        console.error("No token available");
        return;
      }
      await logout(token);
      await removeAuth();
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer w-full text-left px-[1.875rem] py-[0.5625rem] text-base hover:bg-background transition-colors flex items-center justify-between"
    >
      Log out
    </button>
  );
}
