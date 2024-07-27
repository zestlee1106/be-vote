import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateVoteOptionsDto } from 'src/vote-options/dto/create-vote-options.dto';

export class CreateVoteDto {
  @IsString()
  @ApiProperty({ example: '투표 제목', description: '투표의 제목' })
  readonly title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '투표 설명',
    description: '투표에 대한 설명 (선택 사항)',
  })
  readonly description: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateVoteOptionsDto)
  @ApiProperty({
    type: () => [CreateVoteOptionsDto],
    description: '투표 옵션의 목록',
  })
  readonly options: CreateVoteOptionsDto[];

  @IsDate()
  @Type(() => Date) // transformer 가 string 을 Date 객체로 변환해 준다
  @ApiProperty({
    example: '2024-07-01T00:00:00.000Z',
    description: '투표 시작 날짜',
  })
  readonly startDate: Date;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    example: '2024-07-15T00:00:00.000Z',
    description: '투표 종료 날짜',
  })
  readonly endDate: Date;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: '중복투표 가능 여부',
  })
  readonly isDuplicateVotingAllowed: boolean;
}
