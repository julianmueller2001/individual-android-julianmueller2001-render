import {
  repository,
} from '@loopback/repository';
import {
  post,
  get,
  getModelSchemaRef,
  param,
  del,
  put,
  requestBody,
} from '@loopback/rest';
import {Address, Friend} from '../models';
import {FriendRepository} from '../repositories';

export class FriendController {
  constructor(
    @repository(FriendRepository)
    public friendRepository: FriendRepository,
  ) {}

  @post('/friends')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Friend, {
            exclude: ['id'],
          }),
        },
      },
    })
    friend: Omit<Friend, 'id'>,
  ): Promise<Friend> {
    return this.friendRepository.create(friend);
  }

  @get('/friends')
  async find(): Promise<Friend[]> {
    return this.friendRepository.find({include: ['addresses']});
  }

  @get('/friends/{id}')
  async findById(
    @param.path.number('id') id: number,
  ): Promise<Friend> {
    return this.friendRepository.findById(id, {
      include: ['addresses'],
    });
  }

  @put('/friends/{id}')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() friend: Friend,
  ): Promise<void> {
    await this.friendRepository.updateById(id, friend);
  }

  @del('/friends/{id}')
  async deleteById(
    @param.path.number('id') id: number,
  ): Promise<void> {
    await this.friendRepository.deleteById(id);
  }

  @get('/friends/{id}/addresses')
  async findAddressOfFriend(
    @param.path.number('id') id: typeof Friend.prototype.id,
  ): Promise<Address[]> {
    return this.friendRepository.addresses(id).find();
  }

  @post('/friends/{id}/addresses')
  async createAddressForFriend(
    @param.path.number('id') id: typeof Friend.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {
            exclude: ['id', 'friendId'],
          }),
        },
      },
    })
    address: Omit<Address, 'id'>,
  ): Promise<Address> {
    return this.friendRepository.addresses(id).create(address);
  }
}
