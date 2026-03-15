"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Send, Save, X, CheckCircle, AlertCircle } from "lucide-react";
import RichTextEditor from "@/components/editor/RichTextEditor";

const CATEGORY_OPTIONS = ["News", "Programs", "Events", "Announcements", "Stories"];

export default function NewPost() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [savingDraft, setSavingDraft] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploadedImageId, setUploadedImageId] = useState<number | null>(null);
    const [editorData, setEditorData] = useState<string>("");
    const [token, setToken] = useState("");

    const [form, setForm] = useState({
        title: "",
        acf: { summary: "", category: "", author_name: "" },
    });

    useEffect(() => {
        setToken(localStorage.getItem("wp_token") || "");
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setUploadedImageId(null);
        setImagePreview(URL.createObjectURL(file));
    };

    const uploadImage = async (): Promise<number | null> => {
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
                imageId = await uploadImage();
                if (!imageId && imageFile) { setLoading(false); setSavingDraft(false); return; }
            }

            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-wp-token": token },
                body: JSON.stringify({
                    title: form.title,
                    content: editorData,
                    status,
                    acf: { ...form.acf, ...(imageId ? { featured_image: imageId } : {}) },
                }),
            });

            const data = await res.json();
            if (data.success) {
                setSuccess(status === "publish" ? "Post published!" : "Draft saved!");
                setTimeout(() => router.push("/admin-dashboard/posts"), 1500);
            } else {
                setError(data.error || "Failed to save post");
            }
        } catch {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
            setSavingDraft(false);
        }
    };

    return (
        <main className="flex-1 p-8 overflow-y-auto bg-light-bg min-h-screen">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin-dashboard/posts" className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <ArrowLeft className="h-5 w-5 text-dark-grey" />
                    </Link>
                    <h1 className="text-3xl font-bold text-dark-grey">New Post</h1>
                </div>

                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700">
                        <CheckCircle className="h-5 w-5 flex-shrink-0" /> {success}
                    </div>
                )}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" /> {error}
                    </div>
                )}

                <div className="space-y-6">
                    {/* Title */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <label className="block text-sm font-semibold text-dark-grey mb-2">Post Title *</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green text-lg"
                            placeholder="Enter post title..."
                        />
                    </div>

                    {/* Rich Text Editor */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <label className="block text-sm font-semibold text-dark-grey mb-4">Content</label>
                        <RichTextEditor value={editorData} onChange={setEditorData} />
                    </div>

                    {/* Post Details */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h2 className="text-base font-semibold text-dark-grey mb-4">Post Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                                {imagePreview ? (
                                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <button type="button"
                                            onClick={() => { setImagePreview(null); setImageFile(null); setUploadedImageId(null); }}
                                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-red-50">
                                            <X className="h-4 w-4 text-red-500" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-green hover:bg-primary-green/5 transition-colors">
                                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                        <span className="text-sm text-gray-500">Click to upload featured image</span>
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                    </label>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
                                <input type="text" value={form.acf.summary}
                                    onChange={(e) => setForm({ ...form, acf: { ...form.acf, summary: e.target.value } })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                                    placeholder="Short summary..." />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select value={form.acf.category}
                                    onChange={(e) => setForm({ ...form, acf: { ...form.acf, category: e.target.value } })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green bg-white">
                                    <option value="">Select a category...</option>
                                    {CATEGORY_OPTIONS.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
                                <input type="text" value={form.acf.author_name}
                                    onChange={(e) => setForm({ ...form, acf: { ...form.acf, author_name: e.target.value } })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                                    placeholder="Author's name..." />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between gap-4">
                        <Link href="/admin-dashboard/posts" className="text-sm text-gray-500 hover:text-dark-grey transition-colors">
                            Cancel
                        </Link>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => submit("draft")}
                                disabled={savingDraft || loading || !form.title}
                                className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 hover:border-primary-green text-dark-grey font-semibold rounded-xl transition-all disabled:opacity-50"
                            >
                                {savingDraft ? (
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                ) : <Save className="h-4 w-4" />}
                                Save Draft
                            </button>

                            <button
                                type="button"
                                onClick={() => submit("publish")}
                                disabled={loading || savingDraft || !form.title}
                                className="flex items-center gap-2 px-6 py-3 bg-primary-green hover:bg-primary-green/90 text-white font-semibold rounded-xl transition-all shadow-lg disabled:opacity-50"
                            >
                                {loading ? (
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                ) : <Send className="h-4 w-4" />}
                                Publish
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
