import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteResultsService } from './vote-results.service';
import { VoteResult } from './entities/vote-results.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VoteResult])],
  providers: [VoteResultsService],
  exports: [VoteResultsService],
})
export class VoteResultsModule {}
