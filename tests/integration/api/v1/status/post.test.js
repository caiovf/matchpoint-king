import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("POST para /api/v1/status", () => {
  describe("Usuário Anônimo", () => {
    test("Retornando Método não permitido", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });
      expect(response.status).toBe(405);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "MethodNotAllowed",
        message: "Método não permitido para este endpoint",
        action: "Verifique se o método enviado é válido para este endpoint",
        status_code: 405,
      });
    });
  });
});
