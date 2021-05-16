import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { markdownToHtml, getPostSlugs } from './utils';
import { setConfig, getConfig } from './config';

interface Post {
  [key: string]: string;
}

export async function getPostBySlug(
  slug: string,
  fields: string[],
  contentRaw = false,
): Promise<Post> {
  const { postsDirectory } = getConfig();

  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const post: Post = {};

  // Ensure only the minimal needed data is exposed
  for (const field of fields) {
    if (field === 'slug') {
      post[field] = realSlug;
    }

    if (field === 'content') {
      post[field] = contentRaw ? content : await markdownToHtml(content || '');
    }

    if (data[field]) {
      post[field] = data[field];
    }
  }

  return post;
}

export async function getAllPosts(
  fields: string[] = [],
  contentRaw = false,
): Promise<Post[]> {
  const { postsDirectory, sortByFieldName } = getConfig();
  const slugs = getPostSlugs(postsDirectory);

  let posts = await Promise.all(
    slugs.map(async (slug) => await getPostBySlug(slug, fields, contentRaw)),
  );

  if (posts.length && posts[0][sortByFieldName]) {
    console.log('sorting by ', sortByFieldName);
    posts = posts.sort((post1, post2) =>
      post1[sortByFieldName] > post2[sortByFieldName] ? -1 : 1,
    );
  }

  return posts;
}

export { setConfig, getConfig };
