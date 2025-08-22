import { defineCollection } from "astro/content/config";
import { z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    date: z.date(),
    description: z.string().min(1),
    image: z.string().optional(),

    // TODO: Relation
    author: z.string().min(1).default("Bryan Mancilla"),

    // TODO: Relaction
    tags: z.string().array().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
