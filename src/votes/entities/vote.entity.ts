export class Vote {
  id: number;
  title: string;
  description: string;
  options: string[];
  startDate: Date;
  endDate: Date;
  createAt: Date;
  updatedAt: Date;
  votedIps: string[];
  votedCookieIds: string[];
  results: { [key: string]: number }; // 각 옵션에 대한 투표 수 저장
}
