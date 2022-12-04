import { Module } from '@nestjs/common';
import { ContainerService } from './container.service';
import { ContainerController } from './container.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContainerEntity } from './entities/container.entity';

@Module({
  controllers: [ContainerController],
  providers: [ContainerService],
  imports: [TypeOrmModule.forFeature([ContainerEntity])],
})
export class ContainerModule {}
