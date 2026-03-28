// ─────────────────────────────────────────────────────────────
// lib/cms/wordpress.ts
// WordPress implementation of ICMSAdapter.
// All WP-specific logic lives here — nothing else in the app
// should import from this file directly. Use getCMSAdapter()
// from lib/cms/index.ts instead.
// ─────────────────────────────────────────────────────────────

import type {
    ICMSAdapter,
    CMSPost,
    CMSCategory,
    CMSTeamMember,
    CMSMedia,
    CMSAccount,
    CMSPageContent,
    FetchPostsParams,
} from './adapter';

// ── Raw WP types (internal to this file) ─────────────────────

interface WPPost {
    id: number;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    date: string;
    acf?: {
        featured_image?: { url: string; alt: string } | string | number;
        summary?: string;
        category?: string;
        author_name?: string;
        meta_title?: string;
        meta_description?: string;
        og_image?: { url: string; alt: string } | string;
    };
    _embedded?: {
        'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
        'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
        author?: Array<{ name: string }>;
    };
}

interface WPTeamMember {
    id: number;
    menu_order?: number;
    title: { rendered: string };
    acf?: Record<string, unknown>;
    _embedded?: {
        'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
    };
}

interface WPMedia {
    id: number;
    source_url: string;
    alt_text: string;
    slug: string;
    mime_type: string;
    date: string;
}

interface WPAccount {
    id: number;
    acf?: {
        bank_name?: string;
        account_number?: string;
        account_name?: string;
    };
}

// ── Helpers ───────────────────────────────────────────────────

function wpUrl(): string {
    return process.env.WORDPRESS_SITE_URL || '';
}

function bearer(token: string) {
    return { Authorization: `Bearer ${token}` };
}

function mapPost(p: WPPost): CMSPost {
    const media = p._embedded?.['wp:featuredmedia']?.[0];
    let image: string | null = media?.source_url ?? null;
    if (!image) {
        const acfImg = p.acf?.featured_image;
        if (typeof acfImg === 'string' && acfImg.startsWith('http')) image = acfImg;
        else if (typeof acfImg === 'object' && acfImg && 'url' in acfImg) image = (acfImg as { url: string }).url;
    }

    const terms = p._embedded?.['wp:term']?.[0];
    const categories = p.acf?.category
        ? [p.acf.category]
        : (terms?.map((t) => t.name).filter((n) => n !== 'Uncategorized') ?? []);

    const ogImg = p.acf?.og_image;
    const ogImageStr = typeof ogImg === 'string' ? ogImg : (typeof ogImg === 'object' && ogImg && 'url' in ogImg ? (ogImg as { url: string }).url : undefined);

    return {
        id: p.id,
        slug: p.slug,
        title: p.title.rendered,
        content: p.content.rendered,
        excerpt: p.excerpt.rendered,
        date: p.date,
        image,
        categories,
        author: p.acf?.author_name || p._embedded?.author?.[0]?.name || '',
        acf: {
            summary: p.acf?.summary,
            category: p.acf?.category,
            author_name: p.acf?.author_name,
            meta_title: p.acf?.meta_title,
            meta_description: p.acf?.meta_description,
            og_image: ogImageStr,
        },
        _raw: p,
    };
}

function mapTeamMember(m: WPTeamMember): CMSTeamMember {
    const media = m._embedded?.['wp:featuredmedia']?.[0];
    let image: string | null = media?.source_url ?? null;
    const acf = m.acf as Record<string, unknown> | undefined;
    if (!image) {
        const img = acf?.member_image;
        if (typeof img === 'object' && img && 'url' in img) image = (img as { url: string }).url;
        else if (typeof img === 'string' && img.startsWith('http')) image = img;
    }
    const role = (acf?.role || acf?.roles || acf?.title || acf?.position || acf?.job_title || acf?.designation || '') as string;
    const name = (acf?.name as string) || m.title?.rendered?.replace(/<[^>]*>/g, '') || '';
    const bio = (acf?.bio || acf?.member_bio || '') as string;
    return { id: m.id, name, role, image, bio, order: m.menu_order, _raw: m };
}

// ── WordPress Adapter ─────────────────────────────────────────

export class WordPressAdapter implements ICMSAdapter {
    private base: string;

    constructor() {
        this.base = wpUrl();
    }

    // ── Posts ──────────────────────────────────────────────────

    async fetchPosts(params: FetchPostsParams = {}) {
        const { page = 1, perPage = 9, categoryId, search, status = 'publish' } = params;
        const qs = new URLSearchParams({
            acf_format: 'standard',
            _embed: 'wp:featuredmedia,wp:term,author',
            per_page: String(perPage),
            page: String(page),
            status,
        });
        if (categoryId) qs.set('categories', String(categoryId));
        if (search) qs.set('search', search);

        const res = await fetch(`${this.base}/wp-json/wp/v2/posts?${qs}`, { next: { revalidate: 60 } });
        if (!res.ok) return { posts: [], total: 0, totalPages: 0 };

        const raw: WPPost[] = await res.json();
        return {
            posts: Array.isArray(raw) ? raw.map(mapPost) : [],
            total: Number(res.headers.get('X-WP-Total') || 0),
            totalPages: Number(res.headers.get('X-WP-TotalPages') || 0),
        };
    }

    async fetchPost(slug: string) {
        const res = await fetch(
            `${this.base}/wp-json/wp/v2/posts?slug=${slug}&acf_format=standard&_embed=wp:featuredmedia,wp:term,author`,
            { next: { revalidate: 60 } }
        );
        if (!res.ok) return null;
        const posts: WPPost[] = await res.json();
        return posts[0] ? mapPost(posts[0]) : null;
    }

    async createPost(data: Partial<CMSPost> & { title: string }, token: string) {
        const res = await fetch(`${this.base}/wp-json/wp/v2/posts`, {
            method: 'POST',
            headers: { ...bearer(token), 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: data.title,
                content: data.content ?? '',
                status: 'publish',
                ...(data.image ? { featured_media: Number(data.image) } : {}),
            }),
        });
        if (!res.ok) throw new Error((await res.json()).message || 'Failed to create post');
        const post = await res.json();

        if (data.acf && Object.keys(data.acf).length > 0) {
            await fetch(`${this.base}/wp-json/wp/v2/posts/${post.id}`, {
                method: 'POST',
                headers: { ...bearer(token), 'Content-Type': 'application/json' },
                body: JSON.stringify({ acf: data.acf }),
            });
        }
        return { id: post.id, slug: post.slug };
    }

    async updatePost(id: number, data: Partial<CMSPost>, token: string) {
        const payload: Record<string, unknown> = {};
        if (data.title !== undefined) payload.title = data.title;
        if (data.content !== undefined) payload.content = data.content;
        if (data.image !== undefined) payload.featured_media = Number(data.image);

        const res = await fetch(`${this.base}/wp-json/wp/v2/posts/${id}`, {
            method: 'POST',
            headers: { ...bearer(token), 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error((await res.json()).message || 'Failed to update post');

        if (data.acf && Object.keys(data.acf).length > 0) {
            await fetch(`${this.base}/wp-json/wp/v2/posts/${id}`, {
                method: 'POST',
                headers: { ...bearer(token), 'Content-Type': 'application/json' },
                body: JSON.stringify({ acf: data.acf }),
            });
        }
        const post = await res.json();
        return { id: post.id, slug: post.slug };
    }

    async deletePost(id: number, token: string, force = false) {
        const res = await fetch(`${this.base}/wp-json/wp/v2/posts/${id}${force ? '?force=true' : ''}`, {
            method: 'DELETE',
            headers: bearer(token),
        });
        if (!res.ok) throw new Error('Failed to delete post');
    }

    // ── Categories ─────────────────────────────────────────────

    async fetchCategories(): Promise<CMSCategory[]> {
        const res = await fetch(`${this.base}/wp-json/wp/v2/categories?per_page=50&hide_empty=true`, {
            next: { revalidate: 300 },
        });
        if (!res.ok) return [];
        const cats = await res.json();
        return Array.isArray(cats) ? cats.filter((c: CMSCategory) => c.name !== 'Uncategorized') : [];
    }

    // ── Team ───────────────────────────────────────────────────

    async fetchTeamMembers() {
        // Fetch via internal API proxy to handle errors and URL construction correctly
        const res = await fetch('/api/team', { cache: 'no-store' });
        if (!res.ok) return [];
        const data = await res.json();
        if (data.success && Array.isArray(data.members)) {
            return data.members.map(mapTeamMember);
        }
        return [];
    }

    async fetchTeamMember(id: number, token?: string) {
        const headers: Record<string, string> = {};
        if (token) Object.assign(headers, bearer(token));
        
        const res = await fetch(
            `${this.base}/wp-json/wp/v2/team-member/${id}?acf_format=standard&_embed=wp:featuredmedia`,
            { headers }
        );
        if (!res.ok) return null;
        return mapTeamMember(await res.json());
    }

    async createTeamMember(data: Partial<CMSTeamMember> & { name: string }, token: string) {
        const res = await fetch(`${this.base}/wp-json/wp/v2/team-member`, {
            method: 'POST',
            headers: { ...bearer(token), 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: data.name,
                status: 'publish',
                ...(data.image ? { featured_media: Number(data.image) } : {}),
                ...(data.order !== undefined ? { menu_order: data.order } : {}),
                acf: { name: data.name, role: data.role ?? '', bio: data.bio ?? '' },
            }),
        });
        if (!res.ok) throw new Error((await res.json()).message || 'Failed to create team member');
        const post = await res.json();
        return { id: post.id };
    }

    async updateTeamMember(id: number, data: Partial<CMSTeamMember>, token: string) {
        const payload: Record<string, unknown> = {};
        if (data.name) { payload.title = data.name; payload.acf = { name: data.name }; }
        if (data.role !== undefined) payload.acf = { ...(payload.acf as object ?? {}), role: data.role };
        if (data.bio !== undefined) payload.acf = { ...(payload.acf as object ?? {}), bio: data.bio };
        if (data.image) payload.featured_media = Number(data.image);
        if (data.order !== undefined) payload.menu_order = data.order;

        const res = await fetch(`${this.base}/wp-json/wp/v2/team-member/${id}`, {
            method: 'POST',
            headers: { ...bearer(token), 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error((await res.json()).message || 'Failed to update team member');
    }

    async deleteTeamMember(id: number, token: string) {
        const res = await fetch(`${this.base}/wp-json/wp/v2/team-member/${id}?force=true`, {
            method: 'DELETE',
            headers: bearer(token),
        });
        if (!res.ok) throw new Error('Failed to delete team member');
    }

    // ── Media ──────────────────────────────────────────────────

    async fetchMedia(params: { page?: number; search?: string; mediaType?: string } = {}) {
        const { page = 1, search = '', mediaType = 'image' } = params;
        const qs = new URLSearchParams({
            per_page: '40',
            page: String(page),
            media_type: mediaType,
            orderby: 'date',
            order: 'desc',
            ...(search ? { search } : {}),
        });
        const res = await fetch(`${this.base}/wp-json/wp/v2/media?${qs}`);
        if (!res.ok) return { items: [], total: 0, totalPages: 0 };

        const raw: WPMedia[] = await res.json();
        const items: CMSMedia[] = raw.map((m) => ({
            id: m.id,
            url: m.source_url,
            alt: m.alt_text,
            filename: m.slug,
            mimeType: m.mime_type,
            date: m.date,
        }));
        return {
            items,
            total: Number(res.headers.get('X-WP-Total') || 0),
            totalPages: Number(res.headers.get('X-WP-TotalPages') || 0),
        };
    }

    // ── Accounts ───────────────────────────────────────────────

    async fetchAccounts(token: string) {
        const headers: Record<string, string> = {};
        if (token) headers.Authorization = `Bearer ${token}`;
        const res = await fetch(`${this.base}/wp-json/wp/v2/account_number?acf_format=standard&per_page=100`, { headers });
        if (!res.ok) return [];
        const raw: WPAccount[] = await res.json();
        return raw.map((a) => ({
            id: a.id,
            bankName: a.acf?.bank_name ?? '',
            accountNumber: a.acf?.account_number ?? '',
            accountName: a.acf?.account_name ?? '',
        }));
    }

    async createAccount(data: Omit<CMSAccount, 'id'>, token: string) {
        const res = await fetch(`${this.base}/wp-json/wp/v2/account_number`, {
            method: 'POST',
            headers: { ...bearer(token), 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: data.bankName,
                status: 'publish',
                acf: { bank_name: data.bankName, account_number: String(data.accountNumber), account_name: data.accountName },
            }),
        });
        if (!res.ok) throw new Error((await res.json()).message || 'Failed to create account');
        const post = await res.json();
        return { id: post.id };
    }

    async deleteAccount(id: number, token: string) {
        const res = await fetch(`${this.base}/wp-json/wp/v2/account_number/${id}?force=true`, {
            method: 'DELETE',
            headers: bearer(token),
        });
        if (!res.ok) throw new Error('Failed to delete account');
    }

    // ── Page Content ───────────────────────────────────────────

    async fetchPageContent(page: string): Promise<CMSPageContent | null> {
        const res = await fetch(`${this.base}/wp-json/ffi/v1/${page}`, { cache: 'no-store' });
        if (!res.ok) return null;
        const data = await res.json();
        if (!data?.acf || Array.isArray(data.acf)) return null;
        return data.acf as CMSPageContent;
    }

    async updatePageContent(page: string, data: CMSPageContent, token: string) {
        const res = await fetch(`${this.base}/wp-json/ffi/v1/${page}`, {
            method: 'POST',
            headers: { ...bearer(token), 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Failed to update page content: ${res.status}`);
    }
}
