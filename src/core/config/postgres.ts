import { configDotenv } from 'dotenv'
import pg from 'pg'

configDotenv()

export const postgres = new pg.Pool({
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string),
  user: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
})

export const testPostgresConnection = async () => {
  const client = await postgres.connect()
  console.log('|========== PostgreSQL DB 연결 성공 =========|')
  client.release()
}
