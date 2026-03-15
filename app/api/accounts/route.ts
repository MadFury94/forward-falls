import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const WP_URL = process.env.WORDPRESS_SITE_URL || 'https://azure-dugong-563921.hostingersite.com';

function auth(token: string) {
    return { 'Authorization': `Bearer ${token}` };
}

export async function GET(request: NextRequest) {
    const token = request.headers.get('x-wp-token') || '';
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${WP_URL}/wp-json/wp/v2/account_number?acf_format=standard&per_page=100`, { headers });
    if (!res.ok) {
        const err = await res.text();
        return NextResponse.json({ success: false, error: err }, { status: res.status });
    }
    const accounts = await res.json();
    return NextResponse.json({ success: true, accounts });
}

export async function POST(request: NextRequest) {
    const token = request.headers.get('x-wp-token') || '';
    if (!token) return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });

    const body = await request.json();
    const { bank_name, account_number, account_name } = body;
    if (!bank_name || !account_number || !account_name)
        return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });

    const res = await fetch(`${WP_URL}/wp-json/wp/v2/account_number`, {
        method: 'POST',
        headers: { ...auth(token), 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: bank_name,
            status: 'publish',
            acf: { bank_name, account_number: String(account_number), account_name },
        }),
    });

    if (!res.ok) {
        const err = await res.json();
        return NextResponse.json({ success: false, error: err.message || 'Failed to create' }, { status: 400 });
    }
    const post = await res.json();
    return NextResponse.json({ success: true, account: { id: post.id } });
}
