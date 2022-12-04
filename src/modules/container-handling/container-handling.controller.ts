import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContainerHandlingService } from './container-handling.service';
import { CreateContainerHandlingDto } from './dto/create-container-handling.dto';
import { UpdateContainerHandlingDto } from './dto/update-container-handling.dto';

@Controller('container-handling')
export class ContainerHandlingController {
  constructor(private readonly containerHandlingService: ContainerHandlingService) {}

  @Post()
  create(@Body() createContainerHandlingDto: CreateContainerHandlingDto) {
    return this.containerHandlingService.create(createContainerHandlingDto);
  }

  @Get()
  findAll() {
    return this.containerHandlingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.containerHandlingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContainerHandlingDto: UpdateContainerHandlingDto) {
    return this.containerHandlingService.update(+id, updateContainerHandlingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.containerHandlingService.remove(+id);
  }
}
