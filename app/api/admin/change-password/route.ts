import { NextRequest, NextResponse } from 'next/server';
import { getJWTToken } from '@/lib/auth';

const WP_URL = process.env.WORDPRESS_SITE_URL || '';

export async function PATCH(request: NextRequest) {
    try {
        const token = request.headers.get('x-wp-token');
        if (!token) {
            return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
        }

        const { username, currentPassword, newPassword } = await request.json();

        if (!username || !currentPassword || !newPassword) {
            return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
        }

        // Re-validate current credentials
        const jwt = await getJWTToken(username, currentPassword);
        if (!jwt?.token) {
            return NextResponse.json({ success: false, error: 'Current password is incorrect' }, { status: 401 });
        }

        // Update password via WP REST API
        const res = await fetch(`${WP_URL}/wp-json/wp/v2/users/me`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt.token}`,
            },
            body: JSON.stringify({ password: newPassword }),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            return NextResponse.json(
                { success: false, error: err?.message || 'Failed to update password' },
                { status: res.status }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Change password error:', error);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}
