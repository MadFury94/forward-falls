import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const WP_URL = process.env.WORDPRESS_SITE_URL || 'https://azure-dugong-563921.hostingersite.com';

function auth(token: string) {
    return { 'Authorization': `Bearer ${token}` };
}

export async function GET(request: NextRequest) {
    try {
        const token = request.headers.get('x-wp-token') || '';

        const qs = new URLSearchParams({
            acf_format: 'standard',
            _embed: 'wp:featuredmedia',
            per_page: '100',
        });

        // Only send auth header if token is present — empty Bearer header can cause WP to reject
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${WP_URL}/wp-json/wp/v2/team-member?${qs}`, { headers });

        if (!res.ok) {
            const err = await res.text();
            return NextResponse.json({ success: false, error: err, url: `${WP_URL}/wp-json/wp/v2/team-member` }, { status: res.status });
        }

        const members = await res.json();
        const total = Number(res.headers.get('X-WP-Total') || 0);
        return NextResponse.json({ success: true, members, total });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e?.message || 'Failed to fetch team members' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const token = request.headers.get('x-wp-token') || '';
        if (!token) return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });

        const body = await request.json();
        const { name, title, featured_media, menu_order, acf } = body;

        if (!name) return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });

        const postRes = await fetch(`${WP_URL}/wp-json/wp/v2/team-member`, {
            method: 'POST',
            headers: { ...auth(token), 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: name,
                status: 'publish',
                ...(featured_media ? { featured_media: Number(featured_media) } : {}),
                ...(menu_order !== undefined ? { menu_order: Number(menu_order) } : {}),
            }),
        });

        if (!postRes.ok) {
            const err = await postRes.json();
            return NextResponse.json({ success: false, error: err.message || 'Failed to create' }, { status: 400 });
        }

        const post = await postRes.json();

        // Update ACF fields
        const acfFields: Record<string, any> = {};
        if (name) acfFields.name = name;
        if (title) acfFields.title = title;
        if (acf?.member_image) acfFields.member_image = acf.member_image;

        if (Object.keys(acfFields).length > 0) {
            await fetch(`${WP_URL}/wp-json/wp/v2/team-member/${post.id}`, {
                method: 'POST',
                headers: { ...auth(token), 'Content-Type': 'application/json' },
                body: JSON.stringify({ acf: acfFields }),
            });
        }

        return NextResponse.json({ success: true, member: { id: post.id } });
    } catch {
        return NextResponse.json({ success: false, error: 'Failed to create team member' }, { status: 500 });
    }
}
