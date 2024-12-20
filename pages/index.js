import React from "react";
import Head from "next/head";
import HomeStyle from "../styles/Home.module.css";

function Home() {
  return (
    <>
      <Head>
        <title>Match Point King</title>
        <meta
          name="description"
          content="Gerencie seus torneios de vôlei como nunca antes!"
        />
      </Head>
      <main className={HomeStyle.layoutConstruction}>
        <div className="container">
          <div className={HomeStyle.sectionContent}>
            <h3 className={HomeStyle.subtitle}>
              Estamos quase prontos para o saque inicial!
            </h3>
            <h1 className={HomeStyle.title}>
              <span>Match Point King</span> Gerencie seus torneios de vôlei como
              nunca antes!
            </h1>
            <h2 className={HomeStyle.description}>
              Uma plataforma inovadora para gerenciar torneios de vôlei com
              facilidade e eficiência.
            </h2>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
