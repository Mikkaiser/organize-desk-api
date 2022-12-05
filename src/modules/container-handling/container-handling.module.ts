import { Module } from '@nestjs/common';
import { ContainerHandlingService } from './container-handling.service';
import { ContainerHandlingController } from './container-handling.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContainerHandlingEntity } from './entities/container-handling.entity';

@Module({
  controllers: [ContainerHandlingController],
  providers: [ContainerHandlingService],
  imports: [TypeOrmModule.forFeature([ContainerHandlingEntity])],
})
export class ContainerHandlingModule {}
