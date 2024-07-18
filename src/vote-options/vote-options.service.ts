import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteOptions } from './entities/vote-options.entity';
import { ObjectId, Repository } from 'typeorm';
import { CreateVoteOptionsDto } from './dto/create-vote-options.dto';

@Injectable()
export class VoteOptionsService {
  constructor(
    @InjectRepository(VoteOptions)
    private voteOptionsRepository: Repository<VoteOptions>,
  ) {}

  async create(createVoteOptionDto: CreateVoteOptionsDto, voteId: ObjectId) {
    const voteIdObjectIdType = new ObjectId(voteId);

    const option = this.voteOptionsRepository.create({
      option: createVoteOptionDto.option,
      voteId: voteIdObjectIdType,
    });
    return this.voteOptionsRepository.save(option);
  }
}
