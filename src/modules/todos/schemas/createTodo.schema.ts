import { FromSchema } from 'json-schema-to-ts';
import { asJsonSchema } from '../../../common/typings';

export type CreateTodo = FromSchema<typeof CreateTodoSchema>;
export const CreateTodoSchema = asJsonSchema({
  type: 'object',
  additionalProperties: false,
  required: ['content'],
  properties: {
    content: {
      type: 'string',
      minLength: 1,
      examples: ['Walk the dog'],
    },
  },
});
