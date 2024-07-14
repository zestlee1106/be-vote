import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class Result {
  @IsNumber()
  value: number;
}

export class CreateVoteDto {
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsString({ each: true })
  readonly options: string[];

  @IsDate()
  @Type(() => Date) // transformer 가 string 을 Date 객체로 변환해 준다
  readonly startDate: Date;

  @IsDate()
  readonly endDate: Date;

  @IsDate()
  readonly createAt: Date;

  @IsDate()
  readonly updatedAt: Date;

  @IsString({ each: true })
  readonly votedIps: string[];

  @IsString({ each: true })
  readonly votedCookieIds: string[];

  @ValidateNested()
  @Type(() => Result)
  readonly results: Record<string, number>;
}
