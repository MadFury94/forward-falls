import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import Header from "@/components/Header";

export const runtime = 'edge';
import Footer from "@/components/Footer";
import { fetchPost, fetchPosts, getPostImage, getAuthorName, getPostCategories, formatDate } from "@/lib/wordpress-api";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await fetchPost(slug);
    if (!post) return { title: "Post Not Found" };
    return {
        title: `${post.title.rendered} | Forward Falls Initiative`,
        description: post.acf?.summary || "",
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [post, { posts: related }] = await Promise.all([
        fetchPost(slug),
        fetchPosts({ perPage: 3 }),
    ]);

    if (!post) notFound();

    const imageUrl = getPostImage(post);
    const author = getAuthorName(post);
    const categories = getPostCategories(post);
    const relatedPosts = related.filter((p) => p.slug !== slug).slice(0, 2);

    return (
        <>
            <Header />
            <main className="font-poppins">
                {/* Hero Banner */}
                <div className="relative h-[420px] bg-dark-grey overflow-hidden">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={post.title.rendered}
                            fill
                            priority
                            className="object-cover opacity-40"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-green/80 to-dark-grey" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-grey via-dark-grey/50 to-transparent" />

                    <div className="relative z-10 h-full flex flex-col justify-end max-w-[1200px] mx-auto px-6 pb-12">
                        {/* Back link */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors w-fit"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Blog
                        </Link>

                        {/* Category */}
                        {categories.length > 0 && (
                            <span className="inline-block bg-primary-green text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4 w-fit">
                                {categories[0]}
                            </span>
                        )}

                        {/* Title */}
                        <h1
                            className="text-3xl md:text-5xl font-bold text-white max-w-3xl leading-tight"
                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-5 mt-5 text-white/70 text-sm">
                            <span className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary-yellow" />
                                {formatDate(post.date)}
                            </span>
                            {author && (
                                <span className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-primary-yellow" />
                                    {author}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Article Body */}
                <div className="max-w-[1200px] mx-auto px-6 py-16">
                    <div className="grid lg:grid-cols-[1fr_320px] gap-16">
                        {/* Content */}
                        <article>
                            {/* Summary */}
                            {post.acf?.summary && (
                                <p className="text-xl text-gray-600 leading-relaxed mb-10 pb-10 border-b border-gray-100 font-medium">
                                    {post.acf.summary}
                                </p>
                            )}

                            {/* Main Content */}
                            <div
                                className="prose prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-dark-grey
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-primary-green prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-dark-grey
                  prose-ul:text-gray-600 prose-ol:text-gray-600
                  prose-li:mb-2
                  prose-img:rounded-xl prose-img:shadow-md prose-img:my-8
                  prose-blockquote:border-l-4 prose-blockquote:border-primary-green
                  prose-blockquote:bg-light-bg prose-blockquote:px-6 prose-blockquote:py-4
                  prose-blockquote:rounded-r-xl prose-blockquote:not-italic
                  prose-blockquote:text-dark-grey prose-blockquote:font-medium"
                                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                            />

                            {/* Tags */}
                            {categories.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
                                    {categories.map((cat) => (
                                        <span
                                            key={cat}
                                            className="inline-flex items-center gap-1 bg-light-bg text-primary-green text-sm font-semibold px-4 py-2 rounded-full"
                                        >
                                            <Tag className="h-3 w-3" />
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Author Card */}
                            {author && (
                                <div className="mt-10 p-6 bg-light-bg rounded-2xl flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-full bg-primary-green flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-xl">
                                            {author.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Written by</p>
                                        <p className="font-bold text-dark-grey text-lg">{author}</p>
                                        <p className="text-sm text-gray-500">Forward Falls Initiative</p>
                                    </div>
                                </div>
                            )}
                        </article>

                        {/* Sidebar */}
                        <aside className="space-y-8">
                            {/* Related Posts */}
                            {relatedPosts.length > 0 && (
                                <div className="bg-light-bg rounded-2xl p-6">
                                    <h3 className="font-bold text-dark-grey text-lg mb-5 pb-4 border-b border-gray-200">
                                        Related Posts
                                    </h3>
                                    <div className="space-y-5">
                                        {relatedPosts.map((rp) => {
                                            const rpImage = getPostImage(rp);
                                            return (
                                                <Link key={rp.id} href={`/blog/${rp.slug}`} className="flex gap-4 group">
                                                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                                                        {rpImage ? (
                                                            <Image src={rpImage} alt={rp.title.rendered} fill className="object-cover group-hover:scale-105 transition-transform" />
                                                        ) : (
                                                            <div className="w-full h-full bg-primary-green/20 flex items-center justify-center">
                                                                <span className="text-xs font-bold text-primary-green">FFI</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p
                                                            className="font-semibold text-dark-grey text-sm line-clamp-2 group-hover:text-primary-green transition-colors"
                                                            dangerouslySetInnerHTML={{ __html: rp.title.rendered }}
                                                        />
                                                        <p className="text-xs text-gray-400 mt-1">{formatDate(rp.date)}</p>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Back to Blog CTA */}
                            <div className="bg-primary-green rounded-2xl p-6 text-white text-center">
                                <h3 className="font-bold text-lg mb-2">Explore More</h3>
                                <p className="text-white/80 text-sm mb-5">Read more stories from our community</p>
                                <Link
                                    href="/blog"
                                    className="inline-block bg-white text-primary-green font-bold px-6 py-3 rounded-full text-sm hover:bg-primary-yellow transition-colors"
                                >
                                    View All Posts
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
