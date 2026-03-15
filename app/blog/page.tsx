import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export const runtime = 'edge';
import PostCard from "@/components/blog/PostCard";
import { fetchPosts, fetchCategories } from "@/lib/wordpress-api";

export const metadata = {
    title: "Blog | Forward Falls Initiative",
    description: "Stories, insights, and updates from the Forward Falls Initiative community.",
    alternates: { canonical: "https://forwardfallsinitiative.org/blog" },
    openGraph: {
        title: "Blog | Forward Falls Initiative",
        description: "Stories, insights, and updates from the Forward Falls Initiative community.",
        url: "https://forwardfallsinitiative.org/blog",
        siteName: "Forward Falls Initiative",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog | Forward Falls Initiative",
        description: "Stories, insights, and updates from the Forward Falls Initiative community.",
    },
};

export default async function BlogPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; category?: string; search?: string }>;
}) {
    const params = await searchParams;
    const page = Number(params.page || 1);
    const search = params.search || "";

    const [{ posts, total, totalPages }, categories] = await Promise.all([
        fetchPosts({ page, perPage: 12, search }),
        fetchCategories(),
    ]);

    return (
        <>
            <Header />
            <main className="font-poppins">
                {/* Hero Banner */}
                <PageHeader
                    label="Our Stories"
                    title="Our"
                    titleHighlight="Blog"
                    description="Stories, insights, and updates from the Forward Falls Initiative community."
                    backgroundImage="/blog.jpg"
                />

                {/* Search + Filter Bar */}
                <div className="bg-white border-b border-gray-100 sticky top-[88px] z-40 shadow-sm">
                    <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <form method="GET" className="relative w-full sm:w-80">
                            <input
                                type="text"
                                name="search"
                                defaultValue={search}
                                placeholder="Search posts..."
                                className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-green"
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-green">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </form>

                        {/* Category filters */}
                        {categories.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                                <Link
                                    href="/blog"
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${!params.category ? "bg-primary-green text-white" : "bg-gray-100 text-gray-600 hover:bg-primary-green/10"}`}
                                >
                                    All
                                </Link>
                                {categories.map((cat) => (
                                    <Link
                                        key={cat.id}
                                        href={`/blog?category=${cat.id}`}
                                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${params.category === String(cat.id) ? "bg-primary-green text-white" : "bg-gray-100 text-gray-600 hover:bg-primary-green/10"}`}
                                    >
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="bg-light-bg py-16">
                    <div className="max-w-[1200px] mx-auto px-6">
                        {posts.length === 0 ? (
                            <div className="text-center py-24">
                                <p className="text-5xl mb-4">📝</p>
                                <h2 className="text-2xl font-bold text-dark-grey mb-2">No posts found</h2>
                                <p className="text-gray-500 mb-6">Try a different search or check back later.</p>
                                <Link href="/blog" className="inline-block bg-primary-green text-white px-6 py-3 rounded-full font-semibold hover:bg-dark-grey transition-colors">
                                    Clear filters
                                </Link>
                            </div>
                        ) : (
                            <>
                                <p className="text-sm text-gray-400 mb-8">{total} post{total !== 1 ? "s" : ""} found</p>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {posts.map((post) => (
                                        <PostCard key={post.id} post={post} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-14">
                                        {page > 1 && (
                                            <Link
                                                href={`/blog?page=${page - 1}${search ? `&search=${search}` : ""}`}
                                                className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-dark-grey hover:border-primary-green hover:text-primary-green transition-colors"
                                            >
                                                <ChevronLeft className="h-4 w-4" /> Prev
                                            </Link>
                                        )}

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                            <Link
                                                key={p}
                                                href={`/blog?page=${p}${search ? `&search=${search}` : ""}`}
                                                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-colors ${p === page ? "bg-primary-green text-white" : "bg-white border border-gray-200 text-dark-grey hover:border-primary-green hover:text-primary-green"}`}
                                            >
                                                {p}
                                            </Link>
                                        ))}

                                        {page < totalPages && (
                                            <Link
                                                href={`/blog?page=${page + 1}${search ? `&search=${search}` : ""}`}
                                                className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-dark-grey hover:border-primary-green hover:text-primary-green transition-colors"
                                            >
                                                Next <ChevronRight className="h-4 w-4" />
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
