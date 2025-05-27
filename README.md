# Desafio: Criação de um CRUD de Novos Heróis da Marvel
Desafio realizado como parte do processo seletivo do Frontend Fusion.

## Requisitos do Projeto

### Frontend (React + TypeScript)

**Página Principal:**
- Exibe a lista de heróis.
- Permite a criação de um novo herói.
- Permite a atualização de heróis existentes.
- Permite a exclusão de heróis.

**Componentes Necessários:**
- `HeroList`: Componente que exibe a lista de heróis.
- `HeroItem`: Componente que representa um herói individual com opções de editar e excluir.
- `HeroForm`: Componente para criar e editar heróis.

### Backend (Node + NestJS + TypeScript + Banco de Dados Relacional ou Não Relacional)

**Rotas para CRUD de Heróis:**

- **Criar Herói**
  - **Endpoint:** `/heroes`
  - **Método:** POST
  - **Descrição:** Cria um novo herói. Os dados do herói (nome, habilidades, e origem) devem ser enviados no corpo da requisição. O cadastro deve ser predefinido a heróis que já existem no universo Marvel.

- **Listar Heróis**
  - **Endpoint:** `/heroes`
  - **Método:** GET
  - **Descrição:** Retorna a lista de todos os heróis.

- **Atualizar Herói**
  - **Endpoint:** `/heroes/:id`
  - **Método:** PUT
  - **Descrição:** Atualiza um herói existente com base no ID. Os novos dados do herói (nome, habilidades, e origem) devem ser enviados no corpo da requisição.

- **Excluir Herói**
  - **Endpoint:** `/heroes/:id`
  - **Método:** DELETE
  - **Descrição:** Exclui um herói existente com base no ID.

## Requisitos Técnicos

**Frontend:**
- Utilizar React com TypeScript.
- Utilizar Axios ou Fetch para fazer requisições HTTP ao backend.
- Gerenciar o estado da aplicação utilizando o contexto do React ou uma biblioteca de gerenciamento de estado como Redux ou Zustand.
- Uso do SWR será considerado uma habilidade valorizada.
- É opcional utilizar a API de personagens da Marvel.

**Backend:**
- Utilizar NestJS com TypeScript.
- Utilizar um banco de dados relacional ou não relacional (ex. MongoDB, PostgreSQL, MySQL).
- Implementar as operações CRUD (Create, Read, Update, Delete) para gerenciar os heróis.

# Deploy
A aplicação pode ser acessada [aqui](https://crud-herois-da-marvel-fullstack-lovat.vercel.app).
