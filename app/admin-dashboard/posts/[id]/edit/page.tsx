"use client";

export const runtime = 'edge';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Send, Save, X, CheckCircle, AlertCircle, Loader2, Images } from "lucide-react";
import RichTextEditor from "@/components/editor/RichTextEditor";
import MediaPickerModal from "@/components/editor/MediaPickerModal";

const CATEGORY_OPTIONS = ["News", "Programs", "Events", "Announcements", "Stories"];

export default function EditPost() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const [fetching, setFetching] = useState(true);
    const [loading, setLoading] = useState(false);
    const [savingDraft, setSavingDraft] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploadedImageId, setUploadedImageId] = useState<number | null>(null);
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [showOgImagePicker, setShowOgImagePicker] = useState(false);

    const [editorData, setEditorData] = useState<string>("");
    const [form, setForm] = useState({
        title: "",
        status: "draft" as "publish" | "draft",
        acf: { summary: "", category: "", author_name: "", meta_title: "", meta_description: "", og_image: "" },
    });

    useEffect(() => {
        const t = localStorage.getItem("wp_token") || "";
        setToken(t);
        loadPost(t);
    }, []);

    const loadPost = async (t: string) => {
        try {
            const res = await fetch(`/api/posts/${id}`, { headers: { "x-wp-token": t } });
            const data = await res.json();
            if (!data.success) { setError("Post not found"); return; }
            const post = data.post;
            setForm({
                title: post.title?.rendered || "",
                status: post.status,
                acf: {
                    summary: post.acf?.summary || "",
                    category: post.acf?.category || "",
                    author_name: post.acf?.author_name || "",
                    meta_title: post.acf?.meta_title || "",
                    meta_description: post.acf?.meta_description || "",
                    og_image: typeof post.acf?.og_image === "string" ? post.acf.og_image : (post.acf?.og_image as any)?.url || "",
                },
            });
            const media = post._embedded?.["wp:featuredmedia"]?.[0];
            if (media?.source_url) {
                setImagePreview(media.source_url);
                setUploadedImageId(post.featured_media || null);
            }
            setEditorData(post.content?.rendered || "");
        } catch {
            setError("Failed to load post");
        } finally {
            setFetching(false);
        }
    };

    const clearImage = () => {
        setImagePreview(null);
        setImageFile(null);
        setUploadedImageId(null);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setUploadedImageId(null);
        setImagePreview(URL.createObjectURL(file));
    };

    const uploadImageFile = async (): Promise<number | null> => {
        if (!imageFile) return null;
        try {
            const fd = new FormData();
            fd.append("file", imageFile);
            const res = await fetch("/api/posts/upload", {
                method: "POST",
                headers: { "x-wp-token": token },
                body: fd,
            });
            const data = await res.json();
            if (data.success) { setUploadedImageId(data.id); return data.id; }
            setError(`Image upload failed: ${data.error}`);
            return null;
        } catch {
            setError("Image upload failed");
            return null;
        }
    };

    const submit = async (status: "publish" | "draft") => {
        setError("");
        status === "draft" ? setSavingDraft(true) : setLoading(true);
        try {
            let imageId = uploadedImageId;
            if (imageFile && !uploadedImageId) {
                imageId = await uploadImageFile();
                if (!imageId) { setLoading(false); setSavingDraft(false); return; }
            }

            const payload: Record<string, any> = {
                title: form.title,
                content: editorData,
                status,
                acf: { ...form.acf },
            };
            if (imageId) payload.featured_media = imageId;

            const res = await fetch(`/api/posts/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", "x-wp-token": token },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (data.success) {
                setSuccess(status === "publish" ? "Post updated!" : "Draft saved!");
                setTimeout(() => router.push("/admin-dashboard/posts"), 1500);
            } else {
                setError(data.error || "Failed to update post");
            }
        } catch {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
            setSavingDraft(false);
        }
    };

    const Spinner = () => (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
    );

    if (fetching) {
        return (
            <main className="flex-1 bg-[#f0f0f1] min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary-green" />
            </main>
        );
    }

    return (
        <main className="flex-1 overflow-y-auto bg-[#f0f0f1] min-h-screen">
            {showMediaPicker && (
                <MediaPickerModal
                    token={token}
                    onClose={() => setShowMediaPicker(false)}
                    onSelect={(item) => {
                        setImagePreview(item.source_url);
                        setUploadedImageId(item.id);
                        setImageFile(null);
                        setShowMediaPicker(false);
                    }}
                />
            )}
            {showOgImagePicker && (
                <MediaPickerModal
                    token={token}
                    onClose={() => setShowOgImagePicker(false)}
                    onSelect={(item) => {
                        setForm({ ...form, acf: { ...form.acf, og_image: item.source_url } });
                        setShowOgImagePicker(false);
                    }}
                />
            )}

            {/* Top bar */}
            <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center gap-3">
                    <Link href="/admin-dashboard/posts" className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <ArrowLeft className="h-5 w-5 text-gray-500" />
                    </Link>
                    <div>
                        <span className="text-sm font-semibold text-dark-grey">Edit Post</span>
                        <span className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${form.status === "publish" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                            {form.status === "publish" ? "Published" : "Draft"}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => submit("draft")} disabled={savingDraft || loading || !form.title}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-primary-green text-dark-grey text-sm font-semibold rounded-lg transition-all disabled:opacity-50">
                        {savingDraft ? <Spinner /> : <Save className="h-4 w-4" />}
                        Save Draft
                    </button>
                    <button onClick={() => submit("publish")} disabled={loading || savingDraft || !form.title}
                        className="flex items-center gap-2 px-5 py-2 bg-primary-green hover:bg-primary-green/90 text-white text-sm font-semibold rounded-lg transition-all shadow disabled:opacity-50">
                        {loading ? <Spinner /> : <Send className="h-4 w-4" />}
                        {form.status === "publish" ? "Update" : "Publish"}
                    </button>
                </div>
            </div>

            {/* Alerts */}
            {(success || error) && (
                <div className="max-w-6xl mx-auto px-6 pt-4">
                    {success && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700">
                            <CheckCircle className="h-5 w-5 flex-shrink-0" /> {success}
                        </div>
                    )}
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600">
                            <AlertCircle className="h-5 w-5 flex-shrink-0" /> {error}
                        </div>
                    )}
                </div>
            )}

            {/* Two-column layout */}
            <div className="max-w-6xl mx-auto px-6 py-6 flex gap-6 items-start">
                {/* LEFT — Title + Content */}
                <div className="flex-1 min-w-0 space-y-4">
                    <div className="bg-white rounded-xl shadow-sm">
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full px-6 py-5 text-2xl font-bold text-dark-grey placeholder-gray-300 focus:outline-none rounded-xl"
                            placeholder="Add title"
                        />
                    </div>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <RichTextEditor value={editorData} onChange={setEditorData} />
                    </div>
                </div>

                {/* RIGHT — Sidebar */}
                <div className="w-72 flex-shrink-0 space-y-4">
                    {/* Publish panel */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100 font-semibold text-sm text-dark-grey">Post</div>
                        <div className="p-4 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Status</span>
                                <span className={`font-semibold ${form.status === "publish" ? "text-green-600" : "text-yellow-600"}`}>
                                    {form.status === "publish" ? "Published" : "Draft"}
                                </span>
                            </div>
                            <div className="pt-2 flex flex-col gap-2">
                                <button onClick={() => submit("draft")} disabled={savingDraft || loading || !form.title}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 hover:border-primary-green text-dark-grey text-sm font-semibold rounded-lg transition-all disabled:opacity-50">
                                    {savingDraft ? <Spinner /> : <Save className="h-4 w-4" />}
                                    Save Draft
                                </button>
                                <button onClick={() => submit("publish")} disabled={loading || savingDraft || !form.title}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-green hover:bg-primary-green/90 text-white text-sm font-semibold rounded-lg transition-all shadow disabled:opacity-50">
                                    {loading ? <Spinner /> : <Send className="h-4 w-4" />}
                                    {form.status === "publish" ? "Update" : "Publish"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100 font-semibold text-sm text-dark-grey">Featured Image</div>
                        <div className="p-4">
                            {imagePreview ? (
                                <div className="space-y-3">
                                    <div className="relative rounded-lg overflow-hidden border border-gray-200">
                                        <img src={imagePreview} alt="Featured" className="w-full h-40 object-cover" />
                                        <button type="button" onClick={clearImage}
                                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-red-50 transition-colors">
                                            <X className="h-3.5 w-3.5 text-red-500" />
                                        </button>
                                    </div>
                                    <button type="button" onClick={() => setShowMediaPicker(true)}
                                        className="w-full text-xs text-primary-green hover:underline text-center">
                                        Replace image
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <button type="button" onClick={() => setShowMediaPicker(true)}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 hover:border-primary-green text-dark-grey text-sm font-semibold rounded-lg transition-all">
                                        <Images className="h-4 w-4" />
                                        Set Featured Image
                                    </button>
                                    <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-dashed border-gray-300 hover:border-primary-green text-gray-500 text-sm rounded-lg cursor-pointer transition-all hover:bg-primary-green/5">
                                        Upload from device
                                        <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Post Details */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100 font-semibold text-sm text-dark-grey">Post Details</div>
                        <div className="p-4 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Summary</label>
                                <textarea
                                    value={form.acf.summary}
                                    onChange={(e) => setForm({ ...form, acf: { ...form.acf, summary: e.target.value } })}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
                                    placeholder="Short summary..." />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Category</label>
                                <select value={form.acf.category}
                                    onChange={(e) => setForm({ ...form, acf: { ...form.acf, category: e.target.value } })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green bg-white">
                                    <option value="">Select category...</option>
                                    {CATEGORY_OPTIONS.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Author</label>
                                <input type="text" value={form.acf.author_name}
                                    onChange={(e) => setForm({ ...form, acf: { ...form.acf, author_name: e.target.value } })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green"
                                    placeholder="Author's name..." />
                            </div>
                        </div>
                    </div>

                    {/* SEO */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100 font-semibold text-sm text-dark-grey">SEO</div>
                        <div className="p-4 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Meta Title</label>
                                <input type="text" value={form.acf.meta_title}
                                    onChange={(e) => setForm({ ...form, acf: { ...form.acf, meta_title: e.target.value } })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green"
                                    placeholder="Defaults to post title" />
                                <p className="text-xs text-gray-400 mt-1">{form.acf.meta_title.length}/60 chars</p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Meta Description</label>
                                <textarea
                                    value={form.acf.meta_description}
                                    onChange={(e) => setForm({ ...form, acf: { ...form.acf, meta_description: e.target.value } })}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
                                    placeholder="Defaults to summary" />
                                <p className={`text-xs mt-1 ${form.acf.meta_description.length > 160 ? "text-red-400" : "text-gray-400"}`}>
                                    {form.acf.meta_description.length}/160 chars
                                </p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">OG Image</label>
                                {form.acf.og_image ? (
                                    <div className="space-y-2">
                                        <div className="relative rounded-lg overflow-hidden border border-gray-200">
                                            <img src={form.acf.og_image} alt="OG" className="w-full h-24 object-cover" />
                                            <button type="button"
                                                onClick={() => setForm({ ...form, acf: { ...form.acf, og_image: "" } })}
                                                className="absolute top-1 right-1 p-1 bg-white rounded-full shadow hover:bg-red-50">
                                                <X className="h-3 w-3 text-red-500" />
                                            </button>
                                        </div>
                                        <button type="button" onClick={() => setShowOgImagePicker(true)}
                                            className="w-full text-xs text-primary-green hover:underline text-center">
                                            Replace OG image
                                        </button>
                                    </div>
                                ) : (
                                    <button type="button" onClick={() => setShowOgImagePicker(true)}
                                        className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-gray-300 hover:border-primary-green text-gray-500 text-sm rounded-lg transition-all hover:bg-primary-green/5">
                                        <Images className="h-4 w-4" />
                                        Pick from media library
                                    </button>
                                )}
                                <p className="text-xs text-gray-400 mt-1">Recommended: 1200×630px. Defaults to featured image.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
