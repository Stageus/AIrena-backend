import { configDotenv } from 'dotenv'
import pg from 'pg'
configDotenv()

export const postgres = new pg.Pool({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT as string),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  max: 10,
})

export const testPostgresConnection = async () => {
  const client = await postgres.connect()
  console.log('|========== PostgreSQL DB 연결 성공 =========|')
  client.release()
}
