import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const secret = req.headers.get('x-revalidate-secret');
    if (secret !== process.env.REVALIDATE_SECRET) {
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
        revalidateTag(tag, 'default');
        revalidatedTags.push(tag);
    }

    if (revalidatedPaths.length === 0 && revalidatedTags.length === 0) {
        revalidatePath('/');
        revalidatedPaths.push('/');
    }

    return NextResponse.json({ revalidatedPaths, revalidatedTags });
}
