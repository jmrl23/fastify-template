import { caching, memoryStore } from 'cache-manager';
import type { FastifyRequest } from 'fastify';
import { asRoute } from '../lib/util/typings';
import {
  TodoCreateSchema,
  todoCreateSchema,
  TodoDeleteSchema,
  todoDeleteSchema,
  todoGetAllSchema,
  TodoGetSchema,
  todoGetSchema,
  TodoUpdateSchema,
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
        tags: ['todo'],
        body: todoCreateSchema,
      },
      async handler(request: FastifyRequest<{ Body: TodoCreateSchema }>) {
        const { content } = request.body;
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
        tags: ['todo'],
        params: todoGetSchema,
      },
      async handler(request: FastifyRequest<{ Params: TodoGetSchema }>) {
        const { id } = request.params;
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
        tags: ['todo'],
        body: todoUpdateSchema,
      },
      async handler(request: FastifyRequest<{ Body: TodoUpdateSchema }>) {
        const { id, content, done } = request.body;
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
        tags: ['todo'],
        params: todoDeleteSchema,
      },
      async handler(request: FastifyRequest<{ Params: TodoDeleteSchema }>) {
        const { id } = request.params;
        const todo = await this.todoService.deleteTodo(id);
        return {
          todo,
        };
      },
    });
});
