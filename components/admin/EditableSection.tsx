"use client";

import { useIsAdmin } from "@/lib/admin-context";
import Link from "next/link";
import { Pencil } from "lucide-react";

interface Props {
    label: string;           // e.g. "Hero Section"
    href: string;            // link to the admin editor (with optional #anchor)
    children: React.ReactNode;
    className?: string;
}

export default function EditableSection({ label, href, children, className = "" }: Props) {
    const isAdmin = useIsAdmin();

    if (!isAdmin) return <div className={className}>{children}</div>;

    return (
        <div className={`relative group/editable ${className}`}>
            {/* Dashed border overlay on hover */}
            <div className="absolute inset-0 z-[100] pointer-events-none border-2 border-dashed border-primary-green/0 group-hover/editable:border-primary-green/60 transition-all duration-200 rounded-sm" />

            {/* Edit button — top-right corner, appears on hover */}
            <Link
                href={href}
                className="
                    absolute top-3 right-3 z-[101]
                    flex items-center gap-1.5
                    px-3 py-1.5
                    bg-primary-green text-white
                    text-[11px] font-semibold tracking-wide uppercase
                    rounded shadow-lg
                    opacity-0 group-hover/editable:opacity-100
                    translate-y-1 group-hover/editable:translate-y-0
                    transition-all duration-200
                    pointer-events-auto
                "
            >
                <Pencil size={11} />
                Edit {label}
            </Link>

            {children}
        </div>
    );
}
