import { Todo, todo } from './schemas/todo.schema';
import { TodosService } from './todos.service';

describe('todos service', () => {
  const todos = new TodosService();
  let itemRef: Todo;

  it('create item', async () => {
    const item = await todos.createTodo('Walk the dog');
    expect(item).toStrictEqual(todo.parse(item));
    itemRef = structuredClone(item);
  });

  it('get item', async () => {
    expect(todos.getTodo('invalid id')).rejects.toThrow();
    const item = await todos.getTodo(itemRef.id);
    expect(item).toStrictEqual(itemRef);
  });

  it('get items', async () => {
    const items = await todos.getTodos({});
    expect(items).toStrictEqual([itemRef]);
    const items2 = await todos.getTodos({ content: 'Walk' });
    expect(items2).toStrictEqual([itemRef]);
  });

  it('update item', async () => {
    const content = 'Walk the cat';
    const item = await todos.updateTodo(itemRef.id, content);
    expect(todo.parse(item)).toStrictEqual({ ...itemRef, content });
    itemRef = todo.parse(item);
  });

  it('delete item', async () => {
    const id = itemRef.id;
    const item = await todos.deleteTodo(id);
    expect(item).toStrictEqual(itemRef);
    expect(todos.getTodo(id)).rejects.toThrow();
  });
});
