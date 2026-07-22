# Inua Backend

A production-ready Node.js backend for the INUA VIJANA project.

## Features

- Express API with TypeScript
- Supabase PostgreSQL persistence
- M-Pesa Daraja STK Push integration
- Webhook callback handling
- Validation with Zod
- Logging and centralized error handling
- Vercel Serverless compatibility

## Folder Structure

```
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   ├── utils/
│   ├── webhooks/
│   └── server.ts
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Setup

1. Copy `.env.example` to `.env`.
2. Fill in your Supabase and Daraja credentials.
3. Install dependencies:

```bash
cd backend
npm install
```

4. Run locally:

```bash
npm run dev
```

## Production Deployment

Build before deployment:

```bash
npm run build
```

Then deploy the backend using Vercel or any Node-compatible host.

## API Overview

- `POST /api/donations`
- `GET /api/donations`
- `GET /api/donations/:id`
- `POST /api/payments/stkpush`
- `POST /api/payments/callback`
- `GET /api/payments/status/:checkoutRequestId`
- `GET /api/health`

## Database

Use the migration script in `db/schema.sql` to create the required tables.

## Notes

- The frontend should post donation and payment requests to the backend endpoints.
- This repository does not modify the existing frontend UI.
