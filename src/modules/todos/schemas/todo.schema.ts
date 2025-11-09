import z from 'zod';

export const todo = z.object({
  id: z.uuidv4(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  content: z.string().min(1),
  done: z.boolean(),
});
export type Todo = z.infer<typeof todo>;
export const todoSchema = z.toJSONSchema(todo, {
  target: 'draft-7',
});
