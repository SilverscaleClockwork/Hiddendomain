// src/content/config.ts
import { defineCollection } from 'astro:content';
import { createDirectus, rest, readItems } from '@directus/sdk';

import {z} from 'astro/zod';

export const BlogSchema = z.object({
    id: z.string(),
    status: z.string(),
    title: z.string(),
    content: z.string(),
    // date_updated: z.string().transform((str) => new Date(str)),
    date_created: z.coerce.date(),
    date_updated: z.coerce.date().nullable(),
    seo_text: z.string().nullable(),
    hero_image: z.string().nullable(), // id
  });

export type BlogPost = z.infer<typeof BlogSchema>

const DIRECTUS_URL = import.meta.env.DIRECTUS_URL;
const DIRECTUS_COLLECTION = import.meta.env.DIRECTUS_COLLECTION;

const blog = defineCollection({
  loader: async () => {
    const client = createDirectus(DIRECTUS_URL).with(rest());
    const posts = await client.request(readItems(DIRECTUS_COLLECTION));

    // Map Directus fields to Astro's expected format
    return posts.map(post => ({
      id: post.id.toString(),
      ...post
    }));
  },
  schema: BlogSchema
});

export const collections = { blog };