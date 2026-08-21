import { NextRequest, NextResponse } from 'next/server';
import { getJWTToken } from '@/lib/auth';
import { authLimiter } from '@/lib/rate-limit';

const COOKIE_NAME = 'wp_token';
const COOKIE_MAX_AGE = 86400; // 24 hours

// POST /api/wordpress-auth — authenticate and set HttpOnly cookie
export async function POST(request: NextRequest) {
    try {
        // Rate limit by IP — max 10 attempts per minute
        const ip =
            request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
            request.headers.get('x-real-ip') ||
            'unknown';

        if (!authLimiter.check(ip)) {
            return NextResponse.json(
                { success: false, error: 'Too many login attempts. Please wait a minute and try again.' },
                {
                    status: 429,
                    headers: { 'Retry-After': String(authLimiter.retryAfter(ip)) },
                }
            );
        }

        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { success: false, error: 'Username/email and password are required' },
                { status: 400 }
            );
        }

        const jwt = await getJWTToken(username, password);

        if (!jwt || !jwt.token) {
            return NextResponse.json(
                { success: false, error: 'Invalid username/email or password' },
                { status: 401 }
            );
        }

        const response = NextResponse.json({
            success: true,
            // Token is still returned so client can store it for API calls
            // that use x-wp-token header (e.g. media upload, post creation)
            token: jwt.token,
            user: {
                email: jwt.user_email,
                username: jwt.user_nicename,
                name: jwt.user_display_name,
            },
        });

        // Set HttpOnly cookie — not readable by JavaScript, protects against XSS
        response.cookies.set(COOKIE_NAME, jwt.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: COOKIE_MAX_AGE,
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('JWT auth error:', error);
        return NextResponse.json(
            { success: false, error: 'Authentication failed' },
            { status: 500 }
        );
    }
}

// DELETE /api/wordpress-auth — clear the session cookie on logout
export async function DELETE() {
    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
    });
    return response;
}
