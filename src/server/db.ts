import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'
import { env } from '~/env'

neonConfig.webSocketConstructor = ws

const isNeon = env.DATABASE_URL.includes('neon')

const createPrismaClient = () => {
  const pool = new Pool({ connectionString: env.DATABASE_URL })
  const adapter = isNeon ? new PrismaNeon(pool) : null
  // const adapter = new PrismaNeon(pool)
  return new PrismaClient({
    adapter,
    log: env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    //   env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

export type Db = typeof db

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db
