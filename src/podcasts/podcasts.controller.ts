import { Controller, Get, Post, Body } from '@nestjs/common'
import { CreatePodcastsDto } from './dto/create-podcasts.dto'
import { PodcastsService } from './podcasts.service'
import { Podcasts } from './podcasts.model'

@Controller('podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Post()
  async create(
    @Body() createPodcastsDto: CreatePodcastsDto,
  ): Promise<Podcasts> {
    return this.podcastsService.create(createPodcastsDto)
  }

  @Get()
  async findAll(): Promise<Podcasts[]> {
    return this.podcastsService.findAll()
  }
}
