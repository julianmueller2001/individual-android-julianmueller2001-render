import {Entity, model, property} from '@loopback/repository';
import {Todo, TodoWithRelations} from './todo.model';

@model()
export class TodoList extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true
  })
  color: string;


  constructor(data?: Partial<TodoList>) {
    super(data);
  }
}

export interface TodoListRelations {
  todos?: TodoWithRelations[];
}

export type TodoListWithRelations = TodoList & TodoListRelations;
