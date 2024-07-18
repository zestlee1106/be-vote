import { IsString } from 'class-validator';

export class CreateVoteOptionsDto {
  @IsString()
  option: string;
}
