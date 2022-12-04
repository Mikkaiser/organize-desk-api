import { Test, TestingModule } from '@nestjs/testing';
import { ContainerHandlingController } from './container-handling.controller';
import { ContainerHandlingService } from './container-handling.service';

describe('ContainerHandlingController', () => {
  let controller: ContainerHandlingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContainerHandlingController],
      providers: [ContainerHandlingService],
    }).compile();

    controller = module.get<ContainerHandlingController>(ContainerHandlingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
