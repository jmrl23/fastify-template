import z from 'zod';

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
