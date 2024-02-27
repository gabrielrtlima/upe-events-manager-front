import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const url = request.nextUrl.clone();
  if (!token && url.pathname.startsWith("/admin")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (token && url.pathname === "/") {
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }
}

const tokenIsValid = (token: string) => {
  ///
};
