import { NextRequest, NextResponse } from 'next/server';

const WP_URL = process.env.WORDPRESS_SITE_URL || 'https://azure-dugong-563921.hostingersite.com';

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

        const buffer = await file.arrayBuffer();

        const res = await fetch(`${WP_URL}/wp-json/wp/v2/media`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Disposition': `attachment; filename="${encodeURIComponent(file.name)}"`,
                'Content-Type': file.type,
            },
            body: buffer,
        });

        const responseText = await res.text();
        console.log('WP Media upload status:', res.status, responseText);

        if (!res.ok) {
            let errMessage = `WordPress returned ${res.status}`;
            try {
                const err = JSON.parse(responseText);
                errMessage = err.message || err.code || errMessage;
            } catch { }
            return NextResponse.json({ success: false, error: errMessage }, { status: 400 });
        }

        const media = JSON.parse(responseText);
        return NextResponse.json({ success: true, id: media.id, url: media.source_url });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
