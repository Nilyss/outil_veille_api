import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { CreateYoutubeDto } from './dto/create-youtube.dto'
import { YoutubeService } from './youtube.service'
import { Youtube } from './youtube.model'
import { youtube_v3 } from 'googleapis'
import { Roles } from 'nest-keycloak-connect'

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Post()
  create(@Body() createYoutubeDto: CreateYoutubeDto): Promise<Youtube> {
    return this.youtubeService.create(createYoutubeDto)
  }

  @Get()
  @Roles({ roles: ['realm:user', 'realm:admin'] })
  findAll(): Promise<Youtube[]> {
    return this.youtubeService.findAll()
  }

  @Get('latest')
  @Roles({ roles: ['realm:user', 'realm:admin'] })
  getLatestVideos(
    @Query('channelId') channelId: string,
  ): Promise<youtube_v3.Schema$SearchListResponse> {
    return this.youtubeService.getLatestVideos(channelId)
  }
}
