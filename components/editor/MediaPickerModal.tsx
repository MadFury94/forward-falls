"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X, Check, Upload, Loader2 } from "lucide-react";

interface MediaItem {
    id: number;
    source_url: string;
    title: { rendered: string };
    mime_type: string;
}

interface Props {
    token: string;
    onSelect: (item: MediaItem) => void;
    onClose: () => void;
}

export default function MediaPickerModal({ token, onSelect, onClose }: Props) {
    const [items, setItems] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selected, setSelected] = useState<MediaItem | null>(null);

    const load = useCallback(async (p = 1, s = "") => {
        setLoading(true);
        try {
            const qs = new URLSearchParams({ page: String(p), ...(s ? { search: s } : {}) });
            const res = await fetch(`/api/media?${qs}`, { headers: { "x-wp-token": token } });
            const data = await res.json();
            if (data.success) {
                setItems(data.items);
                setTotalPages(data.totalPages || 1);
            }
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => { load(1); }, [load]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        load(1, search);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/posts/upload", {
                method: "POST",
                headers: { "x-wp-token": token },
                body: fd,
            });
            const data = await res.json();
            if (data.success) {
                // Reload to show new upload
                await load(1, search);
            }
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    const changePage = (p: number) => {
        setPage(p);
        load(p, search);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-dark-grey">Media Library</h2>
                    <div className="flex items-center gap-3">
                        {/* Upload button */}
                        <label className="flex items-center gap-2 px-4 py-2 bg-primary-green text-white text-sm font-semibold rounded-lg cursor-pointer hover:bg-primary-green/90 transition-colors">
                            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                            Upload New
                            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
                        </label>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="px-6 py-3 border-b border-gray-100">
                    <form onSubmit={handleSearch} className="relative w-72">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search media..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </form>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex items-center justify-center h-48">
                            <Loader2 className="h-8 w-8 animate-spin text-primary-green" />
                        </div>
                    ) : items.length === 0 ? (
                        <div className="text-center py-16 text-gray-400">No media found</div>
                    ) : (
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
                            {items.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setSelected(item)}
                                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${selected?.id === item.id
                                            ? "border-primary-green ring-2 ring-primary-green/30"
                                            : "border-transparent hover:border-gray-300"
                                        }`}
                                >
                                    <img
                                        src={item.source_url}
                                        alt={item.title.rendered}
                                        className="w-full h-full object-cover"
                                    />
                                    {selected?.id === item.id && (
                                        <div className="absolute inset-0 bg-primary-green/20 flex items-center justify-center">
                                            <div className="bg-primary-green rounded-full p-1">
                                                <Check className="h-4 w-4 text-white" />
                                            </div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination + footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button onClick={() => changePage(Math.max(1, page - 1))} disabled={page === 1}
                            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:border-primary-green transition-colors">
                            Prev
                        </button>
                        <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
                        <button onClick={() => changePage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
                            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:border-primary-green transition-colors">
                            Next
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={onClose} className="px-4 py-2 text-sm text-gray-500 hover:text-dark-grey transition-colors">
                            Cancel
                        </button>
                        <button
                            onClick={() => selected && onSelect(selected)}
                            disabled={!selected}
                            className="px-5 py-2 bg-primary-green text-white text-sm font-semibold rounded-lg disabled:opacity-40 hover:bg-primary-green/90 transition-colors"
                        >
                            Set Featured Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
