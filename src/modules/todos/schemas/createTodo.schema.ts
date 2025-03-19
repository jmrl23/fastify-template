import { asJsonSchema } from '../../../common';

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
