import { Controller, Get, Post, Body } from '@nestjs/common'
import { CreateYoutubeDto } from './dto/create-youtube.dto'
import { YoutubeService } from './youtube.service'
import { Youtube } from './youtube.model'

@Controller('youtube')
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
}
