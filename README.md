# Fastify Template

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/jmrl23/fastify-template)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![codecov](https://codecov.io/gh/jmrl23/fastify-template/graph/badge.svg?token=8IAJGFPPC9)](https://codecov.io/gh/jmrl23/fastify-template)

A clean, modular, and production-ready Fastify + TypeScript template designed to help you quickly build scalable APIs with minimal setup.

## Overview

This template provides a maintainable backend structure using:

- **Fastify** - fast and low-overhead web framework.
- **TypeScript** - for type-safety and developer productivity (also supports native JavaScript).
- **Zod** - for powerful schema validation.
- **Modular architecture** - modules with their own routes, services, and schemas.
- **Autoloaded routes and Swagger documentation** - plug-and-play REST endpoints.
- **Integrated logging and configuration system**.
- **Built-in CORS, ETag, and static file serving**.

---

## Folder Structure

```text
.
├── public/               # Static assets (e.g., index.html, favicon.ico)
├── src/
│   ├── app.ts              # Fastify instance creation and configuration
│   ├── bootstrap.ts        # App bootstrapping (plugin registration, etc.)
│   ├── common/             # Shared utilities, types, and logger
│   ├── config/             # Environment variable configuration
│   ├── init.ts             # Application initialization logic
│   ├── main.ts             # Server entry point
│   ├── modules/            # Business logic domains (e.g., todos)
│   ├── plugins/            # Custom Fastify plugins
│   └── test.ts             # Jest global setup
├── .env                    # Environment variables for development
├── .gitignore              # Files and folders to be ignored by Git
├── Dockerfile              # Instructions for building a Docker image
├── jest.config.ts          # Jest test runner configuration
├── package.json            # Project dependencies and scripts
└── tsconfig.json           # TypeScript compiler options
```

---

## Architecture

This template follows a **modular folder-based structure**, making it easy to scale:

- Each folder inside `modules/` represents a **feature domain**.
- Each module includes its own:
  - `route.ts` - defines endpoints.
  - `service.ts` - contains business logic.
  - `schemas/` - defines input/output validation schemas.
- Common utilities and shared types are stored in `src/common/`.
- Configuration is centralized under `src/config/`.

---

## Getting Started

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

## Environment Variables

Define your environment variables in a `.env` file.  
Typical values may include:

```bash
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
```

Configuration is loaded via `src/config/env.ts`.

---

## Features in Detail

### `routesAutoload.ts`

Automatically scans the `modules/` folder and registers routes — no need for manual imports.

### `swagger.ts`

Enables interactive API documentation (Swagger UI) for all routes.  
Great for testing and documenting your REST endpoints.

### `schemas/`

Each schema defines request/response validation rules using **Zod**. This ensures type-safe and validated data throughout your application.

### Error Handling

The template includes a centralized error handler in `src/app.ts` that catches unhandled exceptions and formats them into consistent HTTP responses.

### CORS, ETag, and Static Files

- **`@fastify/cors`** - handles Cross-Origin Resource Sharing.
- **`@fastify/etag`** - automatically generates ETag headers for caching.
- **`@fastify/static`** - serves static files from the `public/` directory.

### Logging

The `common/logger.ts` module sets up a unified logger for debugging and production logging.

### Testing

Test files (`*.spec.ts`/`*.test.ts`) are colocated with their source files for better context and maintainability.

---

## Docker Support

This project includes a `Dockerfile` and `.dockerignore` for containerized deployment.

1. Build the Docker image

   ```bash
   docker build -t app:latest .
   ```

1. Run the Docker container

   ```bash
   docker run -d -p 3001:3001 --name my-app app:latest
   ```

---

## Scripts

Common commands (may vary depending on your `package.json`):

| Script            | Description                                                 |
| ----------------- | ----------------------------------------------------------- |
| `yarn build`      | Compiles the TypeScript                                     |
| `yarn test`       | Runs tests using Jest.                                      |
| `yarn start`      | Runs the compiled app                                       |
| `yarn start:dev`  | Starts the development server                               |
| `yarn start:prod` | Runs the built app in production mode (NODE_ENV=production) |
| `yarn format`     | Formats all `.ts` and `.js` files in `src/` using Prettier. |
| `yarn lint`       | Runs ESLint to check code quality and style issues.         |

---

## Recommended Conventions

- Keep each module self-contained (`routes`, `services`, `schemas`, `tests`).
- Shared logic (e.g., DB client, cache, utilities) should live in `src/common/`.
- Configuration and environment handling in `src/config/`.
- Prefer Fastify plugins (`src/plugins/`) for reusable or custom features.

---

## License

This project is licensed under the [**MIT License**](./LICENSE).
