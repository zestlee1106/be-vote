import { Module } from '@nestjs/common';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { VoteOptionsModule } from 'src/vote-options/vote-options.module';
import { VoteResultsModule } from 'src/vote-results/vote-results.module';
import { VoteResult } from 'src/vote-results/entities/vote-results.entity';
import { VoteOptions } from 'src/vote-options/entities/vote-options.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vote, VoteResult, VoteOptions]),
    VoteOptionsModule,
    VoteResultsModule,
  ],
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}
