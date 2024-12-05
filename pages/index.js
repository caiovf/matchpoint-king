import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdown = `
# Prezado Vinicius,
    
Espero que esta carta encontre você bem.

Enquanto eu estudava eu senti que precisava expressar a imensa gratidão que tenho por tudo o que você fez por mim.
    
Quando eu tinha apenas 16 anos, você me deu uma oportunidade, me acolheu e me ensinou a profissão que tenho hoje.

Com ela consegui ajudar minha família e depois construir a minha

E você teve um papel fundamental nisso.

Você acreditou em mim.

Me mostrou que o trabalho é mais do que cumprir tarefas: é sobre dedicação, compromisso, aprender constantemente e claro atenção aos detalhes .

Sei que nunca retribui direito e que talvez esse texto em markdown não seja o ideal mas achei legal a ideia de usar meus conhecimentos para fazer algo diferente.
     
Reconheço que, nesses anos todos, eu dei muito trabalho! 😅.

Apesar dos "desafios" (leia-se: minha capacidade de testar sua paciência), acredito que estou melhorando.

Brincadeiras à parte, quero que você saiba que minha vontade crescer voltou

Afinal, uma hora tem que virar a chave, certo?

Passei um bom tempo na geladeira sem saber direito o que fazer.

Então esse ano foquei em virar um programador de verdade e achei um caminho para isso

E pretendo usar esse conhecimento para poder contribuir para o sucesso da empresa. 

Pensei que seria uma forma de retribuir o que você fez por mim

Trabalhando duro e ajudando a IWWA alcançar novos patamares.
    
Obrigado por cada lição, cada conselho e, claro, por não desistir de mim.

Ter você como mentor e amigo é algo que valorizo profundamente apesar deu não demonstrar muito(digamos que sou péssimo nesse ponto)
     
Com muito respeito, admiração e aquele toque de bom humor que não pode faltar,
    
### Caio Ferreira
`;

function Home() {
  return (
    <>
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        </div>
    </>
  );
}

export default Home;
