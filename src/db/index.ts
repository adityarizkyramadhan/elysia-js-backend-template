import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // contoh: postgres://user:pass@localhost:5432/mydb
  ssl:
    process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined, // kalau butuh SSL (Supabase/Neon)
});

export const db = drizzle(pool, { schema });
