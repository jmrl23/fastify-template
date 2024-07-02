import { caching, memoryStore } from 'cache-manager';
import type { FromSchema } from 'json-schema-to-ts';
import { asRoute } from '../lib/util/typings';
import {
  todoCreateSchema,
  todoDeleteSchema,
  todoGetAllSchema,
  todoGetSchema,
  todoUpdateSchema,
} from '../schemas/todo';
import CacheService from '../services/CacheService';
import TodoService from '../services/TodoService';

export const prefix = '/todo';

declare module 'fastify' {
  interface FastifyInstance {
    todoService: TodoService;
  }
}

export default asRoute(async function todoRoute(app) {
  const cache = await caching(memoryStore({ ttl: 0 }));
  const cacheService = new CacheService(cache);
  const todoService = new TodoService(cacheService);

  app.decorate('todoService', todoService);

  app

    .route({
      method: 'POST',
      url: '/create',
      schema: {
        description: todoCreateSchema.description,
        security: [],
        tags: ['todo'],
        body: todoCreateSchema,
      },
      async handler(request) {
        const { content } = request.body as FromSchema<typeof todoCreateSchema>;
        const todo = await this.todoService.createTodo(content);
        return {
          todo,
        };
      },
    })

    .route({
      method: 'GET',
      url: '',
      schema: {
        description: todoGetAllSchema.description,
        security: [],
        tags: ['todo'],
      },
      async handler() {
        const todos = await this.todoService.getTodos();
        return {
          todos,
        };
      },
    })

    .route({
      method: 'GET',
      url: '/:id',
      schema: {
        description: todoGetSchema.description,
        security: [],
        tags: ['todo'],
        params: todoGetSchema,
      },
      async handler(request) {
        const { id } = request.params as FromSchema<typeof todoGetSchema>;
        const todo = await this.todoService.getTodo(id);
        return {
          todo,
        };
      },
    })

    .route({
      method: 'PATCH',
      url: '/update',
      schema: {
        description: todoUpdateSchema.description,
        security: [],
        tags: ['todo'],
        body: todoUpdateSchema,
      },
      async handler(request) {
        const { id, content, done } = request.body as FromSchema<
          typeof todoUpdateSchema
        >;
        const todo = await this.todoService.updateTodo(id, content, done);
        return {
          todo,
        };
      },
    })

    .route({
      method: 'DELETE',
      url: '/delete/:id',
      schema: {
        description: todoDeleteSchema.description,
        security: [],
        tags: ['todo'],
        params: todoDeleteSchema,
      },
      async handler(request) {
        const { id } = request.params as FromSchema<typeof todoDeleteSchema>;
        const todo = await this.todoService.deleteTodo(id);
        return {
          todo,
        };
      },
    });
});
