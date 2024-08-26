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

Core files and folders

```
src/
├── app.ts                        # main fastify instance
├── bootstrap.ts                  # main plugins entrypoint
├── init.ts                       # initialization file
├── lib/                          # libraries
│   ├── common/
│   │   ├── index.ts
│   │   ├── logger.ts
│   │   └── typings.ts
│   └── constant/
│       └── env.ts
├── main.ts                       # main entrypoint
├── modules/
│   ├── cache/
│   │   ├── cacheService.spec.ts
│   │   └── cacheService.ts
│   └── todos/                    # example module
│       ├── todos.route.ts
│       ├── todosSchema.ts
│       ├── todosService.spec.ts
│       └── todosService.ts
├── plugins/
│   ├── routes.ts
│   └── swagger.ts
└── test.ts                       # test entrypoint (run all test files)
```
