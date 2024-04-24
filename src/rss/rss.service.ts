import { Injectable, Inject } from '@nestjs/common'
import { Model } from 'mongoose'
import { CreateRssDto } from './dto/create-rss.dto'
import { Rss } from './rss.model'

@Injectable()
export class RssService {
  constructor(@Inject('rss') private readonly rssModel: Model<Rss>) {}

  async create(createRssDto: CreateRssDto): Promise<Rss> {
    const createdRss = new this.rssModel(createRssDto)
    return createdRss
  }

  async findAll(): Promise<Rss[]> {
    return this.rssModel.find().exec()
  }
}
