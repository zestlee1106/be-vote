import { PartialType } from '@nestjs/mapped-types';
import { CreateVoteDto } from './create-vote.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVoteDto extends PartialType(CreateVoteDto) {
  @IsString()
  @ApiProperty({
    example: '669616bd8edc56a49d8d85bd',
    description: '수정할 투표 id',
  })
  readonly _id: string;
}
