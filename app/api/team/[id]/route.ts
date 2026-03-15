import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const WP_URL = process.env.WORDPRESS_SITE_URL || 'https://azure-dugong-563921.hostingersite.com';

function auth(token: string) {
    return { 'Authorization': `Bearer ${token}` };
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const token = request.headers.get('x-wp-token') || '';

    const res = await fetch(`${WP_URL}/wp-json/wp/v2/team-member/${id}?acf_format=standard&_embed=wp:featuredmedia`, {
        headers: auth(token),
    });

    if (!res.ok) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    const member = await res.json();
    return NextResponse.json({ success: true, member });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const token = request.headers.get('x-wp-token') || '';
    if (!token) return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });

    const body = await request.json();
    const { name, roles, featured_media, menu_order } = body;

    const wpPayload: Record<string, any> = {
        acf: {
            name: name || '',
            role: roles !== undefined ? roles : '',
        },
    };
    if (name) wpPayload.title = name;
    if (featured_media) wpPayload.featured_media = Number(featured_media);
    if (menu_order !== undefined) wpPayload.menu_order = Number(menu_order);

    const res = await fetch(`${WP_URL}/wp-json/wp/v2/team-member/${id}`, {
        method: 'POST',
        headers: { ...auth(token), 'Content-Type': 'application/json' },
        body: JSON.stringify(wpPayload),
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

    const res = await fetch(`${WP_URL}/wp-json/wp/v2/team-member/${id}?force=true`, {
        method: 'DELETE',
        headers: auth(token),
    });

    if (!res.ok) return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 400 });
    return NextResponse.json({ success: true });
}
