import {Entity, model, property, hasMany} from '@loopback/repository';
import {Address} from './address.model';

@model()
export class Friend extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  firstname?: string;

  @property({
    type: 'string',
  })
  lastname?: string;

  @hasMany(() => Address)
  addresses?: Address[];

  constructor(data?: Partial<Friend>) {
    super(data);
  }
}

export interface FriendRelations {}

export type FriendWithRelations = Friend & FriendRelations;
