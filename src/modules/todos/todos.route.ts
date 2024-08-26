import { caching, memoryStore } from 'cache-manager';
import { FastifyRequest } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import { asJsonSchema, asRoute } from '../../lib/common';
import { CacheService } from '../cache/cacheService';
import {
  todoCreateSchema,
  todoDeleteSchema,
  todoGetSchema,
  todoSchema,
  todosGetSchema,
  todoUpdateSchema,
} from './todosSchema';
import { TodosService } from './todosService';

export default asRoute(async function (app) {
  const cache = await caching(
    // check compatible stores at https://www.npmjs.com/package/cache-manager#store-engines
    // or implement your own
    memoryStore({ ttl: 0 }),
  );
  const cacheService = new CacheService(cache);
  const todosService = new TodosService(cacheService);

  app

    .route({
      method: 'POST',
      url: '/create',
      schema: {
        description: 'create a todo',
        tags: ['todos'],
        body: todoCreateSchema,
        response: {
          200: asJsonSchema({
            type: 'object',
            description: 'todo',
            required: ['data'],
            properties: {
              data: todoSchema,
            },
          }),
        },
      },
      async handler(
        request: FastifyRequest<{ Body: FromSchema<typeof todoCreateSchema> }>,
      ) {
        const { content } = request.body;
        const todo = await todosService.createTodo(content);
        return {
          data: todo,
        };
      },
    })

    .route({
      method: 'GET',
      url: '/',
      schema: {
        description: 'get todos by query',
        tags: ['todos'],
        querystring: todosGetSchema,
        response: {
          200: asJsonSchema({
            type: 'object',
            description: 'todos',
            required: ['data'],
            properties: {
              data: {
                type: 'array',
                items: todoSchema,
              },
            },
          }),
        },
      },
      async handler(
        request: FastifyRequest<{
          Querystring: FromSchema<typeof todosGetSchema>;
        }>,
      ) {
        const query = request.query;
        const todos = await todosService.getTodos(query);
        return {
          data: todos,
        };
      },
    })

    .route({
      method: 'GET',
      url: '/:id',
      schema: {
        description: 'get a todo',
        tags: ['todos'],
        params: todoGetSchema,
        response: {
          200: asJsonSchema({
            type: 'object',
            description: 'todo',
            required: ['data'],
            properties: {
              data: todoSchema,
            },
          }),
        },
      },
      async handler(
        request: FastifyRequest<{ Params: FromSchema<typeof todoGetSchema> }>,
      ) {
        const { id } = request.params;
        const todo = await todosService.getTodo(id);
        return {
          data: todo,
        };
      },
    })

    .route({
      method: 'PATCH',
      url: '/update/:id',
      schema: {
        description: 'update a todo',
        tags: ['todos'],
        params: todoUpdateSchema.properties.params,
        body: todoUpdateSchema.properties.body,
        response: {
          200: asJsonSchema({
            type: 'object',
            description: 'todo',
            required: ['data'],
            properties: {
              data: todoSchema,
            },
          }),
        },
      },
      async handler(
        request: FastifyRequest<{
          Params: FromSchema<typeof todoUpdateSchema.properties.params>;
          Body: FromSchema<typeof todoUpdateSchema.properties.body>;
        }>,
      ) {
        const id = request.params.id;
        const { content, done } = request.body;
        const todo = await todosService.updateTodo(id, content, done);
        return {
          data: todo,
        };
      },
    })

    .route({
      method: 'DELETE',
      url: '/delete/:id',
      schema: {
        description: 'delete a todo',
        tags: ['todos'],
        params: todoDeleteSchema,
        response: {
          200: asJsonSchema({
            type: 'object',
            description: 'todo',
            required: ['data'],
            properties: {
              data: todoSchema,
            },
          }),
        },
      },
      async handler(
        request: FastifyRequest<{
          Params: FromSchema<typeof todoDeleteSchema>;
        }>,
      ) {
        const { id } = request.params;
        const todo = await todosService.deleteTodo(id);
        return {
          data: todo,
        };
      },
    });
});
