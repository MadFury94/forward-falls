import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchPosts } from "@/lib/wordpress-api";
import PostCard from "@/components/blog/PostCard";

export default async function BlogSection() {
    const { posts } = await fetchPosts({ perPage: 3 });
    if (!posts.length) return null;

    return (
        <section className="py-24 bg-light-bg font-poppins">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-primary-green font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
                        Latest Updates
                    </span>
                    <h2 className="text-4xl font-bold mb-4 text-dark-grey uppercase">From Our Blog</h2>
                    <div className="w-20 h-1 bg-primary-yellow mx-auto mb-6"></div>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Stories, insights, and updates from the Forward Falls Initiative community.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 bg-primary-green text-white px-8 py-4 rounded-full font-semibold hover:bg-dark-grey transition-all hover:gap-4 group"
                    >
                        View All Posts
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
