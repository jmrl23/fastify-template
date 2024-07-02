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
  todoResponse200,
  todosResponse200,
  TodoUpdateSchema,
  todoUpdateSchema,
} from '../schemas/todo';
import CacheService from '../services/CacheService';
import TodoService from '../services/TodoService';

export const prefix = '/todo';

export default asRoute(async function todoRoute(app) {
  const cache = await caching(memoryStore({ ttl: 0 }));
  const cacheService = new CacheService(cache);
  const todoService = new TodoService(cacheService);

  app

    .route({
      method: 'POST',
      url: '/create',
      schema: {
        description: todoCreateSchema.description,
        tags: ['todo'],
        body: todoCreateSchema,
        response: {
          200: todoResponse200,
        },
      },
      async handler(request: FastifyRequest<{ Body: TodoCreateSchema }>) {
        const { content } = request.body;
        const todo = await todoService.createTodo(content);
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
        response: {
          200: todosResponse200,
        },
      },
      async handler() {
        const todos = await todoService.getTodos();
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
        response: {
          200: todoResponse200,
        },
      },
      async handler(request: FastifyRequest<{ Params: TodoGetSchema }>) {
        const { id } = request.params;
        const todo = await todoService.getTodo(id);
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
        response: {
          200: todoResponse200,
        },
      },
      async handler(request: FastifyRequest<{ Body: TodoUpdateSchema }>) {
        const { id, content, done } = request.body;
        const todo = await todoService.updateTodo(id, content, done);
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
        response: {
          200: todoResponse200,
        },
      },
      async handler(request: FastifyRequest<{ Params: TodoDeleteSchema }>) {
        const { id } = request.params;
        const todo = await todoService.deleteTodo(id);
        return {
          todo,
        };
      },
    });
});
