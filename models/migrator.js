import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";

async function getDefaultMigrationsOptions() {
  const dbClient = await database.getNewClient();

  return {
    dbClient: dbClient,
    dir: resolve("infra", "migrations"),
    direction: "up",
    log: () => {},
    migrationsTable: "pgmigrations",
  };
}

async function listPendingMigrations() {
  const defaultMigrations = await getDefaultMigrationsOptions();
  return migrationRunner({
    ...defaultMigrations,
    dryRun: true,
  })
    .then((pendingMigrations) => {
      return pendingMigrations;
    })
    .finally(() => {
      defaultMigrations.dbClient?.end();
    });
}

async function runPedingMigrations() {
  const defaultMigrations = await getDefaultMigrationsOptions();
  return migrationRunner(defaultMigrations)
    .then((migratedMigrations) => {
      return migratedMigrations;
    })
    .finally(() => {
      defaultMigrations.dbClient?.end();
    });
}

const migrator = {
  listPendingMigrations,
  runPedingMigrations,
};

export default migrator;
