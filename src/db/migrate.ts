import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from ".";

async function runMigrations() {
  console.log("Running database migrations...");
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migrations applied successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error applying migrations:", error);
    process.exit(1);
  }
}

runMigrations();
