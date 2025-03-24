import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const promptRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.promptIdea.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        text: z.string().min(1),
        farcasterUsername: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Process the username if provided
      let username = input.farcasterUsername;
      if (username) {
        // Strip @ if it's included at the beginning
        username = username.startsWith('@') ? username.substring(1) : username;
        // Trim any whitespace
        username = username.trim();
        // If after processing it's empty, set to undefined
        if (!username) username = undefined;
      }

      return await ctx.db.promptIdea.create({
        data: {
          text: input.text,
          farcasterUsername: username || null,
        },
      });
    }),
});