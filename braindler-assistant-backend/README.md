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