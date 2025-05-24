# Boilerplate Nuxt + Prisma

Este projeto é um **boilerplate** criado para fins de aprendizado, utilizando Nuxt 3, Prisma e Bootstrap. Ele serve como ponto de partida para quem deseja estudar ou iniciar aplicações fullstack modernas com Vue/Nuxt no frontend e Prisma como ORM no backend.

## Sobre o Projeto

- **Nuxt 3** para o frontend e rotas.
- **Prisma** como ORM para manipulação do banco de dados.
- **Bootstrap** para estilização rápida e responsiva.
- Exemplos de CRUD de usuários, incluindo criação, listagem, atualização e exclusão (com suporte a modais).

## Como rodar o projeto localmente

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/matheusgb/nuxt-boilerplate
   cd boilerplate
   ```

2. **Instale as dependências:**

   ```bash
   pnpm install
   ```

3. **Configure o banco de dados:**

   - Edite o arquivo `.env` com a variável `DATABASE_URL` (por padrão, usa SQLite).
   - Rode as migrations e gere o client Prisma:
     ```bash
     npx prisma migrate dev
     npx prisma generate
     ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm dev
   ```

Acesse o projeto em [http://localhost:3000](http://localhost:3000).

---

Para mais informações, consulte a [documentação do Nuxt](https://nuxt.com/docs/getting-started/introduction) e a [documentação do Prisma](https://www.prisma.io/docs/).
