import { FromSchema } from 'json-schema-to-ts';
import { asJsonSchema } from '../../../common/typings';

export type CreateTodoSchema = FromSchema<typeof createTodoSchema>;
export const createTodoSchema = asJsonSchema({
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
