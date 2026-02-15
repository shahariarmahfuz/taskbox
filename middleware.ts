import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/src/server/auth/jwt";

const PROTECTED_USER_PREFIXES = ["/dashboard"];
const PROTECTED_ADMIN_PREFIXES = ["/admin"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isUserProtected = PROTECTED_USER_PREFIXES.some((p) => pathname.startsWith(p));
  const isAdminProtected = PROTECTED_ADMIN_PREFIXES.some((p) => pathname.startsWith(p));

  if (!isUserProtected && !isAdminProtected) return NextResponse.next();

  const token = req.cookies.get("session")?.value;
  const payload = token ? verifySessionToken(token) : null;

  if (!payload) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isAdminProtected && payload.role !== "ADMIN") {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"]
};
