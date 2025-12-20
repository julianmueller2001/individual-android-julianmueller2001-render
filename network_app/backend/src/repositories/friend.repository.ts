import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {Friend, FriendRelations, Address} from '../models';
import {JwtDbDataSource} from '../datasources';
import {AddressRepository} from './address.repository';

export class FriendRepository extends DefaultCrudRepository<
  Friend,
  typeof Friend.prototype.id,
  FriendRelations
> {
  public readonly addresses: HasManyRepositoryFactory<
    Address,
    typeof Friend.prototype.id
  >;

  constructor(
    @inject('datasources.jwtdb') dataSource: JwtDbDataSource,
    @repository.getter('AddressRepository')
    protected addressRepositoryGetter: Getter<AddressRepository>,
  ) {
    super(Friend, dataSource);

    this.addresses = this.createHasManyRepositoryFactoryFor(
      'addresses',
      addressRepositoryGetter,
    );
    this.registerInclusionResolver(
      'addresses',
      this.addresses.inclusionResolver,
    );
  }
}
