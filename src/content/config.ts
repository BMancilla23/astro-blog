import { defineCollection } from "astro/content/config";
import { z } from "astro:content";


const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      date: z.date(),
      description: z.string().min(1),
      /* image: z.string().optional(), */
      image: image()
        .superRefine((img, ctx) => {
          if (img && (img.width < 400 || img.width > 4000)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "La imagen debe estar entre 400px y 4000px de ancho",
            });
          }
        })
        /*  .refine((img) => img.width >= 100, {
          message: "La imagen debe estar entre 400px y 4000px de ancho",
        }) */
        .optional(),

      // TODO: Relation
      author: z.string().min(1).default("Bryan Mancilla"),

      // TODO: Relaction
      tags: z.string().array().optional(),
    }),
});

export const collections = {
  blog: blogCollection,
};
