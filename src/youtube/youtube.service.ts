import { Injectable, Inject } from '@nestjs/common'
import { Model } from 'mongoose'
import { CreateYoutubeDto } from './dto/create-youtube.dto'
import { Youtube } from './youtube.model'

@Injectable()
export class YoutubeService {
  constructor(
    @Inject('youtube') private readonly youtubeModel: Model<Youtube>,
  ) {}

  async create(createYoutubeDto: CreateYoutubeDto): Promise<Youtube> {
    const createdYoutube = new this.youtubeModel(createYoutubeDto)
    return createdYoutube
  }

  async findAll(): Promise<Youtube[]> {
    return this.youtubeModel.find().exec()
  }
}
