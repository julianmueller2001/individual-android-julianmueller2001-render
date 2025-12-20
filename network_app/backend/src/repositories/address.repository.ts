import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Address, AddressRelations} from '../models';
import {JwtDbDataSource} from '../datasources';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  typeof Address.prototype.id,
  AddressRelations
> {
  constructor(
    @inject('datasources.jwtdb') dataSource: JwtDbDataSource,
  ) {
    super(Address, dataSource);
  }
}
