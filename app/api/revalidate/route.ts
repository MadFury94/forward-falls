import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const secret = req.headers.get('x-revalidate-secret');
    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { paths, tags } = await req.json().catch(() => ({ paths: ['/'], tags: [] }));

    const revalidatedPaths: string[] = [];
    const revalidatedTags: string[] = [];

    for (const path of (paths ?? ['/'])) {
        revalidatePath(path);
        revalidatedPaths.push(path);
    }

    for (const tag of (tags ?? [])) {
        revalidateTag(tag);
        revalidatedTags.push(tag);
    }

    return NextResponse.json({ revalidated: true, paths: revalidatedPaths, tags: revalidatedTags });
}
