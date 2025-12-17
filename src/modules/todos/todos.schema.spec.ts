import {
  createTodo,
  createTodoSchema,
  deleteTodo,
  deleteTodoSchema,
  getTodo,
  getTodos,
  getTodoSchema,
  getTodosSchema,
  todo,
  todoSchema,
  updateTodoBody,
  updateTodoBodySchema,
  updateTodoParams,
  updateTodoParamsSchema,
} from '@/modules/todos/todos.schema';
import Ajv from 'ajv';
import crypto from 'node:crypto';

const ajv = new Ajv();

describe('Validate schema', () => {
  it('validate zod todo schema', async () => {
    expect((await todo.safeParseAsync({})).success).toBe(false);
    const now = new Date().toISOString();
    expect(
      (
        await todo.safeParseAsync({
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
          content: 'Walk the dog',
          done: false,
        })
      ).success,
    ).toBe(true);
  });

  it('validate CREATE', async () => {
    expect((await createTodo.safeParseAsync({})).success).toBe(false);
    expect(
      (await createTodo.safeParseAsync({ content: 'Walk the dog' })).success,
    ).toBe(true);
  });

  it('validate READ', async () => {
    expect((await getTodos.safeParseAsync({})).success).toBe(true);
    expect((await getTodos.safeParseAsync({ done: 'true' })).success).toBe(
      false,
    );
    expect((await getTodos.safeParseAsync({ done: true })).success).toBe(true);
    expect((await getTodos.safeParseAsync({ content: 'true' })).success).toBe(
      true,
    );
    expect((await getTodos.safeParseAsync({ content: true })).success).toBe(
      false,
    );
    expect((await getTodos.safeParseAsync({ skip: '1' })).success).toBe(false);
    expect((await getTodos.safeParseAsync({ skip: 1 })).success).toBe(true);
    expect((await getTodos.safeParseAsync({ take: '1' })).success).toBe(false);
    expect((await getTodos.safeParseAsync({ take: 1 })).success).toBe(true);
    expect(
      (
        await getTodos.safeParseAsync({
          done: true,
          content: 'true',
          skip: 1,
          take: 1,
        })
      ).success,
    ).toBe(true);

    expect((await getTodo.safeParseAsync({ id: 1 })).success).toBe(false);
    expect((await getTodo.safeParseAsync({ id: 'random-id' })).success).toBe(
      false,
    );
    expect(
      (await getTodos.safeParseAsync({ id: crypto.randomUUID() })).success,
    ).toBe(true);
  });

  it('validate UPDATE', async () => {
    expect((await updateTodoBody.safeParseAsync({})).success).toBe(true);
    expect(
      (await updateTodoBody.safeParseAsync({ content: true })).success,
    ).toBe(false);
    expect(
      (await updateTodoBody.safeParseAsync({ content: 'true' })).success,
    ).toBe(true);
    expect((await updateTodoBody.safeParseAsync({ done: true })).success).toBe(
      true,
    );
    expect(
      (await updateTodoBody.safeParseAsync({ done: 'true' })).success,
    ).toBe(false);

    expect((await updateTodoParams.safeParseAsync({})).success).toBe(false);
    expect(
      (await updateTodoParams.safeParseAsync({ id: 'random-id' })).success,
    ).toBe(false);
    expect(
      (await updateTodoParams.safeParseAsync({ id: crypto.randomUUID() }))
        .success,
    ).toBe(true);
  });

  it('validate DELETE', async () => {
    expect((await deleteTodo.safeParseAsync({})).success).toBe(false);
    expect((await deleteTodo.safeParseAsync({ id: 'random-id' })).success).toBe(
      false,
    );
    expect(
      (await deleteTodo.safeParseAsync({ id: crypto.randomUUID() })).success,
    ).toBe(true);
  });

  it('validate JSON schemas', () => {
    expect(ajv.validateSchema(todoSchema)).toBe(true);
    expect(ajv.validateSchema(createTodoSchema)).toBe(true);
    expect(ajv.validateSchema(getTodosSchema)).toBe(true);
    expect(ajv.validateSchema(getTodoSchema)).toBe(true);
    expect(ajv.validateSchema(updateTodoParamsSchema)).toBe(true);
    expect(ajv.validateSchema(updateTodoBodySchema)).toBe(true);
    expect(ajv.validateSchema(deleteTodoSchema)).toBe(true);
  });
});
