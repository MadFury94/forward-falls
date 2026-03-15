"use client";

import { useEffect, useRef, useCallback } from "react";
import {
    Bold, Italic, Underline, Strikethrough,
    Heading1, Heading2, Heading3,
    List, ListOrdered, Quote,
    Link, Image, AlignLeft, AlignCenter, AlignRight,
    Undo, Redo, Minus
} from "lucide-react";

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

const ToolbarBtn = ({ onClick, title, children, active }: {
    onClick: () => void; title: string; children: React.ReactNode; active?: boolean;
}) => (
    <button
        type="button"
        title={title}
        onMouseDown={(e) => { e.preventDefault(); onClick(); }}
        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${active ? "bg-gray-200 text-primary-green" : "text-gray-600"}`}
    >
        {children}
    </button>
);

const Divider = () => <div className="w-px h-5 bg-gray-300 mx-1 self-center" />;

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const isInternalUpdate = useRef(false);

    useEffect(() => {
        if (editorRef.current && !isInternalUpdate.current) {
            editorRef.current.innerHTML = value || "";
        }
    }, [value]);

    const exec = useCallback((command: string, val?: string) => {
        editorRef.current?.focus();
        document.execCommand(command, false, val);
        if (editorRef.current) {
            isInternalUpdate.current = true;
            onChange(editorRef.current.innerHTML);
            setTimeout(() => { isInternalUpdate.current = false; }, 0);
        }
    }, [onChange]);

    const insertLink = () => {
        const url = prompt("Enter URL:", "https://");
        if (url) exec("createLink", url);
    };

    const insertImage = () => {
        const url = prompt("Enter image URL:");
        if (url) exec("insertImage", url);
    };

    const handleInput = () => {
        if (editorRef.current) {
            isInternalUpdate.current = true;
            onChange(editorRef.current.innerHTML);
            setTimeout(() => { isInternalUpdate.current = false; }, 0);
        }
    };

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 bg-gray-50 border-b border-gray-200">
                {/* History */}
                <ToolbarBtn onClick={() => exec("undo")} title="Undo"><Undo className="h-4 w-4" /></ToolbarBtn>
                <ToolbarBtn onClick={() => exec("redo")} title="Redo"><Redo className="h-4 w-4" /></ToolbarBtn>
                <Divider />

                {/* Headings */}
                <ToolbarBtn onClick={() => exec("formatBlock", "<h2>")} title="Heading 2"><Heading1 className="h-4 w-4" /></ToolbarBtn>
                <ToolbarBtn onClick={() => exec("formatBlock", "<h3>")} title="Heading 3"><Heading2 className="h-4 w-4" /></ToolbarBtn>
                <ToolbarBtn onClick={() => exec("formatBlock", "<h4>")} title="Heading 4"><Heading3 className="h-4 w-4" /></ToolbarBtn>
                <ToolbarBtn onClick={() => exec("formatBlock", "<p>")} title="Paragraph">
                    <span className="text-xs font-semibold px-0.5">P</span>
                </ToolbarBtn>
                <Divider />

                {/* Formatting */}
                <ToolbarBtn onClick={() => exec("bold")} title="Bold"><Bold className="h-4 w-4" /></ToolbarBtn>
                <ToolbarBtn onClick={() => exec("italic")} title="Italic"><Italic className="h-4 w-4" /></ToolbarBtn>
                <ToolbarBtn onClick={() => exec("underline")} title="Underline"><Underline className="h-4 w-4" /></ToolbarBtn>
                <ToolbarBtn onClick={() => exec("strikeThrough")} title="Strikethrough"><Strikethrough className="h-4 w-4" /></ToolbarBtn>
                <Divider />

                {/* Alignment */}
                <ToolbarBtn onClick={() => exec("justifyLeft")} title="Align Left"><AlignLeft className="h-4 w-4" /></ToolbarBtn>
                <ToolbarBtn onClick={() => exec("justifyCenter")} title="Align Center"><AlignCenter className="h-4 w-4" /></ToolbarBtn>
                <ToolbarBtn onClick={() => exec("justifyRight")} title="Align Right"><AlignRight className="h-4 w-4" /></ToolbarBtn>
                <Divider />

                {/* Lists */}
                <ToolbarBtn onClick={() => exec("insertUnorderedList")} title="Bullet List"><List className="h-4 w-4" /></ToolbarBtn>
                <ToolbarBtn onClick={() => exec("insertOrderedList")} title="Numbered List"><ListOrdered className="h-4 w-4" /></ToolbarBtn>
                <ToolbarBtn onClick={() => exec("formatBlock", "<blockquote>")} title="Blockquote"><Quote className="h-4 w-4" /></ToolbarBtn>
                <ToolbarBtn onClick={() => exec("insertHorizontalRule")} title="Divider"><Minus className="h-4 w-4" /></ToolbarBtn>
                <Divider />

                {/* Insert */}
                <ToolbarBtn onClick={insertLink} title="Insert Link"><Link className="h-4 w-4" /></ToolbarBtn>
                <ToolbarBtn onClick={insertImage} title="Insert Image"><Image className="h-4 w-4" /></ToolbarBtn>
            </div>

            {/* Editable Area */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                data-placeholder={placeholder || "Start writing your post..."}
                className="min-h-[400px] p-5 focus:outline-none text-dark-grey text-sm leading-relaxed
                    [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2
                    [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-3 [&_h3]:mb-2
                    [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-3 [&_h4]:mb-1
                    [&_p]:mb-3 [&_p]:leading-relaxed
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3
                    [&_li]:mb-1
                    [&_blockquote]:border-l-4 [&_blockquote]:border-primary-green [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500 [&_blockquote]:my-3
                    [&_a]:text-primary-green [&_a]:underline
                    [&_img]:max-w-full [&_img]:rounded-lg [&_img]:my-3
                    [&_hr]:border-gray-200 [&_hr]:my-4
                    empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300"
            />

            {/* Footer */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs text-gray-400">HTML content editor</span>
                <button
                    type="button"
                    onClick={() => {
                        const html = prompt("Edit raw HTML:", editorRef.current?.innerHTML);
                        if (html !== null && editorRef.current) {
                            editorRef.current.innerHTML = html;
                            onChange(html);
                        }
                    }}
                    className="text-xs text-gray-400 hover:text-primary-green transition-colors"
                >
                    &lt;/&gt; HTML
                </button>
            </div>
        </div>
    );
}
