# Braindler Assistant Backend

Fastify + Prisma + Swagger backend for Braindler Assistant.

## Setup

```bash
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run dev
```

## API Docs

Once running, open [http://localhost:3000/docs](http://localhost:3000/docs)

## Flexibility and Scalability

This system is designed with flexibility and scalability in mind. Its architecture allows for independent improvement or replacement of individual components.

For more details on the flexibility and scalability of the system, please refer to [docs/flexibility_and_scalability.md](docs/flexibility_and_scalability.md).