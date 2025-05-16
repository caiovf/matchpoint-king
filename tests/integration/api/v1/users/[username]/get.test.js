import orchestrator from "tests/orchestrator.js";
import { version as uuidVersion } from "uuid";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET /api/v1/users/[username]", () => {
  describe("Usuário Anônimo", () => {
    test("Com um caso exato", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "mesmoCaso",
          email: "mesmo.caso@gmail.com",
          password: "senha123",
        }),
      });

      expect(response1.status).toBe(201);

      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/mesmoCaso",
      );

      expect(response2.status).toBe(200);

      const response2Body = await response2.json();

      expect(response2Body).toEqual({
        id: response2Body.id,
        username: "mesmoCaso",
        email: "mesmo.caso@gmail.com",
        password: response2Body.password,
        createdAt: response2Body.createdAt,
        updatedAt: response2Body.updatedAt,
      });

      expect(uuidVersion(response2Body.id)).toBe(4);
      expect(Date.parse(response2Body.createdAt)).not.toBeNaN();
      expect(Date.parse(response2Body.updatedAt)).not.toBeNaN();
    });

    test("Com um caso diferente", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "casoDiferente",
          email: "caso.diferente@gmail.com",
          password: "senha123",
        }),
      });

      expect(response1.status).toBe(201);

      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/casodiferente",
      );

      expect(response2.status).toBe(200);

      const response2Body = await response2.json();

      expect(response2Body).toEqual({
        id: response2Body.id,
        username: "casoDiferente",
        email: "caso.diferente@gmail.com",
        password: response2Body.password,
        createdAt: response2Body.createdAt,
        updatedAt: response2Body.updatedAt,
      });

      expect(uuidVersion(response2Body.id)).toBe(4);
      expect(Date.parse(response2Body.createdAt)).not.toBeNaN();
      expect(Date.parse(response2Body.updatedAt)).not.toBeNaN();
    });

    test("Com usuário que não existe", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/usuarioInexistente",
      );

      expect(response.status).toBe(404);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "O username informado não foi encontrado no sistema ",
        action: "Verifique se o username está digitado corretamente",
        status_code: 404,
      });
    });
  });
});
