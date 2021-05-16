import fs from 'fs';
import remark from 'remark';
import html from 'remark-html';

export const isMarkdownFile = (filename: string): boolean => {
  return filename.endsWith('.md');
};

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export function getPostSlugs(postsDir: string): string[] {
  const filenames = fs.readdirSync(postsDir);
  return filenames.filter((filename) => isMarkdownFile(filename));
}
