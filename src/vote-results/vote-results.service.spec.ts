import { Test, TestingModule } from '@nestjs/testing';
import { VoteResultsService } from './vote-results.service';

describe('VoteResultsService', () => {
  let service: VoteResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoteResultsService],
    }).compile();

    service = module.get<VoteResultsService>(VoteResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
