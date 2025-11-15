# Fastify Template

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/jmrl23/fastify-template)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![codecov](https://codecov.io/gh/jmrl23/fastify-template/graph/badge.svg?token=8IAJGFPPC9)](https://codecov.io/gh/jmrl23/fastify-template)

A clean, modular, and production-ready Fastify + TypeScript template designed to help you quickly build scalable APIs with minimal setup.

## Overview

This template provides a maintainable backend structure using:

- **Fastify** - fast and low-overhead web framework.
- **TypeScript** - for type-safety and developer productivity.
- **Zod** - for powerful schema validation.
- **Modular architecture** - modules with their own routes, services, and schemas.
- **Autoloaded routes and Swagger documentation** - plug-and-play REST endpoints.
- **Integrated logging and configuration system**.
- **Built-in CORS, ETag, and static file serving**.

---

## Folder Structure

```text
.
├── public/         # Static assets
├── src/
│   ├── common/     # Shared utilities
│   ├── config/     # Environment configuration
│   ├── modules/    # Business logic domains (features)
│   ├── plugins/    # Custom Fastify plugins
│   ├── app.ts      # Core Fastify app setup
│   └── main.ts     # Application entry point
├── .env            # Environment variables
├── Dockerfile      # Docker configuration
├── package.json    # Project dependencies and scripts
└── tsconfig.json   # TypeScript configuration
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

## Technologies Used

### Core

- [Fastify](https://www.fastify.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)

### Development

- [Nodemon](https://nodemon.io/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io/)

---

## Scripts

| Script            | Description                       |
| ----------------- | --------------------------------- |
| `yarn build`      | Build the project for production. |
| `yarn test`       | Run unit tests.                   |
| `yarn start`      | Start the production server.      |
| `yarn start:dev`  | Start the development server.     |
| `yarn start:prod` | Run the app in production mode.   |
| `yarn format`     | Format code with Prettier.        |
| `yarn lint`       | Lint code with ESLint.            |

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

## License

This project is licensed under the [**MIT License**](./LICENSE).
