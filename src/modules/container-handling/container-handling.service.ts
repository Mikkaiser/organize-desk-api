import { CreateContainerHandlingDto } from './dto/create-container-handling.dto';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContainerHandlingEntity } from './entities/container-handling.entity';
import { UpdateContainerHandlingDto } from './dto/update-container-handling.dto';

@Injectable()
export class ContainerHandlingService {
  constructor(
    @InjectRepository(ContainerHandlingEntity)
    private readonly containerHandlingRepository: Repository<ContainerHandlingEntity>,
  ) {}

  async findAll(): Promise<ContainerHandlingEntity[]> {
    try {
      const containerHandlings = await this.containerHandlingRepository.find();

      return containerHandlings;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { message: 'Não foi possível buscar as movimentações.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number): Promise<ContainerHandlingEntity> {
    try {
      const containerHandling = await this.containerHandlingRepository.findOne({
        where: { id },
      });
      return containerHandling;
    } catch {
      throw new HttpException(
        { message: 'Não foi possível buscar a movimentação.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(
    createContainerHandlingDto: CreateContainerHandlingDto,
  ): Promise<ContainerHandlingEntity> {
    try {
      const containerHandlingCreated =
        await this.containerHandlingRepository.save(createContainerHandlingDto);

      return containerHandlingCreated;
    } catch (error) {
      console.log(error);
      if (!!(error instanceof HttpException)) throw error;
      throw new HttpException(
        { message: 'Não foi possível salvar a movimentação.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    updateContainerDto: UpdateContainerHandlingDto,
  ): Promise<ContainerHandlingEntity> {
    try {
      const containerHandlingUpdated =
        await this.containerHandlingRepository.save(updateContainerDto);

      return containerHandlingUpdated;
    } catch {
      throw new HttpException(
        { message: 'Não foi possível atualizar as movimentações.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.containerHandlingRepository.delete(id);

      return { message: 'Movimentação excluída com sucesso!' };
    } catch {
      throw new HttpException(
        { message: 'Não foi possível deletar a movimentação.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
