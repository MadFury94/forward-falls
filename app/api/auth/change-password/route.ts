import { NextRequest, NextResponse } from 'next/server';

const WP_URL = process.env.WORDPRESS_SITE_URL || '';

export async function POST(request: NextRequest) {
    try {
        const token = request.headers.get('x-wp-token') || '';
        if (!token) {
            return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
        }

        const { currentPassword, newPassword } = await request.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { success: false, error: 'Current password and new password are required' },
                { status: 400 }
            );
        }

        if (newPassword.length < 8) {
            return NextResponse.json(
                { success: false, error: 'New password must be at least 8 characters' },
                { status: 400 }
            );
        }

        // Step 1: get the current user's ID and username from WP using their token
        const meRes = await fetch(`${WP_URL}/wp-json/wp/v2/users/me`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!meRes.ok) {
            return NextResponse.json(
                { success: false, error: 'Could not verify current session' },
                { status: 401 }
            );
        }

        const me = await meRes.json();
        const userId: number = me.id;
        const username: string = me.slug;

        // Step 2: verify the current password is correct by re-authenticating
        const verifyRes = await fetch(`${WP_URL}/wp-json/jwt-auth/v1/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password: currentPassword }),
        });

        if (!verifyRes.ok) {
            return NextResponse.json(
                { success: false, error: 'Current password is incorrect' },
                { status: 400 }
            );
        }

        // Step 3: update the password via WP REST API
        const updateRes = await fetch(`${WP_URL}/wp-json/wp/v2/users/${userId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: newPassword }),
        });

        if (!updateRes.ok) {
            const err = await updateRes.json();
            return NextResponse.json(
                { success: false, error: err.message || 'Failed to update password' },
                { status: 400 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Change password error:', error);
        return NextResponse.json(
            { success: false, error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
