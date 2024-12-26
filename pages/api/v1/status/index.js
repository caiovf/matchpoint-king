import database from "infra/database.js";

async function status(request, response) {
  const databaseStatusUpdatedAt = new Date().toISOString();
  const databaseVersion = await database.query("SHOW server_version;");
  const databaseMaxConnections = await database.query("SHOW max_connections;");
  const dataActiveConnections = await database.query({
    text: `SELECT count(*)::int AS active_connections FROM pg_stat_activity WHERE datname = $1;`,
    values: [process.env.POSTGRES_DB],
  });

  const databaseInfo = {
    postgres_version: databaseVersion.rows[0].server_version,
    max_connections: parseInt(databaseMaxConnections.rows[0].max_connections),
    active_connections: parseInt(
      dataActiveConnections.rows[0].active_connections,
    ),
  };

  response.status(200).json({
    database_status_updated_at: databaseStatusUpdatedAt,
    dependencies: {
      database: {
        version: databaseInfo.postgres_version,
        max_connections: parseInt(databaseInfo.max_connections),
        opened_connections: databaseInfo.active_connections,
      },
    },
  });
}

export default status;
