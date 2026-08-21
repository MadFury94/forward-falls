import { NextRequest, NextResponse } from 'next/server';

const WP_URL = process.env.WORDPRESS_SITE_URL || '';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email || typeof email !== 'string') {
            return NextResponse.json(
                { success: false, error: 'Email address is required' },
                { status: 400 }
            );
        }

        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // WordPress has a built-in lost password endpoint
        // POST /wp-login.php?action=lostpassword with user_login
        const body = new URLSearchParams({
            user_login: email,
            redirect_to: '',
            action: 'lostpassword',
        });

        const res = await fetch(`${WP_URL}/wp-login.php?action=lostpassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
            redirect: 'manual', // WP redirects on success — treat any redirect as success
        });

        // WP returns a 302 redirect on success, 200 with an error page on failure.
        // We always return a vague success message to prevent user enumeration.
        if (res.status === 302 || res.ok) {
            return NextResponse.json({
                success: true,
                message: 'If that email is registered, a password reset link has been sent.',
            });
        }

        // On unexpected error, still return vague message
        return NextResponse.json({
            success: true,
            message: 'If that email is registered, a password reset link has been sent.',
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        // Return vague success even on error to prevent enumeration
        return NextResponse.json({
            success: true,
            message: 'If that email is registered, a password reset link has been sent.',
        });
    }
}
