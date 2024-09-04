import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN } from "./utils/setting";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(ACCESS_TOKEN)?.value;

  // Nếu không có accessToken, chuyển hướng đến trang đăng ký
  if (!accessToken) {
    return NextResponse.redirect(new URL("/register", req.url));
  }
}

// Cấu hình matcher để áp dụng middleware cho tất cả các request
export const config = {
  matcher: "/", // Áp dụng middleware cho mọi route trong ứng dụng
};
