const WP_URL = "https://azure-dugong-563921.hostingersite.com";

export interface WPPost {
    id: number;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    date: string;
    author: number;
    categories: number[];
    acf: {
        featured_image?: { url: string; alt: string } | string | number;
        summary?: string;
        category?: string;
        author_name?: string;
    };
    _embedded?: {
        "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
        "wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>;
        author?: Array<{ name: string }>;
    };
}

export interface WPCategory {
    id: number;
    name: string;
    slug: string;
    count: number;
}

export function getPostImage(post: WPPost): string | null {
    // 1. Try WP native featured media via _embed (most reliable)
    const media = post._embedded?.["wp:featuredmedia"]?.[0];
    if (media?.source_url) return media.source_url;
    // 2. Try ACF featured_image field as fallback
    const acfImg = post.acf?.featured_image;
    if (acfImg) {
        if (typeof acfImg === "string" && acfImg.startsWith("http")) return acfImg;
        if (typeof acfImg === "object" && "url" in acfImg) return (acfImg as { url: string }).url;
    }
    return null;
}

export function getPostCategories(post: WPPost): string[] {
    // 1. Try ACF category field
    if (post.acf?.category) return [post.acf.category];
    // 2. Fall back to WP terms via _embed
    const terms = post._embedded?.["wp:term"]?.[0];
    if (terms?.length) return terms.map((t) => t.name).filter((n) => n !== "Uncategorized");
    return [];
}

export function getAuthorName(post: WPPost): string {
    if (post.acf?.author_name) return post.acf.author_name;
    return post._embedded?.author?.[0]?.name || "";
}

export function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, "").trim();
}

// Fetch posts with embed for images + terms
export async function fetchPosts(params: {
    page?: number;
    perPage?: number;
    category?: number;
    search?: string;
} = {}): Promise<{ posts: WPPost[]; total: number; totalPages: number }> {
    const { page = 1, perPage = 9, category, search } = params;
    const qs = new URLSearchParams({
        acf_format: "standard",
        _embed: "wp:featuredmedia,wp:term,author",
        per_page: String(perPage),
        page: String(page),
        status: "publish",
    });
    if (category) qs.set("categories", String(category));
    if (search) qs.set("search", search);

    const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts?${qs}`, { next: { revalidate: 60 } });
    if (!res.ok) return { posts: [], total: 0, totalPages: 0 };

    const total = Number(res.headers.get("X-WP-Total") || 0);
    const totalPages = Number(res.headers.get("X-WP-TotalPages") || 0);
    const posts = await res.json();
    return { posts: Array.isArray(posts) ? posts : [], total, totalPages };
}

export async function fetchPost(slug: string): Promise<WPPost | null> {
    const res = await fetch(
        `${WP_URL}/wp-json/wp/v2/posts?slug=${slug}&acf_format=standard&_embed=wp:featuredmedia,wp:term,author`,
        { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const posts = await res.json();
    return posts[0] || null;
}

export async function fetchCategories(): Promise<WPCategory[]> {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/categories?per_page=50&hide_empty=true`, {
        next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const cats = await res.json();
    return Array.isArray(cats) ? cats.filter((c: WPCategory) => c.name !== "Uncategorized") : [];
}
