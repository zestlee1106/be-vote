import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn, BeforeInsert } from 'typeorm';

@Entity()
export class VoteOptions {
  @ObjectIdColumn()
  @ApiProperty({
    example: '669523724633b96231437dcb',
    description: '옵션 id',
  })
  _id: ObjectId;

  @Column()
  @ApiProperty({
    example: '옵션 이름',
    description: '옵션 1',
  })
  option: string;

  @Column()
  @ApiProperty({
    example: 3,
    description: '해당 옵션이 투표된 카운트',
  })
  count: number;

  @Column()
  @ApiProperty({
    type: () => String,
    description: '해당 옵션이 맵핑되어있는 투표',
  })
  voteId: ObjectId;

  @BeforeInsert()
  setVoteOptionsCount() {
    this.count = 0;
  }
}
