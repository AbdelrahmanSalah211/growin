import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Read cookies
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((cookie) => cookie.split("="))
  );

  const token = cookies["token"] || null;
  const user = cookies["user"]
    ? JSON.parse(decodeURIComponent(cookies["user"]))
    : null;

  return NextResponse.json({ token, user });
}
