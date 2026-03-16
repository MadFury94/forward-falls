import { fetchPosts } from "@/lib/wordpress-api";

const SITE_URL = "https://forwardfallsinitiative.org";

type SitemapEntry = {
    url: string;
    lastModified: Date;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: number;
};

export default async function sitemap(): Promise<SitemapEntry[]> {
    const staticPages: SitemapEntry[] = [
        { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
        { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
        { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${SITE_URL}/programs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${SITE_URL}/board-and-team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/donate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ];

    let postPages: SitemapEntry[] = [];
    try {
        const { posts } = await fetchPosts({ perPage: 100 });
        postPages = posts.map((post) => ({
            url: `${SITE_URL}/blog/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: "weekly" as const,
            priority: 0.7,
        }));
    } catch {
        // silently fail — sitemap still works without posts
    }

    return [...staticPages, ...postPages];
}
