import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const redirect = (req: NextRequest, pathname: string) => {
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = pathname;
  return NextResponse.redirect(redirectUrl);
};

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get("auth")?.value;
  const pathname = request.nextUrl.pathname;
  const user = JSON.parse(request.cookies.get("user")?.value || "{}");

  if (token && (pathname === "/" || pathname === "/login")) {
    return redirect(request, `/profile`);
  }

  if (!token && pathname !== "/register") {
    return redirect(request, "/login");
  }
};

export const config = {
  matcher: ["/"],
};
