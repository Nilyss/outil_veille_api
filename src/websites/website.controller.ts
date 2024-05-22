import { Controller, Get, Post, Body } from '@nestjs/common'
import { CreateWebsiteDto } from './dto/create-website.dto'
import { WebsiteService } from './website.service'
import { Website } from './website.model'
import { Roles } from 'nest-keycloak-connect'

@Controller('websites')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Post()
  async create(@Body() createWebsiteDto: CreateWebsiteDto): Promise<Website> {
    return this.websiteService.create(createWebsiteDto)
  }

  @Get()
  @Roles({ roles: ['realm:user', 'realm:admin'] })
  async findAll(): Promise<Website[]> {
    return this.websiteService.findAll()
  }
}
