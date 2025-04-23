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

Default folder structure

```
src
├── app.ts                            # main fastify instance
├── bootstrap.ts                      # plugins entrypoint
├── common
│   ├── logger.ts
│   └── typings.ts
├── config
│   └── env.ts
├── init.ts                           # initialization file
├── main.ts                           # main entrypoint
├── modules
│   └── todos
│       ├── schemas
│       │   ├── createTodo.schema.ts
│       │   ├── deleteTodo.schema.ts
│       │   ├── getTodo.schema.ts
│       │   ├── getTodos.schema.ts
│       │   ├── todo.schema.ts
│       │   └── updateTodo.schema.ts
│       ├── todos.route.ts
│       ├── todos.route.spec.ts
│       ├── todos.service.ts
│       └── todos.service.spec.ts
├── plugins
│   ├── routesAutoload.ts
│   └── swagger.ts
└── test.ts                           # test entrypoint
```
