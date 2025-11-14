import { asRoute } from '@common/typings';
import {
  CreateTodo,
  createTodoSchema,
} from '@modules/todos/schemas/create-todo.schema';
import {
  DeleteTodo,
  deleteTodoSchema,
} from '@modules/todos/schemas/delete-todo.schema';
import { GetTodo, getTodoSchema } from '@modules/todos/schemas/get-todo.schema';
import {
  GetTodos,
  getTodosSchema,
} from '@modules/todos/schemas/get-todos.schema';
import { todo } from '@modules/todos/schemas/todo.schema';
import {
  UpdateTodoBody,
  updateTodoBodySchema,
  UpdateTodoParams,
  updateTodoParamsSchema,
} from '@modules/todos/schemas/update-todo.schema';
import { TodosService } from '@modules/todos/todos.service';
import { FastifyRequest } from 'fastify';
import z from 'zod';

export default asRoute(async function (app) {
  const todosService = new TodosService();

  app

    .route({
      method: 'POST',
      url: '/',
      schema: {
        description: 'create a todo item',
        tags: ['Todos'],
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
        tags: ['Todos'],
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
        tags: ['Todos'],
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
        tags: ['Todos'],
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
        tags: ['Todos'],
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
