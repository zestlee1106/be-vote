import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { isAfter } from 'date-fns';

@Injectable()
export class VotesService {
  constructor(
    // 의존성 주입을 위해 생성자 추가
    @InjectRepository(Vote) // Vote 엔티티와 연동된 리포지토리를 주입하기 위해 사용
    private votesRepository: Repository<Vote>, // Repository<Vote> 가 Vote 엔티티와 관련된 DB 작업을 수행하는 메서드를 포함함
    @InjectRepository(VoteResult)
    private votesResultRepository: Repository<VoteResult>,
    @InjectRepository(VoteOptions)
    private votesOptionRepository: Repository<VoteOptions>,
    private votesOptionsService: VoteOptionsService,
    private votesResultService: VoteResultsService,
  ) {}

  async create(
    createVoteDto: CreateVoteDto,
    ip: string,
    uuid: string,
  ): Promise<VoteResponseDto> {
    const {
      title,
      description,
      startDate,
      endDate,
      options,
      isDuplicateVotingAllowed,
    } = createVoteDto;

    const voteEntity = this.votesRepository.create({
      title,
      description,
      startDate,
      endDate,
      creatorIp: ip,
      creatorUuid: uuid,
      isDuplicateVotingAllowed,
    });

    const savedVote = await this.votesRepository.save(voteEntity);

    const savedOptions = await Promise.all(
      options.map((option) =>
        this.votesOptionsService.create(option, savedVote._id),
      ),
    );

    const vote = await this.votesRepository.findOneBy({ _id: savedVote._id });

    return { ...vote, options: savedOptions };
  }

  async getAll(): Promise<Vote[]> {
    return this.votesRepository.find();
  }

  async getOne(
    id: string,
    uuid: string,
  ): Promise<Vote & { options: VoteOptions[] }> {
    const objectId = new ObjectId(id);
    const vote = await this.votesRepository.findOneBy({ _id: objectId });

    if (!vote) {
      throw new NotFoundException(`${id} 의 투표가 없습니다`);
    }

    const today = new Date();

    if (isAfter(today, vote.endDate)) {
      throw new ForbiddenException('이미 마감된 투표입니다');
    }

    const voteResult = await this.votesResultRepository.findOne({
      where: {
        voteId: objectId,
        votedUuid: uuid,
      },
    });

    if (voteResult) {
      throw new ConflictException('이미 투표하였습니다.');
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

    let totalVoteCount = 0;

    const options = await Promise.all(
      votesOptions.map(async (option) => {
        const results = await this.votesResultRepository.find({
          where: { optionId: new ObjectId(option._id) },
        });
        const count = results.length;
        totalVoteCount = totalVoteCount + count;

        return {
          ...option,
          count,
        };
      }),
    );

    return {
      ...vote,
      options,
      totalVoteCount,
    };
  }
}
