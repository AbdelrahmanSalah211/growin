import { logout } from "@/services/authService";
import { removeAuth } from "./auth-actions";
import { redirect } from "next/navigation";


export async function handleLogout(token: string | null) {
  if (!token) {
    throw new Error("No token provided for logout");
  }
  await logout(token);
  await removeAuth();
  redirect("/auth/login");
}