import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "Matchpoint King <contato@matchpointking.com.br>",
      to: "suporte@matchpointking.com.br",
      subject: "Teste de assunto do email",
      text: "Teste de corpo do email",
    });

    await email.send({
      from: "Matchpoint King <contato@matchpointking.com.br>",
      to: "suporte@matchpointking.com.br",
      subject: "Ultimo email",
      text: "Ultimo email",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<contato@matchpointking.com.br>");
    expect(lastEmail.recipients[0]).toBe("<suporte@matchpointking.com.br>");
    expect(lastEmail.subject).toBe("Ultimo email");
    expect(lastEmail.text).toBe("Ultimo email\n");
  });
});
