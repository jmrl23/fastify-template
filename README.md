# Fastify Template

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/jmrl23/fastify-template)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![codecov](https://codecov.io/gh/jmrl23/fastify-template/graph/badge.svg?token=8IAJGFPPC9)](https://codecov.io/gh/jmrl23/fastify-template)

A production-ready backend template for building scalable APIs quickly, featuring a modular architecture with automatic route loading, schema validation, and API documentation.

## Overview

This template provides a maintainable backend structure with a focus on developer experience and scalability. Key features include:

- **Modular Architecture**: Organize your code by feature domains for improved separation of concerns.
- **Automatic Route Loading**: New routes are automatically registered, reducing boilerplate code.
- **Schema Validation**: Enforce type safety and validate request data with ease.
- **API Documentation**: Automatically generate interactive API documentation from your code.
- **Integrated Tooling**: Comes with a pre-configured logging system, environment management, and more.
- **Core Plugins**: Includes essential plugins for CORS, ETag, and static file serving out of the box.

---

## Folder Structure

```text
.
├── public/          # Publicly served static assets
├── src/
│   ├── common/      # Shared utilities and helpers
│   ├── config/      # Application configuration setup
│   ├── modules/     # Domain-specific business logic
│   ├── plugins/     # Fastify plugin integrations
│   ├── app.ts       # Core application instance setup
│   ├── bootstrap.ts # App startup and plugin registration
│   ├── init.ts      # Pre-startup initializations
│   └── main.ts      # Main application entry point
├── Dockerfile       # Containerization setup for Docker
├── jest.config.ts   # Configuration for Jest testing
├── package.json     # Project metadata and dependencies
└── tsconfig.json    # TypeScript compiler settings
```

---

## Architecture

This template follows a modular, domain-driven structure to keep the codebase organized and scalable. The core principles are:

- **Modular Features**: Each feature is self-contained in `src/modules/`, complete with its own routes, services, and schemas.
- **Centralized Config**: All environment settings are managed in `src/config/` for consistency across the application.
- **Shared Code**: Reusable utilities, like loggers, are stored in `src/common/` to avoid code duplication.
- **Extensible Plugins**: Custom logic and integrations are cleanly handled as plugins in `src/plugins/`.

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

Define your environment variables in a `.env` file. The following are some of the most common variables to configure:

```bash
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
```

Configuration is loaded from `src/config/env.ts`, which provides a centralized place to manage all environment-specific settings.

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

   **Note**: The Docker container does not include an `.env` file by default. You can use the `--env-file` flag to provide one, or pass environment variables directly with the `-e` flag.

---

## License

This project is licensed under the [**MIT License**](./LICENSE).
