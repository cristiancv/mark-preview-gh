import { marked } from "marked";

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

export function ParseMarkdownToHtml({ content, idContainer }) {
  return (document.getElementById(idContainer).innerHTML = content);
}
