import { Controller, Get, Post, Body } from '@nestjs/common'
import { CreateTwitterDto } from './dto/create-twitter.dto'
import { TwitterService } from './twitter.service'
import { Twitter } from './twitter.model'

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Post()
  async create(@Body() createTwitterDto: CreateTwitterDto): Promise<Twitter> {
    return this.twitterService.create(createTwitterDto)
  }

  @Get()
  async findAll(): Promise<Twitter[]> {
    return this.twitterService.findAll()
  }
}
