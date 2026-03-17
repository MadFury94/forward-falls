import { NextRequest, NextResponse } from 'next/server';
import { createWordPressUser, getWordPressUsers, testWordPressConnection } from '@/lib/wordpress';

export async function GET() {
    try {
        const isConnected = await testWordPressConnection();

        if (!isConnected) {
            return NextResponse.json(
                { error: 'Failed to connect to WordPress' },
                { status: 401 }
            );
        }

        const users = await getWordPressUsers();
        return NextResponse.json({ success: true, users });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
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
                role: user.roles[0]
            }
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}