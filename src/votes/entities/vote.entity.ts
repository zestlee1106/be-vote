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
    description: 'The id of the vote',
  })
  _id: ObjectId;

  @Column()
  @ApiProperty({ example: 'Vote title', description: 'The title of the vote' })
  title: string;

  @Column()
  @ApiProperty({
    example: 'Vote description',
    description: 'The description of the vote',
  })
  description: string;

  @Column()
  @ApiProperty({
    example: '2024-07-01T00:00:00.000Z',
    description: 'The start date of the vote',
  })
  startDate: Date;

  @Column()
  @ApiProperty({
    example: '2024-07-15T00:00:00.000Z',
    description: 'The end date of the vote',
  })
  endDate: Date;

  @CreateDateColumn()
  @ApiProperty({
    example: '2024-07-01T00:00:00.000Z',
    description: 'The creation date of the vote',
  })
  createAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    example: '2024-07-01T00:00:00.000Z',
    description: 'The last update date of the vote',
  })
  updatedAt: Date;

  @Column()
  @ApiProperty({
    example: ['192.168.0.1'],
    description: 'The IP addresses of voters',
  })
  votedIps: string[];

  @Column()
  @ApiProperty({
    example: '192.168.0.1',
    description: 'The IP address of the vote creator',
  })
  creatorIp: string;

  @Column()
  @ApiProperty({
    example: '5cc8a093-85fa-4da0-9111-313b53e4b924',
    description: 'The UUID of the vote creator',
  })
  creatorUuid: string;
}
