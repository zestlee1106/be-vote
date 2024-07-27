import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteResultsService } from './vote-results.service';
import { VoteResult } from './entities/vote-results.entity';
import { Vote } from 'src/votes/entities/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VoteResult]),
    TypeOrmModule.forFeature([Vote]),
  ],
  providers: [VoteResultsService],
  exports: [VoteResultsService],
})
export class VoteResultsModule {}
