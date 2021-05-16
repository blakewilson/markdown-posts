# Markdown Posts

A simple API to transform a directory of markdown files into an

## Usage

### Installation

Install the package:

```bash
npm install markdown-posts
```

### Usage

Below is a basic example in Next.js:

List all posts on home page:

**`pages/index.tsx`**

```tsx
import { getAllPosts } from "markdown-posts";

export default function Home({ posts }) {
  return (
    <ul>
      {posts.map((post, index) => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts(["title", "date", "slug"]);

  return {
    props: {
      posts,
    },
  };
}
```

Display a single post:

**`pages/[slug].tsx`**

```tsx
export default function SinglePost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const post = await getPostBySlug(slug, ["title", "date", "slug"]);

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
```

## License

This project is licensed under the [MIT license](https://github.com/blakewilson/markdown-posts/blob/master/LICENSE)
