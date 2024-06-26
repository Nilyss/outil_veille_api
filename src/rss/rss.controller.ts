import { Controller, Get, Post, Body } from '@nestjs/common'
import { CreateRssDto } from './dto/create-rss.dto'
import { RssService } from './rss.service'
import { Rss } from './rss.model'

@Controller('rss')
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @Post()
  async create(@Body() createRssDto: CreateRssDto): Promise<Rss> {
    return this.rssService.create(createRssDto)
  }

  @Get()
  async findAll(): Promise<Rss[]> {
    return this.rssService.findAll()
  }
}
