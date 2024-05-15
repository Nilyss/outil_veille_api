import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common'
import { CreateYoutubeDto } from './dto/create-youtube.dto'
import { YoutubeService } from './youtube.service'
import { Youtube } from './youtube.model'
import { youtube_v3 } from 'googleapis'
import { AuthGuard, ResourceGuard, RoleGuard } from 'nest-keycloak-connect'

@Controller('youtube')
@UseGuards(AuthGuard, ResourceGuard, RoleGuard)
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Post()
  create(@Body() createYoutubeDto: CreateYoutubeDto): Promise<Youtube> {
    return this.youtubeService.create(createYoutubeDto)
  }

  @Get()
  findAll(): Promise<Youtube[]> {
    return this.youtubeService.findAll()
  }

  @Get('latest')
  getLatestVideos(
    @Query('channelId') channelId: string,
  ): Promise<youtube_v3.Schema$SearchListResponse> {
    return this.youtubeService.getLatestVideos(channelId)
  }
}
