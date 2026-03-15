import { NextRequest, NextResponse } from 'next/server';
import { getJWTToken } from '@/lib/auth';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { success: false, error: 'Username/email and password are required' },
                { status: 400 }
            );
        }

        // WordPress JWT plugin accepts both username and email directly
        const jwt = await getJWTToken(username, password);

        if (!jwt || !jwt.token) {
            return NextResponse.json(
                { success: false, error: 'Invalid username/email or password' },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            token: jwt.token,
            user: {
                email: jwt.user_email,
                username: jwt.user_nicename,
                name: jwt.user_display_name,
            },
        });
    } catch (error) {
        console.error('JWT auth error:', error);
        return NextResponse.json(
            { success: false, error: 'Authentication failed' },
            { status: 500 }
        );
    }
}
