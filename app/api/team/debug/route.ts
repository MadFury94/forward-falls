import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const WP_URL = process.env.WORDPRESS_SITE_URL || 'https://azure-dugong-563921.hostingersite.com';

export async function GET(request: NextRequest) {
    const token = request.headers.get('x-wp-token') || '';
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(
        `${WP_URL}/wp-json/wp/v2/team-member?acf_format=standard&_embed=wp:featuredmedia&per_page=3`,
        { headers }
    );

    const raw = await res.json();

    // Return just the fields we care about for each member
    const simplified = Array.isArray(raw) ? raw.map((m: any) => ({
        id: m.id,
        wp_title: m.title?.rendered,
        menu_order: m.menu_order,
        acf: m.acf,
        all_keys: Object.keys(m),
    })) : raw;

    return NextResponse.json({ status: res.status, members: simplified });
}
