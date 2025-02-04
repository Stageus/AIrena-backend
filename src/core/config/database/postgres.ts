import pg from 'pg'
import { configDotenv } from 'dotenv'

configDotenv()

export const postgres = new pg.Pool({
  host: process.env.POSTGRES_HOST || '',
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
  user: process.env.POSTGRES_USER || '',
  password: process.env.POSTGRES_PASSWORD || '',
  database: process.env.POSTGRES_DB,
})

export const testPostgresConnection = async () => {
  const client = await postgres.connect()
  console.log('|========== PostgreSQL DB 연결 성공 =========|')
  client.release()
}
