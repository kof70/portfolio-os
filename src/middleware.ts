import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function getClientIp(request: NextRequest): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

export function middleware(request: NextRequest) {
  const now = new Date().toISOString();
  const ip = getClientIp(request);
  const ua = request.headers.get("user-agent") || "unknown";
  const { pathname, search } = request.nextUrl;
  const pathWithQuery = `${pathname}${search}`;

  console.log(
    `[http] ${now} ${request.method} ${pathWithQuery} ip=${ip} ua="${ua}"`,
  );

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|opengraph-image|twitter-image|assets|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml)$).*)",
  ],
};
