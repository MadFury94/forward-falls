import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const WP_URL = process.env.WORDPRESS_SITE_URL || 'https://azure-dugong-563921.hostingersite.com';

function auth(token: string) {
    return { 'Authorization': `Bearer ${token}` };
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const token = request.headers.get('x-wp-token') || '';
    if (!token) return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });

    const body = await request.json();
    const { bank_name, account_number, account_name } = body;

    const res = await fetch(`${WP_URL}/wp-json/wp/v2/account_number/${id}`, {
        method: 'POST',
        headers: { ...auth(token), 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...(bank_name ? { title: bank_name } : {}),
            acf: {
                ...(bank_name !== undefined ? { bank_name } : {}),
                ...(account_number !== undefined ? { account_number: String(account_number) } : {}),
                ...(account_name !== undefined ? { account_name } : {}),
            },
        }),
    });

    if (!res.ok) {
        const err = await res.json();
        return NextResponse.json({ success: false, error: err.message }, { status: 400 });
    }
    return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const token = request.headers.get('x-wp-token') || '';
    if (!token) return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });

    const res = await fetch(`${WP_URL}/wp-json/wp/v2/account_number/${id}?force=true`, {
        method: 'DELETE',
        headers: auth(token),
    });

    if (!res.ok) return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 400 });
    return NextResponse.json({ success: true });
}
