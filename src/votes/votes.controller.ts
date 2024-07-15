import { Body, Controller, Get, Post } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Vote } from './entities/vote.entity';
import { IpAddress } from 'src/common/decorators/ip.decorator';
import { CookieUuid } from 'src/common/decorators/cookie-uuid.decorator';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  async create(
    @Body() createVoteDto: CreateVoteDto,
    @IpAddress() ip: string,
    @CookieUuid() uuid: string,
  ): Promise<Vote> {
    return this.votesService.create(createVoteDto, ip, uuid);
  }

  @Get()
  async getAll(): Promise<Vote[]> {
    return this.votesService.getAll();
  }
}
