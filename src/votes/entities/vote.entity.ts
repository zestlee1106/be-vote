import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Vote {
  @ObjectIdColumn()
  id: string;

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
  votedCookieIds: string[];

  @Column('simple-json')
  results: { [key: string]: number }; // 각 옵션에 대한 투표 수 저장
}
