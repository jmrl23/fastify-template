# Fastify Template

A clean, modular, and production-ready Fastify + TypeScript template designed to help you quickly build scalable APIs with minimal setup.

## 🚀 Overview

This template provides a maintainable backend structure using:

- **Fastify** — fast and low-overhead web framework.
- **TypeScript** — for type-safety and developer productivity.
- **Modular architecture** — modules with their own routes, services, and schemas.
- **Autoloaded routes and Swagger documentation** — plug-and-play REST endpoints.
- **Integrated logging and configuration system**.

---

## 🧩 Folder Structure

```
src/
├── app.ts                  # Creates and configures the Fastify instance
├── bootstrap.ts            # Bootstraps the entire app (registers plugins, routes, etc.)
├── common/
│   ├── logger.ts           # Centralised Fastify/console logger setup
│   └── typings.ts          # Shared TypeScript interfaces and type definitions
├── config/
│   └── env.ts              # Environment variable configuration and validation
├── init.ts                 # Application initialization logic
├── main.ts                 # Entry point – starts the server
├── modules/
│   └── todos/
│       ├── schemas/
│       │   ├── createTodo.schema.ts
│       │   ├── deleteTodo.schema.ts
│       │   ├── getTodo.schema.ts
│       │   ├── getTodos.schema.ts
│       │   ├── todo.schema.ts
│       │   └── updateTodo.schema.ts
│       ├── todos.route.spec.ts
│       ├── todos.route.ts      # Defines API routes for the Todos module
│       ├── todos.service.spec.ts
│       └── todos.service.ts    # Business logic for todos
├── plugins/
│   ├── routesAutoload.ts   # Automatically loads routes from modules
│   └── swagger.ts          # Configures Swagger/OpenAPI documentation
└── test.ts                 # General test entry file
```

---

## 🧱 Architecture

This template follows a **modular folder-based structure**, making it easy to scale:

- Each folder inside `modules/` represents a **feature domain**.
- Each module includes its own:
  - `route.ts` — defines endpoints.
  - `service.ts` — contains business logic.
  - `schemas/` — defines input/output validation schemas.
- Common utilities and shared types are stored in `src/common/`.
- Configuration is centralized under `src/config/`.

---

## 🧑‍💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jmrl23/fastify-template.git
cd fastify-template
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Run in development

```bash
yarn run start:dev
```

### 4. Build and run

```bash
yarn run build
yarn run start
```

---

## ⚙️ Environment Variables

Define your environment variables in a `.env` file.  
Typical values may include:

```
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
```

Configuration is loaded via `src/config/env.ts`.

---

## 🧩 Features in Detail

### 🧠 `routesAutoload.ts`

Automatically scans the `modules/` folder and registers routes — no need for manual imports.

### 📘 `swagger.ts`

Enables interactive API documentation (Swagger UI) for all routes.  
Great for testing and documenting your REST endpoints.

### 🗂️ `schemas/`

Each schema defines request/response validation rules using JSON Schema (via Fastify’s built-in validation system).

### 🪶 Logging

The `common/logger.ts` module sets up a unified logger for debugging and production logging.

### 🧪 Testing

Test files (`*.spec.ts`) are colocated with their source files for better context and maintainability.

---

## 🐳 Docker Support

This project includes a `Dockerfile` and `.dockerignore` for containerized deployment.

### Docker compose

```bash
docker compose up -d
```

---

## 🧰 Scripts

Common commands (may vary depending on your `package.json`):

| Script            | Description                                                                                                           |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| `yarn build`      | Compiles the TypeScript source using `tsc --build`.                                                                   |
| `yarn test`       | Runs tests using `ts-node` and loads environment variables via `dotenv`. Executes `src/test.ts` with `NODE_ENV=test`. |
| `yarn start`      | Runs the compiled app from `build/main.js`, preloading environment setup from `build/init.js`.                        |
| `yarn start:dev`  | Starts the development server with `nodemon` on port 9229 (for debugging) and automatically reloads on changes.       |
| `yarn start:prod` | Runs the app in production mode using `dotenv` and the compiled output.                                               |
| `yarn format`     | Formats all `.ts` and `.js` files in `src/` using Prettier.                                                           |
| `yarn lint`       | Runs ESLint to check code quality and style issues.                                                                   |

---

## 🧭 Recommended Conventions

- Keep each module self-contained (`routes`, `services`, `schemas`, `tests`).
- Shared logic (e.g., DB client, cache, utilities) should live in `src/common/`.
- Configuration and environment handling in `src/config/`.
- Prefer Fastify plugins (`src/plugins/`) for reusable features (CORS, Swagger, etc.).

---

## 🧾 License

This project is licensed under the [**MIT License**](./LICENSE).

---

> Clean. Modular. Fast.  
> Use this template as your foundation for production-grade Fastify backends 🚀
