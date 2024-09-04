import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN } from "./utils/setting";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(ACCESS_TOKEN)?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL("/register", req.url));
  }
}

export const config = {
  matcher: "/",
};
