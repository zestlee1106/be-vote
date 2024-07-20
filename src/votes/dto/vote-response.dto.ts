import { VoteOptions } from 'src/vote-options/entities/vote-options.entity';
import { CreateVoteDto } from './create-vote.dto';
import { ObjectId } from 'mongodb';

export class VoteResponseDto extends CreateVoteDto {
  readonly _id: ObjectId;
  readonly options: VoteOptions[];
}
