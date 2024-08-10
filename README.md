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

## Structure

Core files and folders

```
src
├── app.ts            // main fastify instance
├── bootstrap.ts      // main plugin wrapper
├── init.ts           // initialization SYNC processes (MUST IMPORT IN `main.ts` BEFORE ANYTHING ELSE)
├── lib
│   ├── common        // contains helper function files
│   └── constant
│       └── env.ts    // environment variables
├── main.ts           // main entrypoint
├── plugins           // contains plugin files
├── routes            // contains route function files
├── schemas           // contains schema files (json schema)
├── services          // contains services/ injectables
└── test.ts           // test entrypoint (executes test files)
```
