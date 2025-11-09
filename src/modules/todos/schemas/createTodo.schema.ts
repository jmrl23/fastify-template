import z from 'zod';

export const createTodo = z.object({
  content: z.string().min(1),
});
export type CreateTodo = z.infer<typeof createTodo>;
export const createTodoSchema = z.toJSONSchema(createTodo, {
  target: 'draft-7',
});
