/**
 * Call this after any admin save to bust the Next.js cache.
 * Works on both local and production — each environment revalidates itself.
 */
export async function revalidatePages(
    options: string[] | { paths?: string[]; tags?: string[] } = ['/']
) {
    const { paths, tags } = Array.isArray(options)
        ? { paths: options, tags: [] }
        : { paths: options.paths ?? ['/'], tags: options.tags ?? [] };

    try {
        await fetch('/api/revalidate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-revalidate-secret': process.env.NEXT_PUBLIC_REVALIDATE_SECRET || 'ffi-revalidate-2026',
            },
            body: JSON.stringify({ paths, tags }),
        });
    } catch {
        // Non-fatal
    }
}
