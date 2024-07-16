import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 10, description: '투표 결과 값' })
  value: number;
}

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

  @IsString({ each: true })
  @ApiProperty({
    example: ['옵션 1', '옵션 2'],
    description: '투표 옵션의 목록',
    type: [String],
  })
  readonly options: string[];

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

  @ValidateNested()
  @Type(() => Result)
  @ApiProperty({
    example: { 'Option 1': 10, 'Option 2': 5 },
    description: '투표 결과를 저장하는 객체',
    type: 'object',
    additionalProperties: { type: 'number' },
  })
  readonly results: Record<string, number>;
}
