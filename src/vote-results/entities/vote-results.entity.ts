import { ObjectId } from 'mongodb';
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class VoteResult {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  voteId: ObjectId;

  @Column()
  optionId: ObjectId;

  @Column()
  votedUuid: string;

  @CreateDateColumn()
  createAt: Date;
}
