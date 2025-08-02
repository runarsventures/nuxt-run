import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from '../database/schema'

export const useDb = () => {
  const client = neon(process.env.DATABASE_URL!)
  return drizzle({ client, schema })
}

export const tables = {
  ...schema,
}
