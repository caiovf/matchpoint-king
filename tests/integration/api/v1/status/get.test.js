import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET para /api/v1/status deve retornar status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const databaseStatusUpdatedAt = new Date(
    responseBody.database_status_updated_at,
  ).toISOString();

  expect(responseBody.database_status_updated_at).toBeDefined();
  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.opened_connections).toBeDefined();

  expect(responseBody.database_status_updated_at).toEqual(
    databaseStatusUpdatedAt,
  );

  expect(typeof responseBody.dependencies.database.version).toBe("string");
  expect(responseBody.dependencies.database.version).toBe("16.0");

  expect(typeof responseBody.dependencies.database.max_connections).toBe(
    "number",
  );
  expect(responseBody.dependencies.database.max_connections).toEqual(100);

  expect(typeof responseBody.dependencies.database.opened_connections).toBe(
    "number",
  );
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
