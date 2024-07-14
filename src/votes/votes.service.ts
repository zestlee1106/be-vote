import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { Repository } from 'typeorm';
import { CreateVoteDto } from './dto/create-vote.dto';

@Injectable()
export class VotesService {
  constructor(
    // 의존성 주입을 위해 생성자 추가
    @InjectRepository(Vote) // Vote 엔티티와 연동된 리포지토리를 주입하기 위해 사용
    private voteRepository: Repository<Vote>, // Repository<Vote> 가 Vote 엔티티와 관련된 DB 작업을 수행하는 메서드를 포함함
  ) {}

  async create(createVoteDto: CreateVoteDto): Promise<Vote> {
    // 1. DTO를 엔티티 인스턴스로 변환
    const vote = this.voteRepository.create(createVoteDto);
    // 2. 엔티티 인스턴스를 데이터베이스에 저장
    return this.voteRepository.save(vote);
  }
}
