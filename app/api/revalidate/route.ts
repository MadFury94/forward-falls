import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const secret = req.headers.get('x-revalidate-secret');
    const expected = process.env.REVALIDATE_SECRET || process.env.NEXT_PUBLIC_REVALIDATE_SECRET || 'ffi-revalidate-2026';
    if (secret !== expected) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({ paths: ['/'] }));
    const { paths, tags } = body as { paths?: string[]; tags?: string[] };

    const revalidatedPaths: string[] = [];
    for (const path of (paths ?? [])) {
        revalidatePath(path);
        revalidatedPaths.push(path);
    }

    const revalidatedTags: string[] = [];
    for (const tag of (tags ?? [])) {
        revalidatePath('/', 'page');
        revalidatedTags.push(tag);
    }

    if (revalidatedPaths.length === 0 && revalidatedTags.length === 0) {
        revalidatePath('/');
        revalidatedPaths.push('/');
    }

    return NextResponse.json({ revalidatedPaths, revalidatedTags });
}
