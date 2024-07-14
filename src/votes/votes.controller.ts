import { Body, Controller, Post } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Vote } from './entities/vote.entity';
import { IpAddress } from 'src/common/decorators/ip.decorator';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  async create(
    @Body() createVoteDto: CreateVoteDto,
    @IpAddress() ip: string,
  ): Promise<Vote> {
    return this.votesService.create(createVoteDto, ip);
  }
}
