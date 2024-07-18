import { Test, TestingModule } from '@nestjs/testing';
import { VoteOptionsService } from './vote-options.service';

describe('VoteOptionsService', () => {
  let service: VoteOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoteOptionsService],
    }).compile();

    service = module.get<VoteOptionsService>(VoteOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
