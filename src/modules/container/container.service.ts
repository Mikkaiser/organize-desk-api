import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContainerDto } from './dto/create-container.dto';
import { UpdateContainerDto } from './dto/update-container.dto';
import { ContainerEntity } from './entities/container.entity';

@Injectable()
export class ContainerService {
  constructor(
    @InjectRepository(ContainerEntity)
    private readonly containerRepository: Repository<ContainerEntity>,
  ) {}

  async findAll(): Promise<ContainerEntity[]> {
    try {
      const containers = await this.containerRepository.find();

      return containers;
    } catch {
      throw new HttpException(
        { message: 'Não foi possível buscar os containers.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number): Promise<ContainerEntity> {
    try {
      const container = await this.containerRepository.findOne({
        where: { id },
      });
      return container;
    } catch {
      throw new HttpException(
        { message: 'Não foi possível buscar o container.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(
    createContainerDto: CreateContainerDto,
  ): Promise<ContainerEntity> {
    try {
      const { code } = createContainerDto;
      const containerCodeExists = await this.containerRepository.findOne({
        where: { code },
      });

      if (containerCodeExists)
        throw new ConflictException('Código já cadastrado');

      const containerCreated = await this.containerRepository.save(
        createContainerDto,
      );

      return containerCreated;
    } catch (error) {
      console.log(error);
      if (!!(error instanceof HttpException)) throw error;
      throw new HttpException(
        { message: 'Não foi possível salvar o container.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    updateContainerDto: UpdateContainerDto,
  ): Promise<ContainerEntity> {
    try {
      const { code } = updateContainerDto;
      const containerCodeExists = await this.containerRepository.findOne({
        where: { code },
      });

      if (containerCodeExists)
        throw new ConflictException('Código já cadastrado');

      const containerUpdated = await this.containerRepository.save(
        updateContainerDto,
      );

      return containerUpdated;
    } catch {
      throw new HttpException(
        { message: 'Não foi possível atualizar o container.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.containerRepository.delete(id);

      return { message: 'Container excluído com sucesso!' };
    } catch {
      throw new HttpException(
        { message: 'Não foi possível deletar o container.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
