import z from 'zod';

export const deleteTodo = z.object({
  id: z.uuidv4(),
});
export type DeleteTodo = z.infer<typeof deleteTodo>;
export const deleteTodoSchema = z.toJSONSchema(deleteTodo, {
  target: 'draft-7',
});
