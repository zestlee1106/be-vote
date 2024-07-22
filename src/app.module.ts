import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { VotesModule } from './votes/votes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UuidMiddleware } from './common/middlewares/uuid/uuid.middleware';
import { VoteOptionsModule } from './vote-options/vote-options.module';
import { VoteResultsModule } from './vote-results/vote-results.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb', // MongoDB 데이터베이스 사용
      url: 'mongodb://localhost/vote-system', // MongoDB 연결 URL (로컬호스트의 vote 데이터베이스 사용)
      useUnifiedTopology: true, // 새로운 MongoDB 드라이버의 통합 토폴로지 사용 (매번 새로운 버전 사용)
      synchronize: true, // 애플리케이션 시작 시 데이터베이스 스키마 자동 동기화 (프로덕션에서는 사용 안 하는게 좋음)
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 엔티티 파일 경로 지정
    }),
    VotesModule,
    VoteOptionsModule,
    VoteResultsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UuidMiddleware).forRoutes('*');
  }
}
