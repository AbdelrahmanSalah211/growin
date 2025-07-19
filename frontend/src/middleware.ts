// src/app/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken, getUser } from "@/lib/auth-actions";
import { getIsEnrolledInCourse } from "@/services/userEntrollmentsService";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken();
  const stringifiedUser = await getUser();
  const user = stringifiedUser ? JSON.parse(stringifiedUser) : null;

  // Debug logging
  console.log("Middleware running for:", pathname);
  console.log("User mode:", user?.userMode);

  // 1. First check - handle instructors with strict access
  if (token && user?.userMode === "instructor") {
    // Only allow these exact route patterns
    if (
      pathname.startsWith("/instructor") ||
      pathname.startsWith("/me/settings")
    ) {
      return NextResponse.next();
    }
    // Block all other routes including home, search, etc.
    return NextResponse.redirect(new URL("/instructor", request.url));
  }

  // 2. Open routes (only for non-instructors)
  const openRoutes = ["/", "/search", /^\/course\/[^\/]+$/];
  if (
    openRoutes.some((route) =>
      typeof route === "string" ? pathname === route : route.test(pathname)
    )
  ) {
    return NextResponse.next();
  }

  // 3. Guest-only routes
  const guestOnlyRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/reset-password",
    "/auth/forgot-password",
  ];
  if (guestOnlyRoutes.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // 4. Protected routes (regular users)
  const protectedRoutes = ["/me", "/me/cart", "/me/learning", "/me/settings"];
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(
        new URL(
          `/auth/login?returnTo=${encodeURIComponent(pathname)}`,
          request.url
        )
      );
    }
    return NextResponse.next();
  }

  // 5. Enrolled-only routes
  const lectureRoutePattern = /^\/course\/[^\/]+\/lecture\/[^\/]+$/;
  if (lectureRoutePattern.test(pathname)) {
    if (!token) {
      return NextResponse.redirect(
        new URL(
          `/auth/login?returnTo=${encodeURIComponent(pathname)}`,
          request.url
        )
      );
    }
    try {
      const { enrolled } = await getIsEnrolledInCourse(
        pathname.split("/")[2],
        token
      );
      return enrolled
        ? NextResponse.next()
        : NextResponse.redirect(new URL("/404", request.url));
    } catch (error) {
      console.error("Enrollment check failed:", error);
      return NextResponse.redirect(new URL("/404", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
