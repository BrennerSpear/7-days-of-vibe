import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
	create: publicProcedure
		.input(
			z.object({
				title: z.string().min(3).max(100),
				description: z.string().min(10).max(500),
				link: z.string().url(),
				imageUrl: z.string().url(),
				farcasterUsername: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.project.create({
				data: {
					title: input.title,
					description: input.description,
					link: input.link,
					imageUrl: input.imageUrl,
					farcasterUsername: input.farcasterUsername ?? "", // Provide empty string as default
					approved: true, // default to true for now
				},
			});
		}),

	getApproved: publicProcedure.query(({ ctx }) => {
		return ctx.db.project.findMany({
			where: {
				approved: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	}),
});
