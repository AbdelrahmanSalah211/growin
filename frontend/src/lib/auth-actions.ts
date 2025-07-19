"use server";

import { IUser } from "@/interfaces/IUser";
import { cookies } from "next/headers";


export async function setToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function setUser(user: IUser) {
  const cookieStore = await cookies();
  cookieStore.set("user", JSON.stringify(user), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null;
}

export async function getUser() {
  const cookieStore = await cookies();
  return cookieStore.get("user")?.value || null;
}

export async function removeAuth() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("user");
}

export async function isLoggedIn() {
  const token = await getToken();
  return !!token;
}

