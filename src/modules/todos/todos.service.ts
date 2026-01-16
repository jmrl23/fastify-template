import { GetTodos, Todo } from '@/modules/todos/todos.schema';
import { NotFound } from 'http-errors';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

export class TodosService {
  private readonly STORE_PATH!: string;

  constructor(name: `${string}.json`) {
    this.STORE_PATH = path.resolve(os.tmpdir(), name);
  }

  async initialize(): Promise<void> {
    await fs.access(this.STORE_PATH, fs.constants.F_OK).catch(async () => {
      await this.write({ todos: [] });
    });
  }

  async createTodo(content: string): Promise<Todo> {
    const id = crypto.randomUUID();
    const now = new Date();
    const todo: Todo = {
      id,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      content,
      done: false,
    };
    const data = await this.read();
    data.todos.push(todo);
    await this.write(data);
    return todo;
  }

  async getTodos(query: GetTodos = {}): Promise<Todo[]> {
    const data = await this.read();
    const todos = data.todos
      .filter((todo) => {
        let isIncluded = true;
        if (query.content !== undefined) {
          if (!todo.content.startsWith(query.content)) isIncluded = false;
        }
        if (query.done !== undefined) {
          if (todo.done !== query.done) isIncluded = false;
        }
        return isIncluded;
      })
      .slice(query.skip, query.take);
    return todos;
  }

  async getTodo(id: string): Promise<Todo> {
    const data = await this.read();
    const todo = data.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFound('Todo not found');
    return todo;
  }

  async updateTodo(
    id: string,
    content?: string,
    done?: boolean,
  ): Promise<Todo> {
    const data = await this.read();
    const todo = data.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFound('Todo not found');
    if (content !== undefined) todo.content = content;
    if (done !== undefined) todo.done = done;
    await this.write(data);
    return todo;
  }

  async deleteTodo(id: string): Promise<Todo> {
    const data = await this.read();
    const index = data.todos.findIndex((todo) => todo.id === id);
    if (index < 0) throw new NotFound('Todo not found');
    const todo = data.todos.splice(index, 1)[0];
    await this.write(data);
    return todo;
  }

  private async read(): Promise<{ todos: Todo[] }> {
    const raw = await fs.readFile(this.STORE_PATH, {
      encoding: 'utf-8',
    });
    return JSON.parse(raw);
  }

  private async write(data: { todos: Todo[] }): Promise<void> {
    await fs.writeFile(this.STORE_PATH, JSON.stringify(data));
  }
}
