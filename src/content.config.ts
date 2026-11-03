import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.union([z.string(), z.date()]).transform((value) => {
      if (value instanceof Date) {
        return value.toISOString().slice(0, 10);
      }
      return value.slice(0, 10);
    }),
  }),
});

export const collections = { posts };
