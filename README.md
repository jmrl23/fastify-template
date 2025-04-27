# Fastify Template

template for building fastify application

<picture>
  <source srcset="https://fastify.dev/img/logos/fastify-white.svg" media="(prefers-color-scheme: dark)" />
  <img src="https://fastify.dev/img/logos/fastify-black.svg" />
</picture>

## Installation

```sh
yarn # or npm install
```

## Scripts

| Script     | Description                                 |
| ---------- | ------------------------------------------- |
| build      | build project                               |
| test       | run test files                              |
| start      | start (must build first)                    |
| start:dev  | start on development mode (nodemon + swc)   |
| start:prod | start on production mode (must build first) |
| format     | format codes (prettier)                     |
| lint       | lint codes (eslint)                         |

## Structure

Project structure

```
├── .vscode/                  # Editor settings
├── public/                   # Static assets
├── src/                      # Application source
│   ├── app.ts                # Fastify instance
│   ├── bootstrap.ts          # Plugin entrypoint
│   ├── common/               # Shared utils (logger, typings)
│   ├── config/               # Environment loaders
│   ├── init.ts               # Initialization logic
│   ├── main.ts               # Server startup
│   ├── modules/              # Domain modules (e.g., todos)
│   └── plugins/              # Autoload & Swagger setup
├── test.ts                   # Test runner entrypoint
├── Dockerfile                # Container image build
├── docker-compose.yaml       # Multi-service development
├── .dockerignore             # Files to ignore in images
├── .prettierrc               # Formatting rules
├── eslint.config.mjs         # Linting rules
├── nodemon.json              # Dev server config
├── package.json              # Scripts & dependencies
├── tsconfig.json             # TypeScript compiler options
└── yarn.lock                 # Exact dependency versions

```
