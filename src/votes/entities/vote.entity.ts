import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Vote {
  @ObjectIdColumn()
  @ApiProperty({
    example: '669523724633b96231437dcb',
    description: '투표의 ID',
  })
  _id: ObjectId;

  @Column()
  @ApiProperty({ example: '투표 제목', description: '투표의 제목' })
  title: string;

  @Column()
  @ApiProperty({
    example: '투표 설명',
    description: '투표의 설명',
  })
  description: string;

  @Column()
  @ApiProperty({
    example: '2024-07-01T00:00:00.000Z',
    description: '투표 시작 날짜',
  })
  startDate: Date;

  @Column()
  @ApiProperty({
    example: '2024-07-15T00:00:00.000Z',
    description: '투표 종료 날짜',
  })
  endDate: Date;

  @CreateDateColumn()
  @ApiProperty({
    example: '2024-07-01T00:00:00.000Z',
    description: '투표 생성 날짜',
  })
  createAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    example: '2024-07-01T00:00:00.000Z',
    description: '마지막 수정 날짜',
  })
  updatedAt: Date;

  @Column()
  @ApiProperty({
    example: ['192.168.0.1'],
    description: '투표자들의 IP 주소',
  })
  votedIps: string[];

  @Column()
  @ApiProperty({
    example: '192.168.0.1',
    description: '투표 생성자의 IP 주소',
  })
  creatorIp: string;

  @Column()
  @ApiProperty({
    example: '5cc8a093-85fa-4da0-9111-313b53e4b924',
    description: '투표 생성자의 UUID',
  })
  creatorUuid: string;

  @Column({ default: false })
  @ApiProperty({
    example: true,
    description: '중복투표 가능 여부',
    default: true,
  })
  isDuplicateVotingAllowed: boolean = false;
}
