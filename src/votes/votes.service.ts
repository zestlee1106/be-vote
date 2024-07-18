import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { Repository } from 'typeorm';
import { CreateVoteDto } from './dto/create-vote.dto';
import { ObjectId } from 'mongodb';
// import { UpdateVoteDto } from './dto/update-vote.dto';
import { VoteOptionsService } from 'src/vote-options/vote-options.service';

@Injectable()
export class VotesService {
  constructor(
    // 의존성 주입을 위해 생성자 추가
    @InjectRepository(Vote) // Vote 엔티티와 연동된 리포지토리를 주입하기 위해 사용
    private votesRepository: Repository<Vote>, // Repository<Vote> 가 Vote 엔티티와 관련된 DB 작업을 수행하는 메서드를 포함함
    private votesOptionsService: VoteOptionsService,
  ) {}

  async create(
    createVoteDto: CreateVoteDto,
    ip: string,
    uuid: string,
  ): Promise<Vote> {
    const { title, description, startDate, endDate, options } = createVoteDto;

    const vote = this.votesRepository.create({
      title,
      description,
      startDate,
      endDate,
      creatorIp: ip,
      creatorUuid: uuid,
    });

    const savedVote = await this.votesRepository.save(vote);

    console.log('🧡💛💙 영우의 로그 => savedVote', savedVote);

    const voteOptions = await Promise.all(
      options.map((option) =>
        this.votesOptionsService.create(option, savedVote._id),
      ),
    );

    savedVote.options = voteOptions.map((option) => option._id);

    await this.votesRepository.save(savedVote);

    return this.votesRepository.findOne({
      where: { _id: savedVote._id },
      relations: ['options'],
    });
  }

  async getAll(): Promise<Vote[]> {
    return this.votesRepository.find();
  }

  async getOne(id: string): Promise<Vote> {
    const objectId = new ObjectId(id);
    const vote = await this.votesRepository.findOneBy({ _id: objectId });

    if (!vote) {
      throw new NotFoundException(`${id} 의 투표가 없습니다`);
    }

    return vote;
  }

  // async updateVote(id: string, updateVoteDto: UpdateVoteDto): Promise<Vote> {
  //   const vote = await this.getOne(id);

  //   const updatedVote = {
  //     ...vote,
  //     ...updateVoteDto,
  //   };
  //   delete updatedVote['_id'];

  //   const objectId = new ObjectId(id);
  //   this.votesRepository.update(objectId, updatedVote);

  //   return this.getOne(id);
  // }
}
