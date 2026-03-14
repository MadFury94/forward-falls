"use client";

import { useEffect, useRef } from "react";

interface EditorJSProps {
    onChange: (data: any) => void;
    initialData?: any;
    token?: string;
}

export default function EditorJSComponent({ onChange, initialData, token }: EditorJSProps) {
    const editorRef = useRef<any>(null);
    const holderRef = useRef<HTMLDivElement>(null);
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current || !holderRef.current) return;
        initialized.current = true;

        const initEditor = async () => {
            const EditorJS = (await import("@editorjs/editorjs")).default;
            const Header = (await import("@editorjs/header")).default;
            const List = (await import("@editorjs/list")).default;
            const Quote = (await import("@editorjs/quote")).default;
            const Delimiter = (await import("@editorjs/delimiter")).default;
            const Embed = (await import("@editorjs/embed" as any)).default;
            const Table = (await import("@editorjs/table")).default;
            const ImageTool = (await import("@editorjs/image")).default;

            editorRef.current = new EditorJS({
                holder: holderRef.current!,
                data: initialData || {},
                placeholder: "Start writing your post...",
                tools: {
                    header: {
                        class: Header as any,
                        config: { levels: [2, 3, 4], defaultLevel: 2 },
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                        config: { defaultStyle: "unordered" },
                    },
                    quote: {
                        class: Quote,
                        inlineToolbar: true,
                    },
                    delimiter: Delimiter,
                    embed: {
                        class: Embed,
                        config: { services: { youtube: true, vimeo: true, twitter: true } },
                    },
                    table: {
                        class: Table as any,
                        inlineToolbar: true,
                    },
                    image: {
                        class: ImageTool,
                        config: {
                            uploader: {
                                async uploadByFile(file: File) {
                                    const fd = new FormData();
                                    fd.append("file", file);
                                    const res = await fetch("/api/posts/upload", {
                                        method: "POST",
                                        headers: { "x-wp-token": token || localStorage.getItem("wp_token") || "" },
                                        body: fd,
                                    });
                                    const data = await res.json();
                                    if (data.success) {
                                        return { success: 1, file: { url: data.url } };
                                    }
                                    return { success: 0 };
                                },
                                async uploadByUrl(url: string) {
                                    return { success: 1, file: { url } };
                                },
                            },
                        },
                    },
                },
                onChange: async () => {
                    const data = await editorRef.current?.save();
                    onChange(data);
                },
            });
        };

        initEditor();

        return () => {
            if (editorRef.current?.destroy) {
                editorRef.current.destroy();
                editorRef.current = null;
                initialized.current = false;
            }
        };
    }, []);

    return (
        <div
            ref={holderRef}
            className="min-h-[400px] prose max-w-none"
        />
    );
}
