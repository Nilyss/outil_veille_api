import { Injectable, Inject } from '@nestjs/common'
import { Model } from 'mongoose'
import { CreateTwitterDto } from './dto/create-twitter.dto'
import { Twitter } from './twitter.model'

@Injectable()
export class TwitterService {
  constructor(
    @Inject('twitter') private readonly twitterModel: Model<Twitter>,
  ) {}

  async create(createTwitterDto: CreateTwitterDto): Promise<Twitter> {
    const createdTwitter = new this.twitterModel(createTwitterDto)
    return createdTwitter
  }

  async findAll(): Promise<Twitter[]> {
    return this.twitterModel.find().exec()
  }
}
