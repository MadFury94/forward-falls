"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Plus, Eye, Edit2, Trash2, Search, RefreshCw, Globe, FileText, Clock } from "lucide-react";

interface Post {
  id: number;
  slug: string;
  title: { rendered: string };
  status: "publish" | "draft" | "trash";
  date: string;
  modified: string;
  acf?: { category?: string; author_name?: string };
  _embedded?: { "wp:featuredmedia"?: Array<{ source_url: string }> };
}

const STATUS_TABS = [
  { label: "All", value: "any" },
  { label: "Published", value: "publish" },
  { label: "Drafts", value: "draft" },
  { label: "Trash", value: "trash" },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("any");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [deleting, setDeleting] = useState<number | null>(null);
  const [counts, setCounts] = useState({ any: 0, publish: 0, draft: 0, trash: 0 });

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("wp_token") || "";
    try {
      const res = await fetch(
        `/api/posts?status=${activeTab}&search=${encodeURIComponent(search)}`,
        { headers: { "x-wp-token": token } }
      );
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
        // Update counts
        const all = data.posts.length;
        const pub = data.posts.filter((p: Post) => p.status === "publish").length;
        const draft = data.posts.filter((p: Post) => p.status === "draft").length;
        const trash = data.posts.filter((p: Post) => p.status === "trash").length;
        setCounts({ any: all, publish: pub, draft: draft, trash: trash });
      }
    } finally {
      setLoading(false);
    }
  }, [activeTab, search]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleDelete = async (id: number, permanent = false) => {
    if (!confirm(permanent ? "Permanently delete this post?" : "Move this post to trash?")) return;
    setDeleting(id);
    const token = localStorage.getItem("wp_token") || "";
    try {
      await fetch(`/api/posts/${id}${permanent ? "?force=true" : ""}`, {
        method: "DELETE",
        headers: { "x-wp-token": token },
      });
      fetchPosts();
    } finally {
      setDeleting(null);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    const token = localStorage.getItem("wp_token") || "";
    await fetch(`/api/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-wp-token": token },
      body: JSON.stringify({ status }),
    });
    fetchPosts();
  };

  const filtered = posts.filter((p) =>
    activeTab === "any" ? p.status !== "trash" : p.status === activeTab
  );

  return (
    <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-light-bg min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-dark-grey">Posts</h1>
            <p className="text-gray-500 text-sm mt-1">{counts.any} total posts</p>
          </div>
          <Link
            href="/admin-dashboard/posts/new"
            className="flex items-center gap-2 bg-primary-green text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-green/90 transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" />
            New Post
          </Link>
        </div>

        {/* Status Tabs */}
        <div className="overflow-x-auto mb-4 -mx-1 px-1">
          <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm w-max">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === tab.value
                  ? "bg-primary-green text-white"
                  : "text-gray-500 hover:text-dark-grey"
                  }`}
              >
                {tab.label}
                <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.value ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                  {counts[tab.value as keyof typeof counts]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setSearch(searchInput)}
              placeholder="Search posts..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-green bg-white"
            />
          </div>
          <button
            onClick={() => setSearch(searchInput)}
            className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:border-primary-green transition-colors"
          >
            Search
          </button>
          <button
            onClick={fetchPosts}
            className="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-primary-green transition-colors"
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin h-8 w-8 border-2 border-primary-green border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Loading posts...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No posts found</p>
              <Link href="/admin-dashboard/posts/new" className="text-primary-green text-sm mt-2 inline-block hover:underline">
                Create your first post
              </Link>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors group">
                    {/* Title */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-dark-grey text-sm line-clamp-1"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                      <div className="flex items-center gap-3 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin-dashboard/posts/${post.id}/edit`} className="text-xs text-primary-green hover:underline">Edit</Link>
                        <span className="text-gray-300">|</span>
                        {post.status === "publish" && (
                          <>
                            <button onClick={() => handleStatusChange(post.id, "draft")} className="text-xs text-gray-500 hover:text-dark-grey">
                              Move to Draft
                            </button>
                            <span className="text-gray-300">|</span>
                          </>
                        )}
                        {post.status === "draft" && (
                          <>
                            <button onClick={() => handleStatusChange(post.id, "publish")} className="text-xs text-primary-green hover:underline">
                              Publish
                            </button>
                            <span className="text-gray-300">|</span>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(post.id, post.status === "trash")}
                          className="text-xs text-red-400 hover:text-red-600"
                          disabled={deleting === post.id}
                        >
                          {post.status === "trash" ? "Delete Permanently" : "Trash"}
                        </button>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${post.status === "publish"
                        ? "bg-green-100 text-green-700"
                        : post.status === "draft"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-600"
                        }`}>
                        {post.status === "publish" ? <Globe className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                        {post.status === "publish" ? "Published" : post.status === "draft" ? "Draft" : "Trash"}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-sm text-gray-500">{post.acf?.category || "—"}</span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {post.status === "publish" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-1.5 text-gray-400 hover:text-primary-green hover:bg-primary-green/10 rounded-lg transition-colors"
                            title="View post"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin-dashboard/posts/${post.id}/edit`}
                          className="p-1.5 text-gray-400 hover:text-primary-green hover:bg-primary-green/10 rounded-lg transition-colors"
                          title="Edit post"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.status === "trash")}
                          disabled={deleting === post.id}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title={post.status === "trash" ? "Delete permanently" : "Move to trash"}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
