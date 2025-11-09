import fastify from 'fastify';
import assert from 'node:assert';
import { describe, it } from 'node:test';
import { Todo } from './schemas/todo.schema';
import todosRoute from './todos.route';

describe('test todos route', async function () {
  const app = fastify();

  await app.register(todosRoute);

  let todoRef: Todo;

  it('create todo', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/create',
      body: {
        content: 'Test todos route',
      },
    });
    const { data: todo } = response.json<{ data: Todo }>();

    todoRef = todo;

    assert.strictEqual(response.statusCode, 200);
    assert.ok(todo);
    assert.strictEqual(todo.content, 'Test todos route');
  });

  it('list todos', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/',
    });
    const { data: todos } = response.json<{ data: Todo[] }>();

    assert.strictEqual(todos.length, 1);
    assert.strictEqual(todos[0]?.id, todoRef.id);
  });

  it('get todo', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/${todoRef.id}`,
    });
    const { data: todo } = response.json<{ data: Todo }>();

    assert.strictEqual(todo.id, todoRef.id);
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
    const { data: todo } = response.json<{ data: Todo }>();

    assert.strictEqual(todo.id, todoRef.id);
    assert.strictEqual(todo.content, 'Updated todo content');
    assert.strictEqual(todo.done, true);

    todoRef = todo;
  });

  it('delete todo', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/delete/${todoRef.id}`,
    });
    const { data: todo } = response.json<{ data: Todo }>();

    assert.deepStrictEqual(todo, todoRef);

    const deleteAttempt = await app.inject({
      method: 'DELETE',
      url: `/delete/${todoRef.id}`,
    });

    assert.strictEqual(deleteAttempt.statusCode, 404);
  });
});
