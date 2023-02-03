
##  :clipboard: Descrição

API de cadastro de clientes desenvolvida em Nest.js.

***

## :zap: Tecnologias e Conceitos

- REST API
- TypeScript
- Node.js
- Nest.js
- PostgreSQL with PrismaORM
- Jest and Supertest
- Swagger
- Docker
- CI/CD with Github Actions
- AWS EC2
- POO

***

## 🏁 Rodando a aplicação

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/LeonMesquita/customer-registration.git
```
***

## 🐳 Rodando no Docker
```yml
# crie um arquivo .env na raiz do projeto e defina as variáveis de ambiente necessárias para a imagem do Postgres. Exemplo:

DATABASE_URL=postgresql://postgres:postgres@customer_registration_postgres:5432/customer_registration_db

POSTGRES_USER=postgres 

POSTGRES_PASSWORD=postgres

POSTGRES_DB=customer_registration_db


# Execute o seguinte comando
$ docker-compose up --build

# Observação: Por padrão, a porta do Postgres etá mapeada na porta 3255 e a do Node na porta 80, você pode mudar para as portas que achar melhor.
```

***

## 💻 Rodando na máquina local
```yml
# Crie um arquivo .env na raiz e defina a variável de ambiente DATABASE_URL que recebe a url do seu banco Postgres local. Exemplo:

DATABASE_URL=postgres://postgres:postgres@localhost:5432/customer_registration_db


# Instale as dependências
$ npm install

# Por fim, rode a aplicação

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

***

## 🔗 URL da API
```yml
# Via deploy AWS
http://ec2-52-87-154-30.compute-1.amazonaws.com/api/

# Via localhost
http://localhost:5000/api/
```

***


## 📚 Documentação Swagger
```yml
# Via deploy AWS
http://ec2-52-87-154-30.compute-1.amazonaws.com/api/docs

# Via localhost
http://localhost:5000/api/docs
```

***


## 🐳 Rodando os testes no Docker
```yml
# Os testes utilizam outro banco de dados específico para testes, por isso certifique-se de criar um arquivo .env.test e definir as variáveis de ambiente do banco de testes. Exemplo:

DATABASE_URL=postgresql://postgres:postgres@customer_registration_postgres:5432/customer_registration_db_test

POSTGRES_USER=postgres 

POSTGRES_PASSWORD=postgres

POSTGRES_DB=customer_registration_db_test


# Executando testes E2E
$ docker-compose -f docker-compose-tests.yml run customer_registration_app npm run test:e2e

# Executando testes Unitários
$ docker-compose -f docker-compose-tests.yml run customer_registration_app npm run test
```


***


## 💻 Rodando os testes na máquina local

```yml
# Crie um novo banco Postgres local específico para os testes, em seguida crie o arquivo .env.test na raiz do projeto e defina a variável de ambiente DATABASE_URL com a url do seu banco de testes:

DATABASE_URL=postgres://postgres:postgres@localhost:5432/event_management_db_test


# Executando testes Unitários
$ npm run test

# Executando testes E2E
$ npm run test:e2e
```

***

## :rocket: Rotas

```yml
POST /customer
    - Rota para cadastrar um novo cliente
    - headers: {}
    - body: {
        "name": "Lorem ipsum",
        "cpf": "111.444.777-35",
        "birth_date": "20/05/1992"
      }
```
```yml
GET /customer?page=1&limit=10
    - Rota para retornar uma lista de clientes com paginação
    - headers: {}
    - body: {}
```

```yml
GET /customer/:cpf
    - Rota para buscar um cliente pelo CPF
    - headers: {}
    - body: {}
```
