import { migrate } from "postgres-migrations"
import pkg from 'pg';
const { Client } = pkg;

const dbConfig = {
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    ssl: {
        rejectUnauthorized: false,
    }
}

const client = new Client(dbConfig) // or a Pool, or a PoolClient
await client.connect()
try {
    await migrate({client}, "db/migrations")
} finally {
    await client.end()
}