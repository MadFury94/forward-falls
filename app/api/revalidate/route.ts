import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const secret = req.headers.get('x-revalidate-secret');
    const expected = process.env.REVALIDATE_SECRET;

    // Fail if secret is not configured — never allow unauthenticated revalidation
    if (!expected) {
        console.error('REVALIDATE_SECRET env var is not set');
        return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    if (!secret || secret !== expected) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({ paths: ['/'] }));
    const { paths, tags } = body as { paths?: string[]; tags?: string[] };

    const revalidatedPaths: string[] = [];
    for (const path of (paths ?? [])) {
        revalidatePath(path);
        revalidatedPaths.push(path);
    }

    // Fix: was incorrectly calling revalidatePath instead of revalidateTag
    const revalidatedTags: string[] = [];
    for (const tag of (tags ?? [])) {
        revalidateTag(tag);
        revalidatedTags.push(tag);
    }

    if (revalidatedPaths.length === 0 && revalidatedTags.length === 0) {
        revalidatePath('/');
        revalidatedPaths.push('/');
    }

    return NextResponse.json({ revalidatedPaths, revalidatedTags });
}
