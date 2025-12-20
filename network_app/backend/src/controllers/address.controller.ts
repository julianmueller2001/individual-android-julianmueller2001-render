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
import {Address} from '../models';
import {AddressRepository} from '../repositories';

export class AddressController {
  constructor(
    @repository(AddressRepository)
    public addressRepository: AddressRepository,
  ) {}

  @post('/addresses', {
    responses: {
      '200': {
        description: 'Address model instance',
        content: {'application/json': {schema: getModelSchemaRef(Address)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {
            title: 'NewAddress',
            exclude: ['id'],
          }),
        },
      },
    })
    address: Omit<Address, 'id'>,
  ): Promise<Address> {
    return this.addressRepository.create(address);
  }

  @get('/addresses', {
    responses: {
      '200': {
        description: 'Array of Address model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Address),
            },
          },
        },
      },
    },
  })
  async find(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  @get('/addresses/{id}', {
    responses: {
      '200': {
        description: 'Address model instance',
        content: {'application/json': {schema: getModelSchemaRef(Address)}},
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
  ): Promise<Address> {
    return this.addressRepository.findById(id);
  }

  @put('/addresses/{id}', {
    responses: {
      '204': {
        description: 'Address PUT success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() address: Address,
  ): Promise<void> {
    await this.addressRepository.updateById(id, address);
  }

  @del('/addresses/{id}', {
    responses: {
      '204': {
        description: 'Address DELETE success',
      },
    },
  })
  async deleteById(
    @param.path.number('id') id: number,
  ): Promise<void> {
    await this.addressRepository.deleteById(id);
  }
}
