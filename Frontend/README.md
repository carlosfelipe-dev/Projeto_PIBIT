# Riscos Psicossociais | Página inicial

Página inicial responsiva sobre riscos psicossociais no ambiente de trabalho, com barra superior, menu, barra lateral recolhível, seção de destaques e rodapé com contatos.



# Estrutura de Arquivos Importante:

- src/App.tsx: Onde as rotas estão configuradas. Se precisar criar uma nova página, ela deve ser declarada aqui.

- src/pages/: Contém as telas principais do sistema:

- Home.tsx: Painel principal de seleção.

- CopsoqForms.tsx: Interface do questionário COPSOQ II.

- NasaTlxForms.tsx: Interface da escala NASA TLX.

- src/components/ui/: Biblioteca de componentes visuais (botões, cards, inputs) baseada em Shadcn UI. 

- vite.config.ts: Configurações do servidor de desenvolvimento e apelidos de caminho (@/).

# Como rodar o projeto:

- Entre na pasta do frontend: cd frontend

- Instale as dependências: npm install

- Inicie o servidor: npm run dev

- Acesse: http://localhost:5173

Nota para integração: Procure pelos comentários // TODO nos arquivos das páginas para identificar onde conectaremos as respostas dos formulários com o nosso backend em Python.

# GUIA

Guia de Navegação (Pasta src)

- Quer mudar o visual de um botão ou card -> Vá em components/ui/.

- Quer editar as perguntas ou a lógica dos formulários -> Vá em pages/.

- Quer criar uma nova rota ou página no menu -> Edite o App.tsx.

- Quer alterar cores globais ou fontes -> Mexa no index.css dentro de assets/.
    