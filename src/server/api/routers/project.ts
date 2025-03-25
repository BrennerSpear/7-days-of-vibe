import { Prisma } from '@prisma/client'
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

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
          farcasterUsername: input.farcasterUsername ?? '', // Provide empty string as default
          approved: true, // default to true for now
        },
      })
    }),

  getApproved: publicProcedure
    .input(
      z
        .object({
          week: z.number().optional(),
        })
        .optional(),
    )
    .query(({ ctx, input }) => {
      // Define week date ranges
      const weekRanges = [
        // Week 1: March 17-23, 2025
        {
          start: new Date('2025-03-17T00:00:00Z'),
          end: new Date('2025-03-23T23:59:59Z'),
        },
        // Week 2: March 24-30, 2025
        {
          start: new Date('2025-03-24T00:00:00Z'),
          end: new Date('2025-03-30T23:59:59Z'),
        },
        // Week 3: March 31-April 6, 2025 (Future)
        {
          start: new Date('2025-03-31T00:00:00Z'),
          end: new Date('2025-04-06T23:59:59Z'),
        },
      ]

      // Base query
      let whereClause: Prisma.ProjectWhereInput = {
        approved: true,
      }

      // Add week filter if specified
      if (
        input?.week !== undefined &&
        input.week >= 1 &&
        input.week <= weekRanges.length
      ) {
        const weekIndex = input.week - 1
        const weekRange = weekRanges[weekIndex]
        if (weekRange) {
          whereClause = {
            ...whereClause,
            createdAt: {
              gte: weekRange.start,
              lte: weekRange.end,
            },
          }
        }
      }

      return ctx.db.project.findMany({
        where: whereClause,
        orderBy: {
          createdAt: 'desc',
        },
      })
    }),
})
