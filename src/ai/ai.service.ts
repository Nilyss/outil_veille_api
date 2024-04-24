import { Injectable, Inject } from '@nestjs/common'
import { Model } from 'mongoose'
import { CreateAiDto } from './dto/create-ai.dto'
import { Ai } from './ai.model'

@Injectable()
export class AiService {
  constructor(@Inject('ai') private readonly aiModel: Model<Ai>) {}

  async create(createAiDto: CreateAiDto): Promise<Ai> {
    const createdAi = new this.aiModel(createAiDto)
    return createdAi
  }

  async findAll(): Promise<Ai[]> {
    return this.aiModel.find().exec()
  }
}
