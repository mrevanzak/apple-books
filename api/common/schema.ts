import { z } from "zod";

export function createPaginatedSchema<T extends z.ZodTypeAny>(schema: T) {
  return z.object({
    start: z.number(),
    docs: z.array(schema),
    num_found: z.number(),
    offset: z.number(),
  });
}

export const bookSchema = z.object({
  key: z.string(),
  title: z.string().min(1),
  author_name: z.array(z.string().min(1)),
  cover_i: z.number().int(),
  ratings_average: z.number().transform((value) => value.toFixed(2)),
  ratings_count: z.number(),
});
