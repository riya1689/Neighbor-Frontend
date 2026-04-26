import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check if there is a token in the cookies
  const token = request.cookies.get('token')?.value;
  
  // Define protected routes
  const protectedPaths = ['/dashboard', '/select-neighborhood'];
  
  const isProtectedPath = protectedPaths.some((path) => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !token) {
    // If accessing a protected route without a token, redirect to login
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  const authPaths = ['/login', '/register'];
  const isAuthPath = authPaths.some((path) => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isAuthPath && token) {
    // If accessing login/register while authenticated, redirect to dashboard
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/select-neighborhood/:path*', '/login', '/register'],
};
