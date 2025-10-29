import { NotFound } from 'http-errors';
import crypto from 'node:crypto';
import { GetTodosSchema } from './schemas/getTodos.schema';
import { TodoSchema } from './schemas/todo.schema';

export class TodosService {
  private readonly todos: TodoSchema[] = [];

  constructor() {}

  public async createTodo(content: string): Promise<TodoSchema> {
    const id = crypto.randomUUID();
    const now = new Date();
    const todo: TodoSchema = {
      id,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      content,
      done: false,
    };
    this.todos.push(todo);
    return todo;
  }

  public async getTodos(query: GetTodosSchema): Promise<TodoSchema[]> {
    const todos = structuredClone(
      this.todos.filter((todo) => {
        let isIncluded = true;

        if (query.content !== undefined) {
          if (!todo.content.startsWith(query.content)) isIncluded = false;
        }

        if (!isIncluded) return false;

        if (query.done !== undefined) {
          if (todo.done !== query.done) isIncluded = false;
        }

        return isIncluded;
      }),
    ).slice(query.skip, query.take);

    return todos;
  }

  public async getTodo(id: string): Promise<TodoSchema> {
    const todo = structuredClone(this.todos.find((todo) => todo.id === id));

    if (!todo) throw new NotFound('Todo not found');
    return todo;
  }

  public async updateTodo(
    id: string,
    content?: string,
    done?: boolean,
  ): Promise<TodoSchema> {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFound('Todo not found');

    if (content !== undefined) todo.content = content;

    if (done !== undefined) todo.done = done;

    const todoClone = structuredClone(todo);
    return todoClone;
  }

  public async deleteTodo(id: string): Promise<TodoSchema> {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index < 0) throw new NotFound('Todo not found');

    const todo = this.todos.splice(index, 1)[0];
    return todo;
  }
}
