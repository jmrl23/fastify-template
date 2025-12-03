# Fastify Template

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/jmrl23/fastify-template)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![codecov](https://codecov.io/gh/jmrl23/fastify-template/graph/badge.svg?token=8IAJGFPPC9)](https://codecov.io/gh/jmrl23/fastify-template)

A production-ready backend template for building scalable APIs quickly, featuring a modular architecture with automatic route loading, schema validation, and API documentation.

## Overview

This template provides a maintainable backend structure with a focus on developer experience and scalability. Key features include:

- **Modular Architecture**: Organize code by feature domains (`src/modules`) for better separation of concerns.
- **Automatic Route Loading**: Files ending in `.route.ts` are automatically loaded and registered as routes based on the file structure.
- **Zod Validation**: First-class support for Zod schemas to validate requests and responses, automatically generating JSON schemas for Fastify.
- **Swagger/OpenAPI**: Interactive API documentation is automatically generated in development mode.
- **Type-Safe Config**: Environment variables are strictly typed and validated using `env-var`.
- **Docker Ready**: Includes production-optimized Dockerfile and docker-ignore settings.

---

## Folder Structure

```text
.
├── public/          # Publicly served static assets
├── src/
│   ├── common/      # Shared utilities (logger, helpers)
│   ├── config/      # Environment variables and configuration
│   ├── modules/     # Domain-specific modules (e.g., todos)
│   │   └── todos/   # Example module structure
│   ├── plugins/     # Fastify plugins (routes, swagger)
│   ├── app.ts       # Fastify instance configuration
│   ├── bootstrap.ts # Plugin registration and app startup
│   ├── init.ts      # Pre-startup initialization
│   └── main.ts      # Application entry point
├── Dockerfile       # Production Docker setup
├── package.json     # Dependencies and scripts
└── tsconfig.json    # TypeScript configuration
```

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
yarn start:dev
```

- Starts the server with `tsx watch` for hot-reloading.
- Swagger UI available at `http://localhost:3001/docs` (if PORT is 3001).

### 4. Build and run

```bash
yarn build
yarn start:prod
```

---

## Environment Variables

Configuration is managed in `src/config/env.ts`. Define these in a `.env` file:

| Variable      | Description                                            | Default       |
| :------------ | :----------------------------------------------------- | :------------ |
| `NODE_ENV`    | Environment mode (`development`, `test`, `production`) | `development` |
| `PORT`        | Port to listen on                                      | `3001`        |
| `TRUST_PROXY` | Proxy trust configuration                              | `loopback`    |
| `CORS_ORIGIN` | Comma-separated list of allowed origins                | `undefined`   |

---

## Scripts

| Script            | Description                                                     |
| :---------------- | :-------------------------------------------------------------- |
| `yarn start:dev`  | Start development server with watch mode and inspector.         |
| `yarn start:prod` | Start production server using `dotenvx` to load envs.           |
| `yarn build`      | Compile TypeScript to JavaScript (using `tsc` and `tsc-alias`). |
| `yarn test`       | Run tests using Jest.                                           |
| `yarn format`     | Format code with Prettier.                                      |
| `yarn lint`       | Lint code with ESLint.                                          |

---

## Architecture Highlights

### Automatic Route Loading

Routes are defined in `*.route.ts` files within `src/modules`. The `src/plugins/routes.ts` plugin automatically discovers these files. The URL path is derived from the file path relative to `src/modules`.

Example: `src/modules/todos/todos.route.ts` -> `/todos`

### Validation with Zod

Schemas are defined using Zod in `src/modules/*/schemas/*.schema.ts`. These are used in route definitions to validate `body`, `querystring`, and `params`, and to type the request handlers.

---

## Docker

Build and run the container:

```bash
docker build -t fastify-app .
docker run -p 3001:3001 --env-file .env fastify-app
```

---

## License

This project is licensed under the [**MIT License**](./LICENSE).
