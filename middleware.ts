// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define protected routes
const protectedPaths = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtected = protectedPaths.some((p) => path.startsWith(p));

  if (!isProtected) return NextResponse.next();

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Match only dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
