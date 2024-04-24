import { Module } from '@nestjs/common'
import { RssController } from './rss.controller'
import { RssService } from './rss.service'
import { rssProvider } from './rss.provider'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [RssController],
  providers: [RssService, ...rssProvider],
})
export class RssModule {}
