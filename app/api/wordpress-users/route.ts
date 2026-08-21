import { NextRequest, NextResponse } from 'next/server';
import { createWordPressUser, getWordPressUsers, testWordPressConnection } from '@/lib/wordpress';

// Both routes require a valid admin JWT token passed as x-wp-token.
// This endpoint deals with WordPress user management — never expose it publicly.

function getToken(request: NextRequest): string {
    return request.headers.get('x-wp-token') || '';
}

export async function GET(request: NextRequest) {
    const token = getToken(request);
    if (!token) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    try {
        // Verify the token is still valid against WordPress before proceeding
        const WP_URL = process.env.WORDPRESS_SITE_URL || '';
        const meRes = await fetch(`${WP_URL}/wp-json/wp/v2/users/me`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!meRes.ok) {
            return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
        }

        const users = await getWordPressUsers();
        return NextResponse.json({ success: true, users });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const token = getToken(request);
    if (!token) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    try {
        // Verify the token and confirm the caller is an administrator
        const WP_URL = process.env.WORDPRESS_SITE_URL || '';
        const meRes = await fetch(`${WP_URL}/wp-json/wp/v2/users/me?context=edit`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!meRes.ok) {
            return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
        }
        const me = await meRes.json();
        if (!me.roles?.includes('administrator')) {
            return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
        }

        const { username, email, password, role } = await request.json();

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: 'Username, email, and password are required' },
                { status: 400 }
            );
        }

        const user = await createWordPressUser(username, email, password, role);

        if (!user) {
            return NextResponse.json(
                { error: 'Failed to create user. User may already exist.' },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.roles[0],
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}
