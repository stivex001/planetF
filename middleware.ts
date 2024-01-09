import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
  try {
    const loggedin = request.cookies.get("token");
    const pathname = request.nextUrl.pathname;

    if (
      !loggedin &&
      pathname !== "/login" &&
      pathname !== "/register" &&
      pathname !== "/forgotpassword"
    ) {
      // If not logged in and not on the allowed pages, redirect to the login page
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (loggedin && (pathname === "/login" || pathname === "/")) {
      return NextResponse.redirect(new URL("/user", request.url));
    }

    // Allow the user to continue to the requested page
    return NextResponse.next();
  } catch (error: any) {
    console.error("Error:", error.message);
    // Handle other errors if needed
    // return NextResponse({ status: 500, statusText: "Internal Server Error" });
  }
};

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
