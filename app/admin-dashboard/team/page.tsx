"use client";

export const runtime = 'edge';

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, RefreshCw, Users, GripVertical, Loader2 } from "lucide-react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    rectSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TeamMember {
    id: number;
    menu_order: number;
    title: { rendered: string };
    acf?: { name?: string; role?: string; member_image?: { url: string } | string };
    _embedded?: { "wp:featuredmedia"?: Array<{ source_url: string }> };
}

function getMemberImage(m: TeamMember): string | null {
    const media = m._embedded?.["wp:featuredmedia"]?.[0];
    if (media?.source_url) return media.source_url;
    const img = m.acf?.member_image;
    if (typeof img === "object" && img && "url" in img) return img.url;
    if (typeof img === "string" && img.startsWith("http")) return img;
    return null;
}

function getMemberRole(m: TeamMember): string {
    const acf = m.acf as any;
    return acf?.role || acf?.roles || acf?.title || acf?.position || "";
}

function getMemberName(m: TeamMember): string {
    return m.acf?.name || m.title?.rendered?.replace(/<[^>]*>/g, "") || "";
}

function SortableCard({
    member,
    onDelete,
    deleting,
}: {
    member: TeamMember;
    onDelete: (id: number, name: string) => void;
    deleting: number | null;
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: member.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 50 : undefined,
    };

    const name = getMemberName(member);
    const role = getMemberRole(member);
    const img = getMemberImage(member);
    const initials = name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);

    return (
        <div ref={setNodeRef} style={style} className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-all">
            {/* Drag handle */}
            <div
                {...attributes}
                {...listeners}
                className="flex items-center justify-center py-1.5 bg-gray-50 border-b border-gray-100 cursor-grab active:cursor-grabbing"
            >
                <GripVertical className="h-4 w-4 text-gray-300" />
            </div>

            <div className="w-full aspect-square relative bg-gray-100">
                {img ? (
                    <img src={img} alt={name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-green/20 to-primary-yellow/20">
                        <span className="text-3xl font-bold text-dark-grey/30">{initials}</span>
                    </div>
                )}
            </div>

            <div className="p-3">
                <p className="font-semibold text-dark-grey text-sm truncate">{name}</p>
                <p className="text-xs text-primary-green font-medium truncate">{role || <span className="text-gray-300 italic">No role set</span>}</p>
                <div className="flex items-center gap-2 mt-2">
                    <Link
                        href={`/admin-dashboard/team/${member.id}/edit`}
                        className="flex-1 text-center text-xs py-1.5 border border-gray-200 rounded-lg hover:border-primary-green hover:text-primary-green transition-colors"
                    >
                        <Edit2 className="h-3 w-3 inline mr-1" />Edit
                    </Link>
                    <button
                        onClick={() => onDelete(member.id, name)}
                        disabled={deleting === member.id}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function TeamPage() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [deleting, setDeleting] = useState<number | null>(null);
    const [fetchError, setFetchError] = useState("");

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    const fetchMembers = useCallback(async () => {
        setLoading(true);
        setFetchError("");
        const token = localStorage.getItem("wp_token") || "";
        try {
            const res = await fetch("/api/team", { headers: { "x-wp-token": token } });
            const data = await res.json();
            if (data.success) {
                setMembers([...data.members].sort((a: any, b: any) => (a.acf?.order ?? 999) - (b.acf?.order ?? 999)));
            } else {
                setFetchError(typeof data.error === "string" ? data.error : JSON.stringify(data.error));
            }
        } catch (e: any) {
            setFetchError(e?.message || "Network error");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchMembers(); }, [fetchMembers]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = members.findIndex(m => m.id === active.id);
        const newIndex = members.findIndex(m => m.id === over.id);
        setMembers(arrayMove(members, oldIndex, newIndex));
        setSaveSuccess(false);
    };

    const saveOrder = async () => {
        setSaving(true);
        setSaveSuccess(false);
        const token = localStorage.getItem("wp_token") || "";
        if (!token) { setSaving(false); return; }
        try {
            await Promise.all(
                members.map((m, i) =>
                    fetch(`/api/team/${m.id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json", "x-wp-token": token },
                        body: JSON.stringify({ menu_order: i, acf_order: i }),
                    })
                )
            );
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number, name: string) => {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
        setDeleting(id);
        const token = localStorage.getItem("wp_token") || "";
        try {
            await fetch(`/api/team/${id}`, { method: "DELETE", headers: { "x-wp-token": token } });
            fetchMembers();
        } finally {
            setDeleting(null);
        }
    };

    return (
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-light-bg min-h-screen">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-dark-grey">Team Members</h1>
                        <p className="text-gray-500 text-sm mt-1">{members.length} members</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {members.length > 0 && (
                            <button
                                onClick={saveOrder}
                                disabled={saving}
                                className="flex items-center gap-2 px-4 py-2.5 border border-primary-green text-primary-green rounded-xl font-semibold hover:bg-primary-green hover:text-white transition-all disabled:opacity-50 text-sm"
                            >
                                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saveSuccess ? "✓ Saved!" : "Save Order"}
                            </button>
                        )}
                        <Link
                            href="/admin-dashboard/team/new"
                            className="flex items-center gap-2 bg-primary-green text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-green/90 transition-all shadow-sm"
                        >
                            <Plus className="h-4 w-4" />
                            Add Member
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="p-12 text-center bg-white rounded-xl shadow-sm">
                        <div className="animate-spin h-8 w-8 border-2 border-primary-green border-t-transparent rounded-full mx-auto mb-3" />
                        <p className="text-gray-400 text-sm">Loading team members...</p>
                    </div>
                ) : fetchError ? (
                    <div className="p-8 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-600 font-semibold text-sm mb-2">Failed to load team members</p>
                        <pre className="text-xs text-red-500 whitespace-pre-wrap break-all">{fetchError}</pre>
                        <button onClick={fetchMembers} className="mt-4 text-sm text-primary-green hover:underline">Try again</button>
                    </div>
                ) : members.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-xl shadow-sm">
                        <Users className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">No team members yet</p>
                        <Link href="/admin-dashboard/team/new" className="text-primary-green text-sm mt-2 inline-block hover:underline">
                            Add your first team member
                        </Link>
                    </div>
                ) : (
                    <>
                        <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
                            <GripVertical className="h-3.5 w-3.5" /> Drag cards to reorder
                        </p>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={members.map(m => m.id)} strategy={rectSortingStrategy}>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {members.map((member) => (
                                        <SortableCard
                                            key={member.id}
                                            member={member}
                                            onDelete={handleDelete}
                                            deleting={deleting}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    </>
                )}

                <div className="mt-4 flex justify-end">
                    <button onClick={fetchMembers} className="flex items-center gap-2 text-sm text-gray-400 hover:text-dark-grey transition-colors">
                        <RefreshCw className="h-3.5 w-3.5" /> Refresh
                    </button>
                </div>
            </div>
        </main>
    );
}
