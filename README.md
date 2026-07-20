# Bookstore Manager CLI

Sistema de gerenciamento de biblioteca desenvolvido em **Node.js**, **TypeScript** e **PostgreSQL**, executado via linha de comando (CLI). O projeto permite o gerenciamento de autores, livros, clientes e empréstimos, seguindo uma arquitetura em camadas e boas práticas de desenvolvimento.

---

# Descrição do Projeto

O **Bookstore Manager CLI** é uma aplicação de terminal desenvolvida para auxiliar no gerenciamento de uma biblioteca.

O sistema permite realizar o cadastro e manutenção de autores, livros e clientes, além do controle de empréstimos e devoluções de livros. Também disponibiliza relatórios gerenciais para acompanhamento das informações cadastradas.

---

# Objetivo

Desenvolver um sistema de gerenciamento de biblioteca utilizando conceitos de:

- Programação Orientada a Objetos (POO);
- Arquitetura em Camadas;
- Persistência de dados com PostgreSQL;
- TypeScript;
- Node.js;
- SQL.

O projeto tem como finalidade aplicar os conhecimentos adquiridos durante a disciplina de desenvolvimento back-end.

---

# Tecnologias Utilizadas

- Node.js
- TypeScript
- PostgreSQL
- pg (Node PostgreSQL)
- readline-sync
- ts-node-dev
- Git
- GitHub

---

# Requisitos para Execução

Antes de executar o projeto, é necessário possuir instalado:

- Node.js (versão 18 ou superior)
- PostgreSQL
- npm
- Git

---

# Configuração do Banco de Dados

1. Criar um banco de dados PostgreSQL.

Exemplo:

```sql
CREATE DATABASE bookstore;
```

2. Executar o script SQL contendo a criação das tabelas:

- autores
- livros
- clientes
- emprestimos

3. Configurar as credenciais de acesso no arquivo de conexão.

Exemplo:

```ts
export const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "bookstore",
    password: "SUA_SENHA",
    port: 5432
});
```

---

# Instalação

Clone o repositório:

```bash
git clone <https://github.com/Dessa97/bookstore-manager-cli.git>
```

Entre na pasta:

```bash
cd bookstore-manager-cli
```

Instale as dependências:

```bash
npm install
```

---

# Execução

Modo desenvolvimento:

```bash
npm run dev
```

Compilar o projeto:

```bash
npm run build
```

Executar versão compilada:

```bash
npm start
```

---

# Arquitetura do Projeto

O projeto foi desenvolvido utilizando **Arquitetura em Camadas**, separando responsabilidades entre interface, regras de negócio e acesso ao banco de dados.

```
Menu
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
PostgreSQL
```

### Responsabilidades

**Menu**
- Interação com o usuário.

**Controller**
- Recebe os dados do menu.
- Encaminha as requisições para a camada de serviço.

**Service**
- Contém as regras de negócio.
- Realiza validações.
- Coordena operações entre diferentes repositórios.

**Repository**
- Responsável pelas consultas SQL.
- Comunicação direta com o PostgreSQL.

---

# Funcionalidades Implementadas

## Autores

- Cadastro
- Listagem
- Busca por ID
- Atualização
- Exclusão

---

## Livros

- Cadastro
- Listagem
- Busca por ID
- Atualização
- Exclusão

---

## Clientes

- Cadastro
- Listagem
- Busca por ID
- Atualização
- Exclusão

---

## Empréstimos

- Realizar empréstimo
- Registrar devolução
- Listar empréstimos
- Buscar empréstimo por ID
- Excluir empréstimo

Durante o empréstimo o sistema realiza automaticamente:

- Verificação da existência do livro;
- Verificação da existência do cliente;
- Controle da quantidade disponível;
- Atualização do estoque após empréstimo;
- Atualização do estoque após devolução.

---

## Relatórios

- Livros disponíveis
- Livros emprestados
- Livros cadastrados por autor
- Quantidade de empréstimos por livro
- Clientes com empréstimos ativos

---

# Estrutura de Pastas

```
src
│
├── controllers
│
├── database
│
├── interfaces
│
├── menus
│
├── models
│
├── repositories
│
├── services
│
├── main.ts
│
└── connection.ts
```

---

# Exemplos de Utilização

## Menu Principal

```
========== BOOKSTORE MANAGER ==========

1 - Autores
2 - Livros
3 - Clientes
4 - Empréstimos
5 - Relatórios
0 - Sair
```

---

## Cadastro de Autor

```
Nome:
Machado de Assis

Nacionalidade:
Brasileiro

Autor cadastrado com sucesso!
```

---

## Empréstimo

```
ID do Livro:
1

ID do Cliente:
2

Empréstimo realizado com sucesso!
```

---

## Relatório

```
===== LIVROS DISPONÍVEIS =====

ID    Título                 Disponíveis

1     Dom Casmurro           4
2     O Hobbit               2
3     1984                   6
```

---

# Desenvolvedora

Andressa de Oliveira

---

# Kanban

Link do quadro Kanban:

```
https://trello.com/b/r8rjMwp8/bookstore-manager-cli
```

---

# Licença

Este projeto foi desenvolvido para fins acadêmicos.