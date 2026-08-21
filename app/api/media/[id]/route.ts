import { NextRequest, NextResponse } from 'next/server';
import { validateId } from '@/lib/validate-id';

const WP_URL = process.env.WORDPRESS_SITE_URL || '';
const auth = (token: string) => ({ 'Authorization': `Bearer ${token}` });

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const check = validateId(id);
    if (!check.valid) return check.response;

    const token = request.headers.get('x-wp-token') || '';
    if (!token) return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });

    const res = await fetch(`${WP_URL}/wp-json/wp/v2/media/${id}?force=true`, {
        method: 'DELETE',
        headers: auth(token),
    });

    if (!res.ok) return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 400 });
    return NextResponse.json({ success: true });
}
