import fastify, { FastifyInstance } from 'fastify';
import { todo, Todo } from '@modules/todos/schemas/todo.schema';
import todosRoute from '@modules/todos/todos.route';

describe('test todos route', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(todosRoute);
  });

  let todoRef: Todo;

  it('create todo', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/',
      body: {
        content: 'Test todos route',
      },
    });
    const { data: createdTodo } = response.json<{ data: Todo }>();
    todoRef = createdTodo;
    expect(createdTodo).toStrictEqual(todo.parse(createdTodo));
    expect(response.statusCode).toStrictEqual(200);
    expect(createdTodo.content).toStrictEqual('Test todos route');
  });

  it('list todos', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/',
    });
    const { data: todos } = response.json<{ data: Todo[] }>();
    expect(todos).toStrictEqual([todo.parse(todoRef)]);
    expect(response.statusCode).toStrictEqual(200);
  });

  it('get todo', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/${todoRef.id}`,
    });
    const { data: item } = response.json<{ data: Todo }>();
    expect(item).toStrictEqual(todo.parse(todoRef));
    expect(response.statusCode).toStrictEqual(200);
  });

  it('update todo', async () => {
    const response = await app.inject({
      method: 'PATCH',
      url: `/update/${todoRef.id}`,
      body: {
        content: 'Updated todo content',
        done: true,
      },
    });
    const { data: item } = response.json<{ data: Todo }>();
    expect(item).toStrictEqual(
      todo.parse({
        ...todoRef,
        content: 'Updated todo content',
        done: true,
      }),
    );
    expect(response.statusCode).toStrictEqual(200);
    todoRef = item;
  });

  it('delete todo', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/delete/${todoRef.id}`,
    });
    const { data: item } = response.json<{ data: Todo }>();
    expect(item).toStrictEqual(todo.parse(todoRef));
    expect(response.statusCode).toStrictEqual(200);
    const deleteAttempt = await app.inject({
      method: 'DELETE',
      url: `/delete/${todoRef.id}`,
    });
    expect(deleteAttempt.statusCode).toStrictEqual(404);
  });
});
