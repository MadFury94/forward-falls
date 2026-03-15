import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const WP_URL = process.env.WORDPRESS_SITE_URL || 'https://azure-dugong-563921.hostingersite.com';

function auth(token: string) {
    return { 'Authorization': `Bearer ${token}` };
}

// GET single post
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const token = request.headers.get('x-wp-token') || '';

    const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts/${id}?acf_format=standard&_embed=wp:featuredmedia,author`, {
        headers: auth(token),
    });

    if (!res.ok) return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    const post = await res.json();
    return NextResponse.json({ success: true, post });
}

// PATCH update post (status, content, acf, etc.)
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const token = request.headers.get('x-wp-token') || '';
    if (!token) return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });

    const body = await request.json();
    const { title, content, status, acf, featured_media } = body;

    const wpPayload: Record<string, any> = {};
    if (title !== undefined) wpPayload.title = title;
    if (content !== undefined) wpPayload.content = content;
    if (status !== undefined) wpPayload.status = status;
    // Accept featured_media at top level or legacy acf.featured_image
    const featuredMediaId = featured_media || acf?.featured_image || null;
    if (featuredMediaId) wpPayload.featured_media = Number(featuredMediaId);

    const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts/${id}`, {
        method: 'POST',
        headers: { ...auth(token), 'Content-Type': 'application/json' },
        body: JSON.stringify(wpPayload),
    });

    if (!res.ok) {
        const err = await res.json();
        return NextResponse.json({ success: false, error: err.message }, { status: 400 });
    }

    // Update ACF fields
    const acfFields: Record<string, any> = {};
    if (acf?.summary !== undefined) acfFields.summary = acf.summary;
    if (acf?.category !== undefined) acfFields.category = acf.category;
    if (acf?.author_name !== undefined) acfFields.author_name = acf.author_name;

    if (Object.keys(acfFields).length > 0) {
        await fetch(`${WP_URL}/wp-json/wp/v2/posts/${id}`, {
            method: 'POST',
            headers: { ...auth(token), 'Content-Type': 'application/json' },
            body: JSON.stringify({ acf: acfFields }),
        });
    }

    const post = await res.json();
    return NextResponse.json({ success: true, post: { id: post.id, slug: post.slug, status: post.status } });
}

// DELETE post (trash or permanent)
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const token = request.headers.get('x-wp-token') || '';
    if (!token) return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';

    const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts/${id}${force ? '?force=true' : ''}`, {
        method: 'DELETE',
        headers: auth(token),
    });

    if (!res.ok) return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 400 });
    return NextResponse.json({ success: true });
}
