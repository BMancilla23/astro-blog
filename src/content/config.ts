import { defineCollection } from "astro/content/config";
import { reference, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      date: z.date(),
      description: z.string().min(1),
      /* image: z.string().optional(), */
      image: image()
        .optional()
        .superRefine((img, ctx) => {
          if (img && (img.width < 400 || img.width > 4000)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "La imagen debe estar entre 400px y 4000px de ancho",
            });
          }
        }),
      /*  .refine((img) => img.width >= 100, {
          message: "La imagen debe estar entre 400px y 4000px de ancho",
        }) */

      // TODO: Relation
      // author: z.string().min(1),
      author: reference("author"),

      // TODO: Relaction
      tags: z.string().array().optional(),
      isDraft: z.boolean().optional().default(false),
    }),
});

/*
name: Alice Johnson
avatar: ./avatars/alice-johnson.webp
  */

const authorCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string().min(2, {
        message: "El nombre del autor debe tener al menos 2 caracteres",
      }),
      avatar: image()
        .optional()
        .superRefine((img, ctx) => {
          if (img && (img.width < 100 || img.width > 1000)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "El avatar debe estar entre 100px y 1000px de ancho",
            });
          }
        }),
      role: z.string().optional(),
      bio: z.string().optional(),
      social: z.object({
        twitter: z.string().optional(),
        github: z.string().optional(),
        linkedin: z.string().optional(),
      }),
      website: z.string().url().optional(),
      email: z.string().email().optional(),
    }),
});

export const collections = {
  blog: blogCollection,
  author: authorCollection,
};
