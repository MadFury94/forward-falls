// ─────────────────────────────────────────────────────────────
// lib/cms/adapter.ts
// CMS-agnostic interface. Swap the implementation in
// lib/cms/wordpress.ts for any other backend without touching
// the rest of the app.
// ─────────────────────────────────────────────────────────────

export interface CMSPost {
    id: number;
    slug: string;
    title: string;
    content: string;
    excerpt: string;
    date: string;
    image: string | null;
    categories: string[];
    author: string;
    acf?: {
        summary?: string;
        category?: string;
        author_name?: string;
        meta_title?: string;
        meta_description?: string;
        og_image?: string;
        featured_image?: string;
    };
    // Raw provider data — available when you need provider-specific fields
    _raw?: unknown;
}

export interface CMSCategory {
    id: number;
    name: string;
    slug: string;
    count: number;
}

export interface CMSTeamMember {
    id: number;
    name: string;
    role: string;
    image: string | null;
    order?: number;
    _raw?: unknown;
}

export interface CMSMedia {
    id: number;
    url: string;
    alt: string;
    filename: string;
    mimeType: string;
    date: string;
}

export interface CMSAccount {
    id: number;
    bankName: string;
    accountNumber: string;
    accountName: string;
}

export interface CMSPageContent {
    [key: string]: unknown;
}

export interface FetchPostsParams {
    page?: number;
    perPage?: number;
    categoryId?: number;
    search?: string;
    status?: string;
}

export interface ICMSAdapter {
    // Posts
    fetchPosts(params?: FetchPostsParams): Promise<{ posts: CMSPost[]; total: number; totalPages: number }>;
    fetchPost(slug: string): Promise<CMSPost | null>;
    createPost(data: Partial<CMSPost> & { title: string }, token: string): Promise<{ id: number; slug: string }>;
    updatePost(id: number, data: Partial<CMSPost>, token: string): Promise<{ id: number; slug: string }>;
    deletePost(id: number, token: string, force?: boolean): Promise<void>;

    // Categories
    fetchCategories(): Promise<CMSCategory[]>;

    // Team
    fetchTeamMembers(): Promise<CMSTeamMember[]>;
    fetchTeamMember(id: number, token: string): Promise<CMSTeamMember | null>;
    createTeamMember(data: Partial<CMSTeamMember> & { name: string }, token: string): Promise<{ id: number }>;
    updateTeamMember(id: number, data: Partial<CMSTeamMember>, token: string): Promise<void>;
    deleteTeamMember(id: number, token: string): Promise<void>;

    // Media
    fetchMedia(params?: { page?: number; search?: string; mediaType?: string }): Promise<{ items: CMSMedia[]; total: number; totalPages: number }>;

    // Accounts
    fetchAccounts(token: string): Promise<CMSAccount[]>;
    createAccount(data: Omit<CMSAccount, 'id'>, token: string): Promise<{ id: number }>;
    deleteAccount(id: number, token: string): Promise<void>;

    // Page content (homepage sections etc.)
    fetchPageContent(page: string): Promise<CMSPageContent | null>;
    updatePageContent(page: string, data: CMSPageContent, token: string): Promise<void>;
}
