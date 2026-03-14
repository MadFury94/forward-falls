import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { WPPost, getPostImage, getPostCategories, getAuthorName, formatDate } from "@/lib/wordpress-api";

export default function PostCard({ post }: { post: WPPost }) {
    const image = getPostImage(post);
    const categories = getPostCategories(post);
    const author = getAuthorName(post);

    return (
        <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border-t-4 border-primary-green flex flex-col">
            {/* Image */}
            <div className="relative h-56 bg-gray-100 overflow-hidden flex-shrink-0">
                {image ? (
                    <Image
                        src={image}
                        alt={post.title.rendered}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-green/10 to-primary-yellow/20">
                        <span className="text-5xl font-bold text-dark-grey/20">FFI</span>
                    </div>
                )}
                {categories[0] && (
                    <span className="absolute top-4 left-4 bg-primary-green text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        {categories[0]}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.date)}
                    </span>
                    {author && (
                        <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {author}
                        </span>
                    )}
                </div>

                <h3
                    className="font-bold text-dark-grey text-lg mb-3 group-hover:text-primary-green transition-colors line-clamp-2 flex-1"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />

                {post.acf?.summary && (
                    <p className="text-gray-500 text-sm line-clamp-3 mb-4">{post.acf.summary}</p>
                )}

                <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-primary-green font-semibold text-sm hover:gap-4 transition-all mt-auto"
                >
                    Read More <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </article>
    );
}
