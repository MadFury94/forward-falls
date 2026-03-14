interface EditorBlock {
    type: string;
    data: any;
}

interface EditorData {
    blocks: EditorBlock[];
}

export function editorJsToHtml(data: EditorData): string {
    if (!data?.blocks?.length) return "";

    return data.blocks.map((block) => {
        switch (block.type) {
            case "header":
                return `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;

            case "paragraph":
                return `<p>${block.data.text}</p>`;

            case "list":
                const tag = block.data.style === "ordered" ? "ol" : "ul";
                const items = block.data.items.map((item: string) => `<li>${item}</li>`).join("");
                return `<${tag}>${items}</${tag}>`;

            case "quote":
                return `<blockquote><p>${block.data.text}</p>${block.data.caption ? `<cite>${block.data.caption}</cite>` : ""}</blockquote>`;

            case "delimiter":
                return `<hr/>`;

            case "image":
                const caption = block.data.caption ? `<figcaption>${block.data.caption}</figcaption>` : "";
                const stretched = block.data.stretched ? ' class="stretched"' : "";
                return `<figure${stretched}><img src="${block.data.file.url}" alt="${block.data.caption || ""}" />${caption}</figure>`;

            case "embed":
                return `<div class="embed-block"><iframe src="${block.data.embed}" width="${block.data.width || 600}" height="${block.data.height || 400}" frameborder="0" allowfullscreen></iframe>${block.data.caption ? `<p class="embed-caption">${block.data.caption}</p>` : ""}</div>`;

            case "table":
                const rows = block.data.content.map((row: string[]) =>
                    `<tr>${row.map((cell: string) => `<td>${cell}</td>`).join("")}</tr>`
                ).join("");
                return `<table><tbody>${rows}</tbody></table>`;

            default:
                return "";
        }
    }).join("\n");
}
