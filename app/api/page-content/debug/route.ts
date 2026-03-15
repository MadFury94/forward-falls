import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const WP_URL = process.env.WORDPRESS_SITE_URL || 'https://azure-dugong-563921.hostingersite.com';

// GET /api/page-content/debug        — reads current WP options
// GET /api/page-content/debug?write=1 — writes a test value then reads back
export async function GET(request: NextRequest) {
    const doWrite = request.nextUrl.searchParams.get('write') === '1';

    // Step 1: optionally POST a test value
    let writeResult: { status: number; body: string } | null = null;
    if (doWrite) {
        try {
            const res = await fetch(`${WP_URL}/wp-json/ffi/v1/homepage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ about_eyebrow: 'TEST_VALUE_' + Date.now() }),
            });
            const text = await res.text();
            writeResult = { status: res.status, body: text };
        } catch (e) {
            writeResult = { status: 0, body: String(e) };
        }
    }

    // Step 2: read back current values
    let readResult: { status: number; body: unknown } = { status: 0, body: null };
    try {
        const res = await fetch(`${WP_URL}/wp-json/ffi/v1/homepage`, {
            cache: 'no-store',
        });
        const json = await res.json();
        readResult = { status: res.status, body: json };
    } catch (e) {
        readResult = { status: 0, body: String(e) };
    }

    return NextResponse.json({ writeResult, readResult });
}
