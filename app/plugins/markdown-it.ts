import MarkdownIt from "markdown-it";

export default defineNuxtPlugin((nuxtApp) => {
    const md = new MarkdownIt({
        html: true, // 允许 HTML 标签
        linkify: true, // 自动转换链接
        typographer: true, // 优化排版
    });

    return { provide: { md } };
});

