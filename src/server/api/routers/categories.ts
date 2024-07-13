import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { categories } from "~/server/db/schema";

export const categoriesRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(2).max(50),
        description: z.string().min(2).max(50),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(categories).values({
        name: input.name,
        description: input.description,
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.categories.findMany({
      orderBy: (categories, { desc }) => [desc(categories.createdAt)],
    });
  }),
});
