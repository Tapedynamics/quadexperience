import { defineCollection, z } from 'astro:content';

const tourCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    price: z.number(),
    duration: z.string(),
    difficulty: z.enum(['easy', 'moderate', 'hard']),
    location: z.string(),
    highlights: z.array(z.string()),
    included: z.array(z.string()),
    excluded: z.array(z.string()),
    maxParticipants: z.number(),
    minAge: z.number(),
    terrain: z.enum(['coastal', 'volcanic', 'mixed', 'mountain']),
    publishDate: z.date(),
    featured: z.boolean().default(false),
    lang: z.enum(['it', 'en', 'es', 'fr']),
    slug: z.string().optional(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    author: z.string(),
    publishDate: z.date(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    lang: z.enum(['it', 'en', 'es', 'fr']),
    slug: z.string().optional(),
  }),
});

export const collections = {
  'tours': tourCollection,
  'blog': blogCollection,
};