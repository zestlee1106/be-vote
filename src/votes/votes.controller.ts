import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Vote } from './entities/vote.entity';
import { IpAddress } from 'src/common/decorators/ip.decorator';
import { CookieUuid } from 'src/common/decorators/cookie-uuid.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('votes')
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  @ApiOperation({ summary: '새로운 투표 생성' })
  @ApiResponse({
    status: 201,
    description: 'The vote has been successfully created.',
    type: Vote,
  })
  @ApiBody({ type: CreateVoteDto })
  async create(
    @Body() createVoteDto: CreateVoteDto,
    @IpAddress() ip: string,
    @CookieUuid() uuid: string,
  ): Promise<Vote> {
    return this.votesService.create(createVoteDto, ip, uuid);
  }

  @Get()
  @ApiOperation({ summary: '모든 투표 가져오기' })
  @ApiResponse({
    status: 200,
    description: '투표를 모두 가져왔을 때',
    type: [Vote],
  })
  async getAll(): Promise<Vote[]> {
    return this.votesService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'id 로 투표를 가져오기' })
  @ApiParam({
    name: 'id',
    description: 'url 파라미터로 id 가져옴',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'id 로 조회된 투표 리턴',
    type: Vote,
  })
  @ApiResponse({
    status: 404,
    description: 'id 로 조회된 투표가 없을 때',
  })
  async getOne(@Param('id') id: string): Promise<Vote> {
    return this.votesService.getOne(id);
  }
}
