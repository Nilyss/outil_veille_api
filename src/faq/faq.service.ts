import { Injectable, Inject } from '@nestjs/common'
import { Model } from 'mongoose'
import { CreateFaqDto } from './dto/create-faq.dto'
import { Faq } from './faq.model'

@Injectable()
export class FaqService {
  constructor(@Inject('faq') private readonly faqModel: Model<Faq>) {}

  async create(createFaqDto: CreateFaqDto): Promise<Faq> {
    const createdFaq = new this.faqModel(createFaqDto)
    return createdFaq
  }

  async findAll(): Promise<Faq[]> {
    return this.faqModel.find().exec()
  }
}
