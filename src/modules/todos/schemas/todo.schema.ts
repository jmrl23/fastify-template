import { FromSchema } from 'json-schema-to-ts';
import { asJsonSchema } from '../../../common/typings';

export type Todo = FromSchema<typeof TodoSchema>;
export const TodoSchema = asJsonSchema({
  type: 'object',
  additionalProperties: false,
  required: ['id', 'createdAt', 'updatedAt', 'content', 'done'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
    content: {
      type: 'string',
      examples: ['Walk the dog'],
    },
    done: {
      type: 'boolean',
      examples: [false],
    },
  },
});
