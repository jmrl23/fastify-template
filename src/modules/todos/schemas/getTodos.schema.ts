import { FromSchema } from 'json-schema-to-ts';
import { asJsonSchema } from '../../../common/typings';

export type GetTodos = FromSchema<typeof GetTodosSchema>;
export const GetTodosSchema = asJsonSchema({
  type: 'object',
  additionalProperties: false,
  properties: {
    revalidate: {
      type: 'boolean',
    },
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
