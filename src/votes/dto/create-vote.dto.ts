export class CreateVoteDto {
  readonly title: string;
  readonly description: string;
  readonly options: string[];
  readonly startDate: Date;
  readonly endDate: Date;
  readonly createAt: Date;
  readonly updatedAt: Date;
  readonly votedIps: string[];
  readonly votedCookieIds: string[];
  readonly results: { [key: string]: number };
}
