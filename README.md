📘 Projeto Final – Sistema de Produtos com Login, Categorias, Relacionamentos e Controle de Acesso
🧾 Descrição Geral

Este projeto é um sistema completo de gerenciamento de produtos, desenvolvido como parte das atividades do semestre.
Inclui:

CRUD completo de Produtos

CRUD completo de Categorias

Relacionamento Produto → Categoria

Sistema de Login e Autenticação

Níveis de acesso (roles): admin, editor, leitor

Proteção de rotas no backend

Interface web simples para operações de CRUD

Banco de dados MySQL

Deploy utilizando GitHub + serviços externos

É uma aplicação pensada para espelhar situações reais do mercado e treinar habilidades de desenvolvimento full-stack.

👤 Autor

Paulo Vítor Claro
Formação: Estudante de Análise e Desenvolvimento de Sistemas
Ferramentas e tecnologias dominadas:

JavaScript

HTML e CSS

Node.js

MySQL

Git e GitHub

VS Code

Postman

Render / Vercel (deploy)

🧱 Tecnologias Utilizadas
Frontend

HTML5

CSS3

JavaScript puro

Fetch API

Backend

Node.js

Express

MySQL2

JWT (autenticação)

Bcrypt (criptografia de senha)

Dotenv

Banco de Dados

MySQL

Tabelas:

users

categorias

produtos

Controle de Acesso

Middleware auth

Middleware role para permitir:

Admin → tudo

Editor → criar/editar

Leitor → apenas visualizar

🔗 Relacionamento Entre Entidades

O sistema implementa relacionamento de 1 Categoria → Muitos Produtos.

Cada produto pertence a uma categoria

Cada categoria pode ter vários produtos

Esse modelo evita repetição de dados e segue boas práticas de modelagem.

🔐 Autenticação e Autorização

O projeto utiliza:

Login com JWT

Verificação de token em todas as rotas protegidas

Regras de permissão dependendo do role do usuário

Exemplos:

Ação	Admin	Editor	Leitor
Criar Produto	✔️	✔️	❌
Editar Produto	✔️	✔️	❌
Deletar Produto	✔️	❌	❌
Listar Produtos	✔️	✔️	✔️
📁 Estrutura do Projeto
projeto-final/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── models/
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── produtos/
│   ├── categorias/
│   ├── assets/
│
└── sql/
    └── database.sql

▶️ Como Rodar o Projeto Localmente
1 — Clone o projeto
git clone https://github.com/paulofariag2/-PROJETO-_CSM-.git

2 — Instale dependências
cd backend
npm install

3 — Configure o .env

Copie o arquivo:

cp .env.example .env


Preencha com seus dados MySQL:

DB_HOST=localhost
DB_USER=root
DB_PASS=senhadoMYSQL
DB_NAME=projeto_final
JWT_SECRET=qualquercoisa123

4 — Importe o banco

No MySQL Workbench → execute sql/database.sql

5 — Inicie o servidor
npm start


Backend estará em:

http://localhost:3000


Frontend é aberto direto nos arquivos .html.

🚀 Deploy

O deploy pode ser feito em:

Render (backend)

Vercel (frontend)

PlanetScale / Railway para o MySQL na nuvem

Se quiser, posso configurar tudo para você.

🧩 Desafios Encontrados

Configuração de relacionamento entre tabelas

Tratamento de erros no MySQL

Implementação de autenticação JWT

Proteção de rotas e permissões

Integração do frontend com o backend usando fetch

Deploy em serviços diferentes

Cada obstáculo ajudou a reforçar conceitos essenciais de desenvolvimento web moderno.

📄 Licença

Uso educacional — livre para estudo, edição e melhoria.
