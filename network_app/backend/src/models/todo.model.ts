import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TodoList} from './todo-list.model';

@model()
export class Todo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: false,
  })
  title: string;

  @property({
    type: 'boolean',
    required: false,
  })
  isComplete?: boolean;

  @belongsTo(() => TodoList)
  todoListId: number;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  todoList?: TodoList;
}

export type TodoWithRelations = Todo & TodoRelations;
