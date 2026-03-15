import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const WP_URL = process.env.WORDPRESS_SITE_URL || 'https://azure-dugong-563921.hostingersite.com';

function auth(token: string) {
    return { 'Authorization': `Bearer ${token}` };
}

export async function GET(request: NextRequest) {
    try {
        const token = request.headers.get('x-wp-token') || '';
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page') || '1';
        const search = searchParams.get('search') || '';
        const mediaType = searchParams.get('media_type') || 'image';

        const qs = new URLSearchParams({
            per_page: '40',
            page,
            media_type: mediaType,
            orderby: 'date',
            order: 'desc',
            ...(search ? { search } : {}),
        });

        const res = await fetch(`${WP_URL}/wp-json/wp/v2/media?${qs}`, {
            headers: auth(token),
        });

        if (!res.ok) return NextResponse.json({ success: false, error: 'Failed to fetch' }, { status: res.status });

        const items = await res.json();
        const total = Number(res.headers.get('X-WP-Total') || 0);
        const totalPages = Number(res.headers.get('X-WP-TotalPages') || 0);
        return NextResponse.json({ success: true, items, total, totalPages });
    } catch {
        return NextResponse.json({ success: false, error: 'Failed to fetch media' }, { status: 500 });
    }
}
