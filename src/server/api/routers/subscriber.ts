import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";

export const subscriberRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1).max(100),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.subscriber.create({
          data: {
            firstName: input.firstName,
            email: input.email,
          },
        });
      } catch (error) {
        // Handle unique constraint violation error (email already exists)
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002" && 
          error.meta?.target && 
          (error.meta.target as string[]).includes("email")
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "You're already subscribed with this email.",
          });
        }
        throw error; // Re-throw any other errors
      }
    }),
});