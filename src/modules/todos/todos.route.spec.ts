import todosRoute from '@/modules/todos/todos.route';
import { todo, Todo } from '@/modules/todos/todos.schema';
import fastify, { FastifyInstance } from 'fastify';

describe('test todos route', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(todosRoute);
  });

  const state: { todo?: Todo } = {};

  it('create todo', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/',
      body: {
        content: 'Test todos route',
      },
    });
    const { data } = response.json<{ data: Todo }>();
    state.todo = data;
    expect(data).toStrictEqual(todo.parse(data));
    expect(response.statusCode).toStrictEqual(201);
    expect(data.content).toStrictEqual('Test todos route');
  });

  it('list todos', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/',
    });
    const { data } = response.json<{ data: Todo[] }>();
    expect(data).toStrictEqual([todo.parse(state.todo)]);
    expect(response.statusCode).toStrictEqual(200);
  });

  it('get todo', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/${state.todo?.id}`,
    });
    const { data } = response.json<{ data: Todo }>();
    expect(data).toStrictEqual(todo.parse(state.todo));
    expect(response.statusCode).toStrictEqual(200);
  });

  it('update todo', async () => {
    const response = await app.inject({
      method: 'PATCH',
      url: `/update/${state.todo?.id}`,
      body: {
        content: 'Updated todo content',
        done: true,
      },
    });
    const { data } = response.json<{ data: Todo }>();
    expect(data).toStrictEqual(
      todo.parse({
        ...state.todo,
        content: 'Updated todo content',
        done: true,
      }),
    );
    expect(response.statusCode).toStrictEqual(200);
    state.todo = data;
  });

  it('delete todo', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/delete/${state.todo?.id}`,
    });
    const { data } = response.json<{ data: Todo }>();
    expect(data).toStrictEqual(todo.parse(state.todo));
    expect(response.statusCode).toStrictEqual(200);
    const deleteAttempt = await app.inject({
      method: 'DELETE',
      url: `/delete/${state.todo?.id}`,
    });
    expect(deleteAttempt.statusCode).toStrictEqual(404);
  });
});
