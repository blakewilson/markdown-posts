import { join } from "path";

interface MarkdownPostsConfig {
  postsDirectory: string;
  sortByFieldName: string;
}

let markdownPostsConfig: MarkdownPostsConfig = {
  postsDirectory: join(process.cwd(), "posts"),
  sortByFieldName: "date",
};

export function getConfig(): MarkdownPostsConfig {
  return markdownPostsConfig;
}

export function setConfig(config: MarkdownPostsConfig): MarkdownPostsConfig {
  markdownPostsConfig = config;

  return markdownPostsConfig;
}
