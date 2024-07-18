import { Module } from '@nestjs/common';
import { VoteOptionsService } from './vote-options.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteOptions } from './entities/vote-options.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VoteOptions])],
  providers: [VoteOptionsService],
  exports: [VoteOptionsService],
})
export class VoteOptionsModule {}
