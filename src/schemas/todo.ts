import type { FromSchema } from 'json-schema-to-ts';
import { asJsonSchema } from '../lib/util/typings';

export const todoCreateSchema = asJsonSchema({
  type: 'object',
  description: 'Create new todo item',
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
export type TodoCreateSchema = FromSchema<typeof todoCreateSchema>;

export const todoGetAllSchema = asJsonSchema({
  type: 'object',
  description: 'Get todo items',
  additionalProperties: false,
});
export type TodoGetAllSchema = FromSchema<typeof todoGetAllSchema>;

export const todoGetSchema = asJsonSchema({
  type: 'object',
  description: 'Get todo item',
  additionalProperties: false,
  required: ['id'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
  },
});
export type TodoGetSchema = FromSchema<typeof todoGetSchema>;

export const todoUpdateSchema = asJsonSchema({
  type: 'object',
  description: 'Update todo item',
  additionalProperties: false,
  required: ['id'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    content: {
      type: 'string',
      minLength: 1,
      examples: ['Walk the dog'],
    },
    done: {
      type: 'boolean',
      examples: [true],
    },
  },
});
export type TodoUpdateSchema = FromSchema<typeof todoUpdateSchema>;

export const todoDeleteSchema = asJsonSchema({
  type: 'object',
  description: 'Delete todo item',
  additionalProperties: false,
  required: ['id'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
  },
});
export type TodoDeleteSchema = FromSchema<typeof todoDeleteSchema>;
