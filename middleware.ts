import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { toast } from "react-toastify";

const redirect = (req: NextRequest, pathname: string) => {
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = pathname;
  return NextResponse.redirect(redirectUrl);
};

export const middleware = async (request: NextRequest) => {
  try {
    const token = localStorage.getItem("token");
    const pathname = request.nextUrl.pathname;

    if (token) {
      const [expirationTime] = token.split("|").map(Number);

      if (expirationTime && expirationTime > Date.now()) {
        // Token is valid
        return;
      }

      console.log("Token has expired");
      toast.warning("Token has expired")
      localStorage.removeItem("token");
      throw new Error("Token has expired");
    }

    // Redirect logic based on token presence and pathname
    if (pathname !== "/register" && (!token || (pathname === "/" || pathname === "/login"))) {
      return redirect(request, !token ? "/login" : "/user/fundwallet");
    }
  } catch (error:any) {
    console.error("Error:", error.message);
    // Handle other errors if needed
    // return NextResponse({ status: 500, statusText: "Internal Server Error" });
  }
};

export const config = {
  matcher: ["/"],
};
