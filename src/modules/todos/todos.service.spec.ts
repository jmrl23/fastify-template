import { Todo, todo } from '@/modules/todos/todos.schema';
import { TodosService } from '@/modules/todos/todos.service';

describe('todos service', () => {
  const todosService = new TodosService(`test-${Date.now()}.json`);
  const state: { todo?: Todo } = {};

  beforeAll(async () => {
    await todosService.initialize();
  });

  it('create item', async () => {
    const task = await todosService.createTodo('Walk the dog');
    expect(task).toStrictEqual(todo.parse(task));
    state.todo = task;
  });

  it('get item', async () => {
    expect(todosService.getTodo('1')).rejects.toThrow();
    const task = await todosService.getTodo(state.todo!.id);
    expect(task).toStrictEqual(state.todo);
  });

  it('get items', async () => {
    const task = state.todo;
    expect(await todosService.getTodos()).toStrictEqual([task]);
    expect(await todosService.getTodos({})).toStrictEqual([task]);
    expect(await todosService.getTodos({ content: 'Walk' })).toStrictEqual([
      task,
    ]);
    expect(await todosService.getTodos({ content: 'Run' })).toStrictEqual([]);
    expect(await todosService.getTodos({ done: true })).toStrictEqual([]);
    expect(await todosService.getTodos({ done: false })).toStrictEqual([task]);
    expect(
      await todosService.getTodos({ content: 'Walk the dog', done: false }),
    ).toStrictEqual([task]);
    expect(
      await todosService.getTodos({ content: 'Walk the dog', done: true }),
    ).toStrictEqual([]);
    expect(await todosService.getTodos({ skip: 1 })).toStrictEqual([]);
    expect(await todosService.getTodos({ take: 1 })).toStrictEqual([task]);
    expect(await todosService.getTodos({ skip: 1, take: 1 })).toStrictEqual([]);
    expect(await todosService.getTodos({ skip: 0, take: 1 })).toStrictEqual([
      task,
    ]);
  });

  it('update item', async () => {
    const content = 'Walk the cat';
    const task = await todosService.updateTodo(state.todo!.id, content);
    expect(task).toStrictEqual({ ...state.todo, content });
    expect(todosService.updateTodo('1')).rejects.toThrow();
    state.todo = task;
  });

  it('delete item', async () => {
    expect(await todosService.deleteTodo(state.todo!.id)).toStrictEqual(
      state.todo,
    );
    expect(todosService.getTodo(state.todo!.id)).rejects.toThrow();
  });
});
