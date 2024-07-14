import { Test, TestingModule } from '@nestjs/testing';
import { VotesService } from './votes.service';

describe('Votes', () => {
  let provider: VotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotesService],
    }).compile();

    provider = module.get<VotesService>(VotesService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
