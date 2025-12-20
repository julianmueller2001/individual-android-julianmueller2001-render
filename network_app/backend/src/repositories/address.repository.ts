import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Address, AddressRelations} from '../models';
import {DbDataSource} from '../datasources';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  typeof Address.prototype.id,
  AddressRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Address, dataSource);
  }
}
