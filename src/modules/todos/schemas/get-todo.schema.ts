import z from 'zod';

export const getTodo = z.object({
  id: z.uuidv4(),
});
export type GetTodo = z.infer<typeof getTodo>;
export const getTodoSchema = z.toJSONSchema(getTodo, {
  target: 'draft-7',
});
