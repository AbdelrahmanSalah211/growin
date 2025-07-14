import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/lib/auth-actions";

/**
 * Global authentication guard middleware
 * Protects all routes except /auth/*
 */
export async function middleware(request: NextRequest) {
  const token = await getToken();
  const pathname = request.nextUrl.pathname;

  if (!token && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
