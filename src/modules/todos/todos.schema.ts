import z from 'zod';

export const todo = z.object({
  id: z.uuidv4(),
  createdAt: z.iso.datetime({ precision: 3 }),
  updatedAt: z.iso.datetime({ precision: 3 }),
  content: z.string().min(1),
  done: z.boolean(),
});
export type Todo = z.infer<typeof todo>;
export const todoSchema = z.toJSONSchema(todo, {
  target: 'draft-7',
});

export const createTodo = z.object({
  content: z.string().min(1),
});
export type CreateTodo = z.infer<typeof createTodo>;
export const createTodoSchema = z.toJSONSchema(createTodo, {
  target: 'draft-7',
});

export const getTodos = z.object({
  content: z.string().min(1).optional(),
  done: z.boolean().optional(),
  skip: z.number().min(0).optional(),
  take: z.number().min(0).optional(),
});
export type GetTodos = z.infer<typeof getTodos>;
export const getTodosSchema = z.toJSONSchema(getTodos, {
  target: 'draft-7',
});

export const getTodo = z.object({
  id: z.uuidv4(),
});
export type GetTodo = z.infer<typeof getTodo>;
export const getTodoSchema = z.toJSONSchema(getTodo, {
  target: 'draft-7',
});

export const updateTodoBody = z.object({
  content: z.string().min(1).optional(),
  done: z.boolean().optional(),
});
export type UpdateTodoBody = z.infer<typeof updateTodoBody>;
export const updateTodoBodySchema = z.toJSONSchema(updateTodoBody, {
  target: 'draft-7',
});

export const updateTodoParams = z.object({
  id: z.uuidv4(),
});
export type UpdateTodoParams = z.infer<typeof updateTodoParams>;
export const updateTodoParamsSchema = z.toJSONSchema(updateTodoParams, {
  target: 'draft-7',
});

export const deleteTodo = z.object({
  id: z.uuidv4(),
});
export type DeleteTodo = z.infer<typeof deleteTodo>;
export const deleteTodoSchema = z.toJSONSchema(deleteTodo, {
  target: 'draft-7',
});
