import { Module } from '@nestjs/common';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { VoteOptionsModule } from 'src/vote-options/vote-options.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vote]), VoteOptionsModule],
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}
