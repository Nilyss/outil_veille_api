import { Controller, Get, Post, Body } from '@nestjs/common'
import { CreateAiDto } from './dto/create-ai.dto'
import { AiService } from './ai.service'
import { Ai } from './ai.model'

@Controller('Ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  async create(@Body() createAiDto: CreateAiDto): Promise<Ai> {
    return this.aiService.create(createAiDto)
  }

  @Get()
  async findAll(): Promise<Ai[]> {
    return this.aiService.findAll()
  }
}
