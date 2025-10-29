import { FastifyRequest } from 'fastify';
import { asJsonSchema, asRoute } from '../../common/typings';
import {
  CreateTodoSchema,
  createTodoSchema,
} from './schemas/createTodo.schema';
import {
  DeleteTodoSchema,
  deleteTodoSchema,
} from './schemas/deleteTodo.schema';
import { GetTodoSchema, getTodoSchema } from './schemas/getTodo.schema';
import { GetTodosSchema, getTodosSchema } from './schemas/getTodos.schema';
import { todoSchema } from './schemas/todo.schema';
import {
  UpdateTodoSchema,
  updateTodoSchema,
} from './schemas/updateTodo.schema';
import { TodosService } from './todos.service';

export default asRoute(async function (app) {
  const todosService = new TodosService();

  app

    .route({
      method: 'POST',
      url: '/create',
      schema: {
        description: 'create a todo',
        tags: ['todos'],
        body: createTodoSchema,
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
      async handler(request: FastifyRequest<{ Body: CreateTodoSchema }>) {
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
      async handler(request: FastifyRequest<{ Querystring: GetTodosSchema }>) {
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
      async handler(request: FastifyRequest<{ Params: GetTodoSchema }>) {
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
        params: updateTodoSchema.properties.params,
        body: updateTodoSchema.properties.body,
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
          Params: UpdateTodoSchema['params'];
          Body: UpdateTodoSchema['body'];
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
          Params: DeleteTodoSchema;
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
