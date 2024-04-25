import { Injectable, Inject } from '@nestjs/common'
import { Model } from 'mongoose'
import { CreateWebsiteDto } from './dto/create-website.dto'
import { Website } from './website.model'

@Injectable()
export class WebsiteService {
  constructor(
    @Inject('websites') private readonly websiteModel: Model<Website>,
  ) {}

  async create(createWebsiteDto: CreateWebsiteDto): Promise<Website> {
    const createdWebsite = new this.websiteModel(createWebsiteDto)
    return createdWebsite
  }

  async findAll(): Promise<Website[]> {
    return this.websiteModel.find().exec()
  }
}
