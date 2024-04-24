import { Injectable, Inject } from '@nestjs/common'
import { Model } from 'mongoose'
import { CreatePodcastsDto } from './dto/create-podcasts.dto'
import { Podcasts } from './podcasts.model'

@Injectable()
export class PodcastsService {
  constructor(
    @Inject('podcasts') private readonly podcastsModel: Model<Podcasts>,
  ) {}

  async create(createPodcastsDto: CreatePodcastsDto): Promise<Podcasts> {
    const createdPodcasts = new this.podcastsModel(createPodcastsDto)
    return createdPodcasts
  }

  async findAll(): Promise<Podcasts[]> {
    return this.podcastsModel.find().exec()
  }
}
