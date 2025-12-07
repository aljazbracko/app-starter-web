import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const protectedRoutes = ['/profile', '/dashboard'];


const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const pathname = request.nextUrl.pathname;

  
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (token) {
  
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Check if user is trying to access protected routes without auth
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      // User is not logged in, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
