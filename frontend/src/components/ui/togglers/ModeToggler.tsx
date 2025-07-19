"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { switchUserMode } from "@/services/userService";
import { useAuthStore } from "@/stores/authStore";
import { setToken, setUser } from "@/lib/auth-actions";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";
import { useRouter } from "next/navigation";

export default function ModeToggler() {
  useHydrateAuth();
  const { token, user } = useAuthStore();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(user?.userMode === "instructor");
  }, [user]);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setChecked(e.target.checked);
      const data = await switchUserMode(token!);

      // Update both client and server state
      await setToken(data.accessToken);
      await setUser(data.user);

      // Force a full page reload to ensure middleware re-runs
      if (data.user.userMode === "instructor") {
        window.location.href = "/instructor";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Failed to switch mode:", error);
      setChecked(!e.target.checked); // Revert UI on error
    }
  };

  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="relative w-9 h-[1.1875rem] bg-surface border border-secondary-text checked:border-primary-text rounded-full appearance-none cursor-pointer
        before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0.5 before:w-4 before:h-4 before:bg-secondary-text checked:before:bg-surface before:rounded-full before:transition-transform
        checked:bg-primary-text
        checked:before:translate-x-4"
      />
    </label>
  );
}
