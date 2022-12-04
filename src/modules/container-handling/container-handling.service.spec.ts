import { Test, TestingModule } from '@nestjs/testing';
import { ContainerHandlingService } from './container-handling.service';

describe('ContainerHandlingService', () => {
  let service: ContainerHandlingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContainerHandlingService],
    }).compile();

    service = module.get<ContainerHandlingService>(ContainerHandlingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
