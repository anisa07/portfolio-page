import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders"; // Not available with legacy API

const blogSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  readTime: z.number(),
  category: z.string(),
  image: z.string(),
  featured: z.boolean(),
  author: z.string(),
  tags: z.array(z.string()),
});

const blogEnCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/en/blog" }),
  schema: blogSchema,
});

const blogNlCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/nl/blog" }),
  schema: blogSchema,
});

export const collections = {
  // Use approach 1 (separate collections)
  "blog-en": blogEnCollection,
  "blog-nl": blogNlCollection,
};
