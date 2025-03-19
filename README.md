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
├── app.ts                        # app entrypoint (main fastify isntance)
├── bootstrap.ts                  # plugins entrypoint
├── common
│   ├── index.ts
│   ├── logger.ts
│   └── typings.ts
├── config
│   └── env.ts
├── init.ts                       # initialization file
├── main.ts                       # main entrypoint
├── modules
│   └── todos
│       ├── todos.route.ts
│       ├── todosSchema.ts
│       ├── todosService.spec.ts
│       └── todosService.ts
├── plugin
│   ├── routes.ts
│   └── swagger.ts
└── test.ts                       # test entrypoint
```
