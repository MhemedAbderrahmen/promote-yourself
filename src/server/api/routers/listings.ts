import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { listings } from "~/server/db/schema";

export const listingsRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .input(z.object({ description: z.string().min(1) }))
    .input(z.object({ logo: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(listings).values({
        name: input.name,
        logo:input.logo,
        description:input.description
      });
    }),


  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.listings.findMany({
      orderBy: (listings, { desc }) => [desc(listings.createdAt)],
    });
  }),
});
