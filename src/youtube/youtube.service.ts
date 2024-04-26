import { Injectable, Inject } from '@nestjs/common'
import { Model } from 'mongoose'
import { CreateYoutubeDto } from './dto/create-youtube.dto'
import { Youtube } from './youtube.model'
import { ConfigService } from '@nestjs/config'
import { google, youtube_v3 } from 'googleapis'

@Injectable()
export class YoutubeService {
  private readonly apiKey: string
  private readonly youtube: youtube_v3.Youtube

  constructor(
    private readonly configService: ConfigService,
    @Inject('youtube') private readonly youtubeModel: Model<Youtube>,
  ) {
    this.apiKey = this.configService.get<string>('YT_API_KEY')
    this.youtube = google.youtube({
      version: 'v3',
      auth: this.apiKey,
    })
  }

  async create(createYoutubeDto: CreateYoutubeDto): Promise<Youtube> {
    const createdYoutube = new this.youtubeModel(createYoutubeDto)
    return createdYoutube
  }

  async findAll(): Promise<Youtube[]> {
    return this.youtubeModel.find().exec()
  }

  async getLatestVideos(
    channelId: string,
  ): Promise<youtube_v3.Schema$SearchListResponse> {
    const res = await this.youtube.search.list({
      part: ['snippet'],
      channelId: channelId,
      order: 'date',
      maxResults: 20,
    })

    return res.data
  }
}
