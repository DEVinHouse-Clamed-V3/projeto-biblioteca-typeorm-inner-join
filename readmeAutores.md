# Biblioteca - Sistema de Gerenciamento de Autores

Este é um sistema de gerenciamento de autores para bibliotecas, desenvolvido utilizando **TypeScript**, **TypeORM** e **PostgreSQL**.

## 📋 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas e configuradas:

### Node.js e npm

- **Node.js**: versão 14 ou superior.
- **npm**: versão 6 ou superior.

### PostgreSQL

- **PostgreSQL**: versão 12 ou superior.
- Usuário `postgres` configurado com senha.
- Um banco de dados chamado `biblioteca` criado no PostgreSQL.

### Insomnia (opcional, para testar as rotas da API)

- [Baixe o Insomnia](https://insomnia.rest/download).

## 🚀 Instalação

Siga as etapas abaixo para configurar e executar o projeto:

### 1. Clone o repositório:

bash
git clone https://github.com/DEVinHouse-Clamed-V3/projeto-biblioteca-typeorm-inner-join.git
cd biblioteca

## 2. Configure o banco de dados:
Acesse o terminal do PostgreSQL:


psql -U postgres

## 3. Execute o projeto:
Inicie o servidor em ambiente de desenvolvimento:

npm run dev

## 🛠️ Tecnologias Utilizadas

- TypeScript
- Node.js
- Express
- TypeORM
- PostgreSQL

## 📌 Rotas da API

### Autores

- **POST /autores** - Criar novo autor

  Corpo da requisição:

  ```json
  {
      "name": "Nome do Autor",
      "birthdate": "YYYY-MM-DD",
      "biography": "Biografia do autor",
      "nationality": "Nacionalidade",
      "active": true
  }

- **GET /autores** - Listar todos os autores

  Essa rota retorna uma lista com todos os autores cadastrados.

- **GET /autores/:id** - Buscar autor específico

  Essa rota retorna os detalhes de um autor específico, utilizando o parâmetro **id**.

- **PUT /autores/:id** - Atualizar autor

  Essa rota permite atualizar os dados de um autor específico. Exemplo de corpo da requisição:
```json
{
    "biography": "Nova biografia"
}


- **DELETE /autores/:id** - Deletar autor

  Essa rota remove um autor do banco de dados, utilizando o parâmetro **id**.
