import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { toast } from "react-toastify";


export const middleware = async (request: NextRequest) => {
  try {
    const loggedin = request.cookies.get("token");
    const pathname = request.nextUrl.pathname;

    if (loggedin && (pathname === "/login" || pathname === "/")) {
      return NextResponse.redirect(new URL("/user/fundwallet", request.url));
    }


    
    // if (pathname !== "/register" && (!token || (pathname === "/" || pathname === "/login"))) {
    //   return redirect(request, !token ? "/login" : "/user/fundwallet");
    // }
  } catch (error:any) {
    console.error("Error:", error.message);
    // Handle other errors if needed
    // return NextResponse({ status: 500, statusText: "Internal Server Error" });
  }
};

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
