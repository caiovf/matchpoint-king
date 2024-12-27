import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";
import db from "node-pg-migrate/dist/db";

async function migrations(request, response) {
  const dbClient = await database.getNewClient();

  let defaultMigrations = {
    dbClient: dbClient,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner({
      ...defaultMigrations,
      dryRun: true,
    });
    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  }

  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner(defaultMigrations);
    await dbClient.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  }

  return response.status(405).end();
}

export default migrations;
