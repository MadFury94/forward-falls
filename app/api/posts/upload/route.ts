import { NextRequest, NextResponse } from 'next/server';

const WP_URL = process.env.WORDPRESS_SITE_URL || '';

// Allowed MIME types for uploads
const ALLOWED_TYPES = new Set([
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
]);

// Max file size: 5 MB
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

// Allowed file extensions (defence-in-depth alongside MIME check)
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']);

export async function POST(request: NextRequest) {
    try {
        const token = request.headers.get('x-wp-token');
        if (!token) {
            return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
        }

        // Validate file size
        if (file.size > MAX_SIZE_BYTES) {
            return NextResponse.json(
                { success: false, error: 'File too large. Maximum size is 5 MB.' },
                { status: 400 }
            );
        }

        // Validate MIME type (browser-reported — first line of defence)
        if (!ALLOWED_TYPES.has(file.type)) {
            return NextResponse.json(
                { success: false, error: 'File type not allowed. Only images (JPEG, PNG, GIF, WebP, SVG) are accepted.' },
                { status: 400 }
            );
        }

        // Validate file extension
        const originalName = file.name.toLowerCase();
        const ext = originalName.substring(originalName.lastIndexOf('.'));
        if (!ALLOWED_EXTENSIONS.has(ext)) {
            return NextResponse.json(
                { success: false, error: 'File extension not allowed.' },
                { status: 400 }
            );
        }

        // Sanitise filename — keep only alphanumeric, dots, hyphens, underscores
        const safeName = file.name
            .replace(/[^a-zA-Z0-9._-]/g, '-')
            .replace(/-{2,}/g, '-')
            .slice(0, 200);

        const buffer = await file.arrayBuffer();

        const res = await fetch(`${WP_URL}/wp-json/wp/v2/media`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Disposition': `attachment; filename="${encodeURIComponent(safeName)}"`,
                'Content-Type': file.type,
            },
            body: buffer,
        });

        const responseText = await res.text();

        if (!res.ok) {
            let errMessage = `WordPress returned ${res.status}`;
            try {
                const err = JSON.parse(responseText);
                errMessage = err.message || err.code || errMessage;
            } catch { /* response was not JSON */ }
            return NextResponse.json({ success: false, error: errMessage }, { status: 400 });
        }

        const media = JSON.parse(responseText);
        return NextResponse.json({ success: true, id: media.id, url: media.source_url });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
    }
}
