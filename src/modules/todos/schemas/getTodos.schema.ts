import { FromSchema } from 'json-schema-to-ts';
import { asJsonSchema } from '../../../common/typings';

export type GetTodosSchema = FromSchema<typeof getTodosSchema>;
export const getTodosSchema = asJsonSchema({
  type: 'object',
  additionalProperties: false,
  properties: {
    content: {
      type: 'string',
      minLength: 1,
    },
    done: {
      type: 'boolean',
    },
    skip: {
      type: 'number',
      minimum: 0,
    },
    take: {
      type: 'number',
      minimum: 0,
    },
  },
});
