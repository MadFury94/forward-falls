import { NextRequest, NextResponse } from 'next/server';

const WP_URL = process.env.WORDPRESS_SITE_URL || '';

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (!pathname.startsWith('/admin-dashboard')) {
        return NextResponse.next();
    }

    const token = request.cookies.get('wp_token')?.value;

    // No token at all — redirect to login
    if (!token) {
        const loginUrl = new URL('/admin-login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Validate the token against WordPress
    try {
        const res = await fetch(`${WP_URL}/wp-json/jwt-auth/v1/token/validate`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!res.ok) {
            // Token is invalid or expired — clear it and redirect
            const loginUrl = new URL('/admin-login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            const response = NextResponse.redirect(loginUrl);
            response.cookies.set('wp_token', '', { maxAge: 0, path: '/' });
            return response;
        }
    } catch {
        // If WordPress is unreachable, fail open so the dashboard stays accessible
        // but log for monitoring. In a stricter setup you'd fail closed here.
        console.error('Middleware: could not reach WordPress to validate token');
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin-dashboard/:path*'],
};
