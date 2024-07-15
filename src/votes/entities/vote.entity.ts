import {
  Column,
  Entity,
  ObjectIdColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Vote {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  options: string[];

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  createAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  votedIps: string[];

  @Column()
  creatorIp: string;

  @Column()
  creatorUuid: string;

  @Column()
  votedCookieIds: string[];

  @Column('simple-json')
  results: { [key: string]: number }; // 각 옵션에 대한 투표 수 저장

  @BeforeInsert()
  setCreationDate() {
    const now = new Date();
    this.createAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  setUpdateDate() {
    this.updatedAt = new Date();
  }
}
