import { createRouter } from "next-connect";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";
import controller from "infra/controller.js";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function getDefaultMigrationsOptions() {
  const dbClient = await database.getNewClient();

  return {
    dbClient: dbClient,
    dir: resolve("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };
}

async function getHandler(request, response) {
  const defaultMigrations = await getDefaultMigrationsOptions();
  return migrationRunner({
    ...defaultMigrations,
    dryRun: true,
  })
    .then((pendingMigrations) => {
      return response.status(200).json(pendingMigrations);
    })
    .finally(() => {
      defaultMigrations?.dbClient.end();
    });
}

async function postHandler(request, response) {
  const defaultMigrations = await getDefaultMigrationsOptions();
  return migrationRunner(defaultMigrations)
    .then((migratedMigrations) => {
      if (migratedMigrations?.length > 0) {
        return response.status(201).json(migratedMigrations);
      }
      return response.status(200).json(migratedMigrations);
    })
    .finally(() => {
      defaultMigrations?.dbClient.end();
    });
}
