import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async findAll() {
    try {
      const customers = await this.customerRepository.find();

      return customers;
    } catch {
      throw new HttpException(
        { message: 'Não foi possível buscar os clientes.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number) {
    try {
      const customer = await this.customerRepository.findOne({ where: { id } });
      return customer;
    } catch {
      throw new HttpException(
        { message: 'Não foi possível buscar o cliente.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const { email } = createCustomerDto;
      const customerEmailExists = await this.customerRepository.findOne({
        where: { email },
      });

      if (customerEmailExists)
        throw new ConflictException('Email já cadastrado');

      const customerCreated = await this.customerRepository.save(
        createCustomerDto,
      );

      return customerCreated;
    } catch (error) {
      if (!!(error instanceof HttpException)) throw error;
      throw new HttpException(
        { message: 'Não foi possível salvar o cliente.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerEntity> {
    try {
      const { email } = updateCustomerDto;
      const customerEmailExists = await this.customerRepository.findOne({
        where: { email, id: Not(id) },
      });

      if (customerEmailExists)
        throw new ConflictException('Email já cadastrado');

      const customerUpdated = await this.customerRepository.save(
        updateCustomerDto,
      );

      return customerUpdated;
    } catch {
      throw new HttpException(
        { message: 'Não foi possível atualizar o cliente.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.customerRepository.delete(id);

      return { message: 'Cliente excluído com sucesso!' };
    } catch {
      throw new HttpException(
        { message: 'Não foi possível deletar o cliente.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
