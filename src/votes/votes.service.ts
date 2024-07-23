import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { Repository } from 'typeorm';
import { CreateVoteDto } from './dto/create-vote.dto';
import { ObjectId } from 'mongodb';
import { VoteOptionsService } from 'src/vote-options/vote-options.service';
import { VoteOptions } from 'src/vote-options/entities/vote-options.entity';
import { VoteResponseDto } from './dto/vote-response.dto';
import { VoteResultsService } from 'src/vote-results/vote-results.service';
import { VoteResult } from 'src/vote-results/entities/vote-results.entity';

@Injectable()
export class VotesService {
  constructor(
    // 의존성 주입을 위해 생성자 추가
    @InjectRepository(Vote) // Vote 엔티티와 연동된 리포지토리를 주입하기 위해 사용
    private votesRepository: Repository<Vote>, // Repository<Vote> 가 Vote 엔티티와 관련된 DB 작업을 수행하는 메서드를 포함함
    private votesOptionsService: VoteOptionsService,
    private votesResultService: VoteResultsService,
    @InjectRepository(VoteResult)
    private votesResultRepository: Repository<VoteResult>,
    @InjectRepository(VoteOptions)
    private votesOptionRepository: Repository<VoteOptions>,
  ) {}

  async create(
    createVoteDto: CreateVoteDto,
    ip: string,
    uuid: string,
  ): Promise<VoteResponseDto> {
    const { title, description, startDate, endDate, options } = createVoteDto;

    const voteEntity = this.votesRepository.create({
      title,
      description,
      startDate,
      endDate,
      creatorIp: ip,
      creatorUuid: uuid,
    });

    const savedVote = await this.votesRepository.save(voteEntity);

    const savedOptions = await Promise.all(
      options.map((option) =>
        this.votesOptionsService.create(option, savedVote._id),
      ),
    );

    await this.votesRepository.save(savedVote);

    const vote = await this.votesRepository.findOneBy({ _id: savedVote._id });

    return { ...vote, options: savedOptions };
  }

  async getAll(): Promise<Vote[]> {
    return this.votesRepository.find();
  }

  async getOne(id: string): Promise<Vote & { options: VoteOptions[] }> {
    const objectId = new ObjectId(id);
    const vote = await this.votesRepository.findOneBy({ _id: objectId });

    if (!vote) {
      throw new NotFoundException(`${id} 의 투표가 없습니다`);
    }

    const options = await this.votesOptionsService.getByVoteId(objectId);

    return { ...vote, options };
  }

  async vote(voteId: string, optionId: string, uuid: string) {
    return this.votesResultService.create(voteId, optionId, uuid);
  }

  async getResult(voteId: string) {
    const objectId = new ObjectId(voteId);

    const vote = await this.votesRepository.findOneBy({
      _id: objectId,
    });

    const votesOptions = await this.votesOptionRepository.find({
      where: { voteId: objectId },
    });

    const options = await Promise.all(
      votesOptions.map(async (option) => {
        const count = await this.votesResultRepository.find({
          where: { optionId: new ObjectId(option._id) },
        });

        return {
          ...option,
          count: count.length,
        };
      }),
    );

    return {
      ...vote,
      options,
    };
  }
}
