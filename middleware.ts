import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
const redirect = (req: NextRequest, pathname:string) => {
    const redirectUrl = req.nextUrl.clone(); 
    redirectUrl.pathname = pathname
    return NextResponse.redirect(redirectUrl)
}

export const middleware = async (request: NextRequest) => {
    const response = NextResponse.next()
    const token = request.cookies.get('auth')?.value
    const pathname = request.nextUrl.pathname

    if(!token && pathname !== '/auth/signup') {
        return redirect(request, '/auth/signin');
    }
}
// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL('/home', request.url))
// }
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
}