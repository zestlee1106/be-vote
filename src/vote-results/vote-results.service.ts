import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteResult } from './entities/vote-results.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Vote } from 'src/votes/entities/vote.entity';

@Injectable()
export class VoteResultsService {
  constructor(
    @InjectRepository(VoteResult)
    private voteResultRepository: Repository<VoteResult>,
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
  ) {}

  async create(voteId: string, optionId: string, uuid: string) {
    const voteObjectId = new ObjectId(voteId);
    const optionIdArray = optionId.split(',');
    const optionObjectIds = optionIdArray.map((option) => new ObjectId(option));
    const vote = await this.voteRepository.findOneBy({ _id: voteObjectId });

    if (!vote.isDuplicateVotingAllowed && optionIdArray.length > 1) {
      throw new BadRequestException('중복 투표가 불가한 투표입니다');
    }

    const voteResult = await this.voteResultRepository.findOne({
      where: {
        voteId: voteObjectId,
        votedUuid: uuid,
      },
    });

    if (voteResult) {
      throw new ConflictException('이미 투표한 uuid 입니다');
    }

    const savedResults = await Promise.all(
      optionObjectIds.map(async (optionObjectId) => {
        const voteResultEntity = this.voteResultRepository.create({
          optionId: optionObjectId,
          voteId: voteObjectId,
          votedUuid: uuid,
        });
        const savedResult =
          await this.voteResultRepository.save(voteResultEntity);
        return savedResult;
      }),
    );

    return savedResults;
  }
}
