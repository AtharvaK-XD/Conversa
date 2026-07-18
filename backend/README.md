# Conversa Backend

Node.js + Express + TypeScript API server for the Conversa language immersion app.

## Structure

```
backend/
├── src/
│   ├── index.ts              # Entry point, Express app setup
│   ├── middleware/
│   │   └── auth.ts           # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.ts           # /api/auth — login, register, logout
│   │   ├── scenarios.ts      # /api/scenarios — list & detail
│   │   ├── sessions.ts       # /api/sessions — save & retrieve sessions
│   │   └── debriefs.ts       # /api/debriefs — AI-generated debrief
│   └── services/
│       └── supabase.ts       # Supabase admin + anon client instances
├── .env                      # Local secrets (do NOT commit)
├── .env.example              # Template for .env
├── package.json
└── tsconfig.json
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill in env vars
cp .env.example .env

# 3. Start development server (with hot reload)
npm run dev

# 4. Build for production
npm run build
npm start
```

## API Endpoints (Planned)

| Method | Route                    | Description                           |
|--------|--------------------------|---------------------------------------|
| GET    | /health                  | Health check                          |
| POST   | /api/auth/login          | Log in with email/password            |
| POST   | /api/auth/register       | Register a new user                   |
| GET    | /api/scenarios           | List all roleplay scenarios           |
| GET    | /api/scenarios/:id       | Get scenario detail                   |
| GET    | /api/sessions            | Get all sessions for current user     |
| POST   | /api/sessions            | Save a completed roleplay session     |
| GET    | /api/debriefs/:sessionId | Get stored debrief for a session      |
| POST   | /api/debriefs/generate   | Generate AI debrief from transcript   |
