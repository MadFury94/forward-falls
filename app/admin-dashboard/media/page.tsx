"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Trash2, Copy, CheckCircle, AlertCircle, Loader2, Image as ImageIcon } from "lucide-react";

interface MediaItem {
    id: number;
    source_url: string;
    title: { rendered: string };
    media_details: { width?: number; height?: number; filesize?: number };
    mime_type: string;
    date: string;
}

export default function MediaLibraryPage() {
    const [items, setItems] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState("");
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [token, setToken] = useState("");

    useEffect(() => {
        setToken(localStorage.getItem("wp_token") || "");
    }, []);

    const load = useCallback(async (p = 1, s = "") => {
        if (!token) return;
        setLoading(true);
        setError("");
        try {
            const qs = new URLSearchParams({ page: String(p), ...(s ? { search: s } : {}) });
            const res = await fetch(`/api/media?${qs}`, { headers: { "x-wp-token": token } });
            const data = await res.json();
            if (data.success) {
                setItems(data.items);
                setTotal(data.total);
                setTotalPages(data.totalPages);
            } else {
                setError("Failed to load media");
            }
        } catch {
            setError("Failed to load media");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token) load(page, search);
    }, [token, page]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        load(1, search);
    };

    const copyUrl = (item: MediaItem) => {
        navigator.clipboard.writeText(item.source_url);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const deleteItem = async (id: number) => {
        if (!confirm("Delete this media item? This cannot be undone.")) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/media/${id}`, {
                method: "DELETE",
                headers: { "x-wp-token": token },
            });
            const data = await res.json();
            if (data.success) {
                setItems((prev) => prev.filter((i) => i.id !== id));
                setTotal((t) => t - 1);
            } else {
                setError(data.error || "Failed to delete");
            }
        } catch {
            setError("Failed to delete");
        } finally {
            setDeletingId(null);
        }
    };

    const formatSize = (bytes?: number) => {
        if (!bytes) return "";
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <main className="flex-1 p-8 overflow-y-auto bg-light-bg min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-dark-grey">Media Library</h1>
                        <p className="text-sm text-gray-400 mt-1">{total} item{total !== 1 ? "s" : ""}</p>
                    </div>
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search media..."
                            className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green w-64"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </form>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" /> {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <Loader2 className="h-8 w-8 animate-spin text-primary-green" />
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-24">
                        <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No media found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {items.map((item) => (
                            <div key={item.id} className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="relative aspect-square bg-gray-100">
                                    {item.mime_type.startsWith("image/") ? (
                                        <img
                                            src={item.source_url}
                                            alt={item.title.rendered}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ImageIcon className="h-8 w-8 text-gray-300" />
                                        </div>
                                    )}

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => copyUrl(item)}
                                            title="Copy URL"
                                            className="p-2 bg-white rounded-lg hover:bg-primary-green hover:text-white transition-colors"
                                        >
                                            {copiedId === item.id
                                                ? <CheckCircle className="h-4 w-4 text-green-500" />
                                                : <Copy className="h-4 w-4" />}
                                        </button>
                                        <button
                                            onClick={() => deleteItem(item.id)}
                                            title="Delete"
                                            disabled={deletingId === item.id}
                                            className="p-2 bg-white rounded-lg hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
                                        >
                                            {deletingId === item.id
                                                ? <Loader2 className="h-4 w-4 animate-spin" />
                                                : <Trash2 className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="p-2">
                                    <p className="text-xs text-gray-500 truncate">{item.title.rendered || "Untitled"}</p>
                                    {item.media_details?.filesize && (
                                        <p className="text-xs text-gray-400">{formatSize(item.media_details.filesize)}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-10">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold disabled:opacity-40 hover:border-primary-green transition-colors"
                        >
                            Prev
                        </button>
                        <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold disabled:opacity-40 hover:border-primary-green transition-colors"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
