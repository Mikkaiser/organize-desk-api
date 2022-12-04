import { Module } from '@nestjs/common';
import { ContainerHandlingService } from './container-handling.service';
import { ContainerHandlingController } from './container-handling.controller';

@Module({
  controllers: [ContainerHandlingController],
  providers: [ContainerHandlingService]
})
export class ContainerHandlingModule {}
