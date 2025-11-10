import z from 'zod';

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
