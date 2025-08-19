import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// Load environment variables explicitly
const databaseUrl =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_ZJxPIMcqX20a@ep-silent-silence-a2ahtpij-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set')
}

const sql = neon(databaseUrl)
export const db = drizzle(sql, { schema })

export * from './schema'
