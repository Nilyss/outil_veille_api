import { Module } from '@nestjs/common'
import { WebsiteController } from './website.controller'
import { WebsiteService } from './website.service'
import { websiteProvider } from './website.provider'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [WebsiteController],
  providers: [WebsiteService, ...websiteProvider],
})
export class WebsiteModule {}
