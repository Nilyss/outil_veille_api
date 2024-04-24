import { Controller, Get, Post, Body } from '@nestjs/common'
import { CreateFaqDto } from './dto/create-faq.dto'
import { FaqService } from './faq.service'
import { Faq } from './faq.model'

@Controller('Faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  async create(@Body() createFaqListDto: CreateFaqDto): Promise<Faq> {
    return this.faqService.create(createFaqListDto)
  }

  @Get()
  async findAll(): Promise<Faq[]> {
    return this.faqService.findAll()
  }
}
