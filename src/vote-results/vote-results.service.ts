import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteResult } from './entities/vote-results.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class VoteResultsService {
  constructor(
    @InjectRepository(VoteResult)
    private voteResultRepository: Repository<VoteResult>,
  ) {}

  async create(voteId: string, optionId: string, uuid: string) {
    const voteObjectId = new ObjectId(voteId);
    const optionObjectId = new ObjectId(optionId);

    const isVoted = await this.voteResultRepository.findOne({
      where: {
        voteId: voteObjectId,
        votedUuid: uuid,
      },
    });

    if (isVoted) {
      throw new ConflictException('이미 투표한 uuid 입니다');
    }

    const voteResultEntity = this.voteResultRepository.create({
      optionId: optionObjectId,
      voteId: voteObjectId,
      votedUuid: uuid,
    });

    const savedResult = await this.voteResultRepository.save(voteResultEntity);

    return savedResult;
  }
}
