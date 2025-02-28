import useSWR from "swr";
import Head from "next/head";
import StatusStyle from "../../styles/Status.module.css";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(
      `Erro no Endpoint ${key} com o status code ${response.status}`,
    );
  }

  return responseBody;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI);

  let status = {
    updatedAtText: "Carregando...",
    maxConnections: "Carregando...",
    openedConnections: "Carregando...",
    version: "Carregando...",
  };

  if (!isLoading && data) {
    status.updatedAtText = new Date(
      data.database_status_updated_at,
    ).toLocaleString("pt-BR");

    status.maxConnections = data.dependencies.database.max_connections;
    status.openedConnections = data.dependencies.database.opened_connections;
    status.version = data.dependencies.database.version;
  }

  return (
    <>
      <ul>
        <li>
          <strong>Última atualização </strong>
          {status.updatedAtText}
        </li>
        <li>
          <strong>Banco de Dados </strong>
          <ul>
            <li>
              <span>Conexões: </span>
              {status.openedConnections} / {status.maxConnections}
            </li>
            <li>
              <span>Versão do Postgres: </span>
              {status.version}
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
}

export default function StatusPage() {
  return (
    <>
      <Head>
        <title>Match Point King API | Status </title>
        <meta
          name="description"
          content="Veja como está a saúde do nosso sistema."
        />
      </Head>
      <section className={StatusStyle.status}>
        <div className={StatusStyle.sectionHeader}>
          <h1>Status do Sistema</h1>
        </div>
        <div className={StatusStyle.sectionContent}>
          <DatabaseStatus />
        </div>
      </section>
    </>
  );
}
