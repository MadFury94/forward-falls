import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const WP_URL = process.env.WORDPRESS_SITE_URL || 'https://azure-dugong-563921.hostingersite.com';

function authHeader(token: string) {
    return { 'Authorization': `Bearer ${token}` };
}

export async function GET(request: NextRequest) {
    try {
        const token = request.headers.get('x-wp-token') || '';
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status') || 'publish';
        const search = searchParams.get('search') || '';
        const page = searchParams.get('page') || '1';

        const qs = new URLSearchParams({
            acf_format: 'standard',
            _embed: 'wp:featuredmedia',
            per_page: '50',
            page,
            status,
            ...(search ? { search } : {}),
        });

        const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts?${qs}`, {
            headers: authHeader(token),
        });

        if (!res.ok) return NextResponse.json({ success: false, error: 'Failed to fetch' }, { status: res.status });
        const posts = await res.json();
        const total = Number(res.headers.get('X-WP-Total') || 0);
        return NextResponse.json({ success: true, posts, total });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch posts' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const token = request.headers.get('x-wp-token') || '';
        if (!token) return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });

        const body = await request.json();
        const { title, content, status = 'publish', acf, featured_media } = body;

        if (!title) return NextResponse.json({ success: false, error: 'Title is required' }, { status: 400 });

        const featuredMediaId = featured_media || acf?.featured_image || null;

        // Create post with native featured_media
        const postRes = await fetch(`${WP_URL}/wp-json/wp/v2/posts`, {
            method: 'POST',
            headers: { ...authHeader(token), 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                content,
                status,
                ...(featuredMediaId ? { featured_media: Number(featuredMediaId) } : {}),
            }),
        });

        if (!postRes.ok) {
            const err = await postRes.json();
            return NextResponse.json({ success: false, error: err.message || 'Failed to create post' }, { status: 400 });
        }

        const post = await postRes.json();

        // Update ACF fields (summary, category, author_name)
        const acfFields: Record<string, any> = {};
        if (acf?.summary) acfFields.summary = acf.summary;
        if (acf?.category) acfFields.category = acf.category;
        if (acf?.author_name) acfFields.author_name = acf.author_name;

        if (Object.keys(acfFields).length > 0) {
            const acfRes = await fetch(`${WP_URL}/wp-json/wp/v2/posts/${post.id}`, {
                method: 'POST',
                headers: { ...authHeader(token), 'Content-Type': 'application/json' },
                body: JSON.stringify({ acf: acfFields }),
            });
            console.log('ACF update:', acfRes.status, await acfRes.text());
        }

        return NextResponse.json({ success: true, post: { id: post.id, slug: post.slug, title: post.title.rendered } });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create post' }, { status: 500 });
    }
}
