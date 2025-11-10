import { FastifyRequest } from 'fastify';
import { asRoute } from '../../common/typings';
import { CreateTodo, createTodoSchema } from './schemas/createTodo.schema';
import { DeleteTodo, deleteTodoSchema } from './schemas/deleteTodo.schema';
import { GetTodo, getTodoSchema } from './schemas/getTodo.schema';
import { GetTodos, getTodosSchema } from './schemas/getTodos.schema';
import { todo } from './schemas/todo.schema';
import {
  UpdateTodoBody,
  updateTodoBodySchema,
  UpdateTodoParams,
  updateTodoParamsSchema,
} from './schemas/updateTodo.schema';
import { TodosService } from './todos.service';
import z from 'zod';

export default asRoute(async function (app) {
  const todosService = new TodosService();

  app

    .route({
      method: 'POST',
      url: '/create',
      schema: {
        description: 'create a todo item',
        tags: ['todos'],
        body: createTodoSchema,
        response: {
          200: z.toJSONSchema(
            z.object({ data: todo }).describe('created item'),
            { target: 'draft-7' },
          ),
        },
      },
      async handler(request: FastifyRequest<{ Body: CreateTodo }>) {
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
        querystring: getTodosSchema,
        response: {
          200: z.toJSONSchema(
            z.object({ data: z.array(todo) }).describe('todo items'),
            { target: 'draft-7' },
          ),
        },
      },
      async handler(request: FastifyRequest<{ Querystring: GetTodos }>) {
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
        params: getTodoSchema,
        response: {
          200: z.toJSONSchema(z.object({ data: todo }).describe('todo item'), {
            target: 'draft-7',
          }),
        },
      },
      async handler(request: FastifyRequest<{ Params: GetTodo }>) {
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
        params: updateTodoParamsSchema,
        body: updateTodoBodySchema,
        response: {
          200: z.toJSONSchema(z.object({ data: todo }).describe('todo item'), {
            target: 'draft-7',
          }),
        },
      },
      async handler(
        request: FastifyRequest<{
          Params: UpdateTodoParams;
          Body: UpdateTodoBody;
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
        params: deleteTodoSchema,
        response: {
          200: z.toJSONSchema(z.object({ data: todo }).describe('todo item'), {
            target: 'draft-7',
          }),
        },
      },
      async handler(
        request: FastifyRequest<{
          Params: DeleteTodo;
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
