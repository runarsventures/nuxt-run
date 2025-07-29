import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '../database/schema'

let pool: Pool | null = null

export const useDb = () => {
  if (!pool) {
    // @ts-expect-error globalThis.__env__ is not defined
    const hyperdrive = process.env.POSTGRES || globalThis.__env__?.POSTGRES || globalThis.POSTGRES as Hyperdrive | undefined
    const dbUrl = hyperdrive?.connectionString || process.env.NUXT_DATABASE_URL

    pool = new Pool({
      connectionString: dbUrl,
      // Important: Limit connections for Cloudflare Workers
      max: 5, // Workers have a limit of 6 concurrent connections
      min: 0,
      // Connection timeout
      connectionTimeoutMillis: 10000,
      // Query timeout
      statement_timeout: 30000,
    })
  }

  return drizzle({ client: pool, schema })
}

export const closeDb = async () => {
  if (pool) {
    await pool.end()
    pool = null
  }
}

export const tables = {
  ...schema,
}
