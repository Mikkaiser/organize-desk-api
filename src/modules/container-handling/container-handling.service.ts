import { Injectable } from '@nestjs/common';
import { CreateContainerHandlingDto } from './dto/create-container-handling.dto';
import { UpdateContainerHandlingDto } from './dto/update-container-handling.dto';

@Injectable()
export class ContainerHandlingService {
  create(createContainerHandlingDto: CreateContainerHandlingDto) {
    return 'This action adds a new containerHandling';
  }

  findAll() {
    return `This action returns all containerHandling`;
  }

  findOne(id: number) {
    return `This action returns a #${id} containerHandling`;
  }

  update(id: number, updateContainerHandlingDto: UpdateContainerHandlingDto) {
    return `This action updates a #${id} containerHandling`;
  }

  remove(id: number) {
    return `This action removes a #${id} containerHandling`;
  }
}
