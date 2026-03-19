// ─────────────────────────────────────────────────────────────
// lib/wordpress-api.ts
// Backwards-compatibility shim.
// All logic has moved to lib/cms/wordpress.ts + lib/cms/adapter.ts
// New code should import from @/lib/cms instead.
// ─────────────────────────────────────────────────────────────

export type { CMSPost as WPPost, CMSCategory as WPCategory, CMSTeamMember as WPTeamMember } from './cms/adapter';
export { getCMSAdapter } from './cms/index';

import { getCMSAdapter } from './cms/index';
import type { CMSPost, CMSTeamMember } from './cms/adapter';

const adapter = getCMSAdapter();

// ── Post helpers (operate on the normalised CMSPost) ──────────

export function getPostImage(post: CMSPost): string | null {
    return post.image ?? null;
}

export function getPostCategories(post: CMSPost): string[] {
    return post.categories ?? [];
}

export function getAuthorName(post: CMSPost): string {
    return post.author ?? '';
}

// ── Team helpers ──────────────────────────────────────────────

export function getTeamMemberImage(m: CMSTeamMember): string | null {
    return m.image ?? null;
}

export function getTeamMemberName(m: CMSTeamMember): string {
    return m.name ?? '';
}

export function getTeamMemberRole(m: CMSTeamMember): string {
    return m.role ?? '';
}

// ── Utility ───────────────────────────────────────────────────

export function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, '').trim();
}

// ── Fetch functions (delegate to adapter) ────────────────────

export const fetchPosts = (params?: Parameters<typeof adapter.fetchPosts>[0]) =>
    adapter.fetchPosts(params);

export const fetchPost = (slug: string) =>
    adapter.fetchPost(slug);

export const fetchCategories = () =>
    adapter.fetchCategories();

export const fetchTeamMembers = () =>
    adapter.fetchTeamMembers();
